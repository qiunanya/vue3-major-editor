import EventEmitter from 'events';
import { Editor } from '@tiptap/vue-3'
import { EditorProps } from '../typings';

class MajorEditor extends EventEmitter {
    public editor:Editor | null = null;
    [key: string]: any;
    // 自定义事件
    private customEvents: string[] = [];
    // 自定义API
    private customApis: string[] = [];
    private pluginMap: {
        [propName: string]: IPluginTempl
    } = {}

    init (editor:Editor, _opt:EditorProps) {
        this.editor = editor
        this.editor.setEditable(_opt.isEnable||false)
    }

    use(plugin:IPluginClass, options?: IPluginOption)  {
        if (this._checkPlugin(plugin) &&this.editor) {
            this._saveCustomAttr(plugin)
            const pluginStance = new plugin(this, this.editor, options || {}) as IPluginClass
            pluginStance.pluginName = plugin.pluginName
            this.pluginMap[plugin.pluginName] = pluginStance
            this._bindingApis(pluginStance)
        }
    }

    // 绑定代理插件的api
    private _bindingApis (pluginStance: IPluginTempl) {
        const { apis = [] } = (pluginStance.constructor as any) || {};
        apis.forEach((apiName: string) => {
            this[apiName] = function () {
                return pluginStance[apiName].apply(pluginStance, [...arguments])
            }
        })
    }

    private _saveCustomAttr (plugin: IPluginClass) {
        const { events = [], apis = []} = plugin
        this.customApis = this.customApis.concat(apis)
        this.customEvents = this.customEvents.concat(events)
    }

    private _checkPlugin (plugin:IPluginClass) {
        const { pluginName, events = [], apis = []} = plugin
        // 检查插件名称
        if (this.pluginMap[pluginName]) {
            throw new Error(`The ${pluginName} already exists`)
        }
        // 检查插件事件
        events.forEach((eventName:string) => {
            if (this.customEvents.some(evt => evt === eventName)) {
                throw new Error(`Duplicate ${eventName} name in this ${pluginName}`)
            }
        });
        // 检查插件API
        apis.forEach((apiName:string) => {
            if (this.customApis.some(api => api === apiName)) {
                throw new Error(`Duplicate ${apiName} name in this ${pluginName}`)
            }
        });
        return true
    }

    get tiptapEditor () {
        return this.editor
    }
}

export default MajorEditor;