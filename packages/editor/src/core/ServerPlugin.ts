/**
 * ServerPlugin
 */

import { Editor } from '@tiptap/vue-3';
import MajorEditor from './MajorEditor';
import DOMPurify, { HookEvent, Config } from 'dompurify';

type MajorEditors = MajorEditor;

class ServerPlugin {
    public majorEditor: MajorEditors | null = null;
    public editor: Editor;
    static pluginName = "ServerPlugin";
    static apis = ['getHtml', 'getJson', 'getText', 'sanitize']
    constructor(majorEditor:MajorEditors, editor:Editor) {
        this.majorEditor = majorEditor;
        this.editor = editor;
    }
    
    
    getHtml () {
        const cleanHtml = this.sanitize( this.editor?.getHTML())
        return cleanHtml;
    }

    getJson () {
        return this.editor?.getJSON()
    }

    getText () {
        return this.editor?.getText()
    }

    sanitize (dirty: string) {
        // Add a hook to convert all text to capitals
        DOMPurify.addHook('beforeSanitizeAttributes', (node: Element, data:HookEvent, config: Config) => {
            // Set text node content to uppercase
            if (node.nodeName && node.nodeName === '#text') {
                // node.textContent = node.textContent?.toLocaleLowerCase() as string
            }

            // Add a hook to remove empty nodes
            if (!node.hasChildNodes() && !node.textContent) {
                node.remove()
            }

        })
        return DOMPurify.sanitize(dirty, {
            // NAMESPACE: 'http://www.w3.org/2000/svg',
            ALLOW_DATA_ATTR: true,
            ALLOW_ARIA_ATTR: true,
            FORBID_TAGS: ['style'],
            RETURN_DOM: false,
        })
    }

    destroy () {

    }

}

export default ServerPlugin