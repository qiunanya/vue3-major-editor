declare interface IPluginOption {
    [propName: string]: unknown | undefined;
}
  
// 插件实例
declare class IPluginTempl {
    static pluginName: string;
    static events: string[];
    static apis: string[];
    majorEditor?: MajorEditor | null | undefined;
    hotkeyEvent?: (name: string, e: KeyboardEvent) => void;
    [propName: IEditorHooksType]: () => void;
    [propName: string]: any;
}

// 插件class
declare interface IPluginClass extends IPluginTempl {
    new (majorEditor: MajorEditor, editor: Editor, options?: IPluginOption);
}