import { defineComponent, h, ref, nextTick, onBeforeUnmount, Teleport } from "vue";

export default defineComponent({
    name: "CustomEditor",
    props: {
        isEnable: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        const counter = ref(6);

        nextTick(() => {
            console.log("nextTick", counter.value, props.message);
        });
        onBeforeUnmount(() => {
            console.log("Component is about to be unmounted.");
        });
    },
    render:(ctx:any) => {
        console.log(ctx.message, 444);

        return h('div', {
            class: 'my-editor-as',
            style: {
                color: 'red'
            },
        }, [h('div', { class: 'cus-content'}, ctx.message)])
    }
});
