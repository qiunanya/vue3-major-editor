<template>
<div :class="['image-action-btns__wrapper']">
    <div class="control-svg__btns">
        <template v-if="isMultipleImage">
            <NIcon class="svg-action--btn" size="20" :title="$t('action.previous')">
                <ArrowPrevious24Regular @click.stop.prevent="emit('on-previous')"/>
            </NIcon>
            <span>&nbsp;{{totalNum}}&nbsp;/&nbsp;{{current}}</span>
            <NIcon class="svg-action--btn" size="20" :title="$t('action.next')">
                <ArrowNext24Regular @click.stop.prevent="emit('on-next')"/>
            </NIcon>  
        </template>
        <template v-for="button in baseButtons" :key="button.action">
            <NIcon
                v-if="button.condition"
                class="svg-action--btn"
                :size="button.size"
                :title="$t(button.title)"
                @click.stop.prevent="button.handler"
                >
                <component :is="button.icon"/>
            </NIcon>
        </template>

        <template v-if="playState">
            <NIcon v-if="isMultipleImage" class="svg-action--btn" size="25" :title="$t('action.pause')">
                <RecordStop24Regular @click.stop.prevent="stopPlay"/>
            </NIcon> 
        </template>
        <template v-else>
            <NIcon v-if="isMultipleImage" class="svg-action--btn" size="25" :title="$t('action.play')">
                <PlayCircle24Regular @click.stop.prevent="autoPlay"/>
            </NIcon>
        </template>
        
        <slot></slot>
    </div>
</div>
</template>

<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { NIcon } from 'naive-ui'
import { Composer } from 'vue-i18n';
import { 
    ArrowPrevious24Regular,
    ArrowNext24Regular,
    ZoomIn24Regular, 
    ZoomOut24Regular,
    ArrowRotateCounterclockwise24Regular,
    ArrowRotateClockwise24Regular,
    FlipHorizontal24Regular,
    FlipVertical24Regular,
    ArrowReset24Regular,
    ArrowDownload24Regular,
    PlayCircle24Regular,
    RecordStop24Regular,
    ArrowExpand24Regular
} from '@vicons/fluent'

type I18nGlobal = Composer<Record<string, string>, Record<string, string>, Record<string, string>, string, false>

const isMultipleImage = inject('isMultipleImage')
const i18n = inject('i18n') as I18nGlobal

const props = defineProps({
    playState: {
        type: Boolean,
        default: false,
        required: true
    },
    isDownLoad: {
        type: Boolean,
        default: true,
        required: false
    },
    totalNum: Number,
    current: Number
})

const emit = defineEmits(
    [
        'on-previous',
        'on-next',
        'on-resetStyle', 
        'on-downloads',
        'on-zoomIn',
        'on-zoomOut', 
        'on-inevrtY',
        'on-inevrtX',
        'on-clockwise',
        'on-counterclockwise',
        'on-fullScreen', 
        'on-stopPlay',
        'on-autoPlay'
    ]
)

// Basic Button
const baseButtons = computed(() => [
    {
        action: 'zoomIn',
        icon: ZoomIn24Regular,
        size: 25,
        title: 'action.enlarge',
        condition: true,
        handler: () => emit('on-zoomIn')
    },
    {
        action: 'zoomOut',
        icon: ZoomOut24Regular,
        size: 25,
        title: 'action.shrink',
        condition: true,
        handler: () => emit('on-zoomOut')
    },
    {
        action: 'counterclockwise',
        icon: ArrowRotateCounterclockwise24Regular,
        size: 25,
        title: 'action.rotateCounterclockwise',
        condition: true,
        handler: () => emit('on-counterclockwise')
    },
    {
        action: 'clockwise',
        icon: ArrowRotateClockwise24Regular,
        size: 25,
        title: 'action.clockwiseRotation',
        condition: true,
        handler: () => emit('on-clockwise')
    },
    {
        action: 'inevrtX',
        icon: FlipHorizontal24Regular,
        size: 25,
        title: 'action.flipHorizontal',
        condition: true,
        handler: () => emit('on-inevrtX')
    },
    {
        action: 'inevrtY',
        icon: FlipVertical24Regular,
        size: 25,
        title: 'action.flipVertical',
        condition: true,
        handler: () => emit('on-inevrtY')
    },
    {
        action: 'resetStyle',
        icon: ArrowReset24Regular,
        size: 25,
        title: 'action.reset',
        condition: true,
        handler: () => emit('on-resetStyle')
    },
    {
        action: 'fullScreen',
        icon: ArrowExpand24Regular,
        size: 25,
        title: 'action.fullScreen',
        condition: true,
        handler: () => emit('on-fullScreen')
    },
    {
        action: 'downloads',
        icon: ArrowDownload24Regular,
        size: 25,
        title: 'action.download',
        condition: props.isDownLoad,
        handler: () => emit('on-downloads')
    }
])

// Play and Pause
const stopPlay = () => { emit('on-stopPlay') }
const autoPlay = () => { emit('on-autoPlay') }

const $t = (val:string) => {
    return i18n.t(val)
}

</script>

<style lang="scss" scoped>
.image-action-btns__wrapper {
    position: fixed;
    bottom: 30px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 0;
    z-index: 10;
    .control-info {
        display: flex;
        align-items: center;
        color: #eee;
        padding-bottom: 6px;
    }
    .position {
        position: absolute;
        left: 30px;
    }
}
.control-svg__btns {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 8px 10px !important;
    display: flex;
    align-items: center;
    .svg-action--btn {
        margin: 0 6px;
        cursor: pointer;
        &:hover {
            fill: var(--active-icon-color);
            color: var(--active-icon-color);
        }
    }
}
</style>