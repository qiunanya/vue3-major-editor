import { AsyncComponentLoader, defineAsyncComponent } from "vue"

const components = import.meta.glob('./*.svg');

export default function install(app: any) {
    for (const [key, value] of Object.entries(components)) {
        const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
        console.log(name, 5555)
        app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
    }
}

 