<template>
<div class="control-svg__btns">
<NIcon class="svg-action--btn" size="20" title="上一张" v-if="isMultipleImage" @click.stop.prevent="previous">
    <ArrowPrevious24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="20" title="下一张" v-if="isMultipleImage" @click.stop.prevent="next">
    <ArrowNext24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="放大" @click.stop.prevent="zoomIn">
    <ZoomIn24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="缩小" @click.stop.prevent="zoomOut">
    <ZoomOut24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="向左旋转" @click.stop.prevent="counterclockwise">
    <ArrowRotateCounterclockwise24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="向右旋转" @click.stop.prevent="clockwise">
    <ArrowRotateClockwise24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="水平翻转" @click.stop.prevent="inevrtX">
    <FlipHorizontal24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="垂直翻转" @click.stop.prevent="inevrtY">
    <FlipVertical24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="重置" @click.stop.prevent="resetStyle">
    <ArrowReset24Regular/>
</NIcon>

<NIcon class="svg-action--btn" size="25" title="全屏查看" @click.stop.prevent="fullScreen">
    <ArrowExpand24Regular/>
</NIcon>
<NIcon class="svg-action--btn" size="25" title="下载" @click.stop.prevent="downloads">
    <ArrowDownload24Regular/>
</NIcon> 

<template v-if="playState">
    <NIcon v-if="isMultipleImage" class="svg-action--btn" size="25" title="暂停">
        <RecordStop24Regular @click.stop.prevent="stopPlay"/>
    </NIcon> 
</template>
<template v-else>
    <NIcon v-if="isMultipleImage" class="svg-action--btn" size="25" title="播放">
        <PlayCircle24Regular @click.stop.prevent="autoPlay"/>
    </NIcon>
</template>
 
<slot></slot>
</div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { NIcon } from 'naive-ui'
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

const isMultipleImage = inject('isMultipleImage')

const { playState } = defineProps({
    playState: {
        type: Boolean,
        default: false,
        required: true
    },
    isDownLoad: {
        type: Boolean,
        default: true,
        required: false
    }
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

// 自动播放过程中，手动切换图片，停止播放
const previous = () => { emit('on-previous')}
const next = () => { emit('on-next') }
const resetStyle = () => { emit('on-resetStyle') }
const downloads = () => { emit('on-downloads') }
const zoomIn = () => { emit('on-zoomIn') }
const zoomOut = () => { emit('on-zoomOut') }
const inevrtY = () => { emit('on-inevrtY') }
const inevrtX = () => { emit('on-inevrtX') }
const clockwise = () => { emit('on-clockwise') }
const counterclockwise = () => { emit('on-counterclockwise') }
const stopPlay = () => { emit('on-stopPlay') }
const autoPlay = () => { emit('on-autoPlay') }
const fullScreen = () => { emit('on-fullScreen') }

</script>

<style lang="scss" scoped>
.control-svg__btns {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 8px 10px !important;
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