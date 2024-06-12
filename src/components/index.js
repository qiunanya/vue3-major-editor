import Vue3MajorEditor from  "./vue3-major-editor/index.js";

const components = [Vue3MajorEditor]


const install = app => {
    components.forEach(component => {
        app.component(component.__name, component)
    })
}

export {
    Vue3MajorEditor
}

const MajorEditor = {
    install
}

export default MajorEditor;