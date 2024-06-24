import { defineComponent, h, ref, nextTick, onBeforeUnmount, PropType, RenderFunction } from "vue";
interface RenderContext {
    isEnable: boolean;
    message: string;
}

export default defineComponent({
    name: "CustomEditor",
    props: {
        isEnable: {
            type: Boolean,
            default: false
        },
        message: {
            type: String as PropType<string>,
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

        return { counter, props, context }
    },
    render:(context:RenderContext) => {
        console.log(context, 444);

        return h('div', {
            class: 'my-editor-as',
            style: {
                color: 'red'
            },
        }, [h('div', { class: 'cus-content'}, context.message)])
    }
});
