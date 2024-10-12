<template>
<div ref="imageVieverWidgetRef" :class="['images-viewer-container__wrap', {'is-active':visible}]">
    <div class="image-viewer-close__btn" @click="close">
        <svg class="close-icon icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
            <path d="M835.2 854.4c-12.8 0-22.4-3.2-32-12.8L211.2 256C192 240 192 211.2 208 195.2s44.8-16 60.8 0L864 780.8c16 16 16 44.8 0 60.8-6.4 9.6-16 12.8-28.8 12.8z" fill="#eee"></path>
            <path d="M236.8 848c-12.8 0-22.4-3.2-32-12.8-16-16-16-44.8 0-60.8l604.8-576c16-16 44.8-16 60.8 0s16 44.8 0 60.8l-604.8 576c-9.6 9.6-19.2 12.8-28.8 12.8z" fill="#eee"></path>
        </svg>
    </div>
    <div class="inner-image-wrap">
        <!-- <img 
            ref="imageRef" 
            class="inner-viewer__image cus-transition" 
            @load="loadImage" 
            @error="errorImage" 
            :src="updateImage||current" 
            alt="picture" 
            style="width: 120px;height: 120px;"> -->
            <div v-if="loadImageErrorText">
                <p style="color: orange;text-decoration: solid;">{{ loadImageErrorText }}</p>
                <p>{{ updateImage }}</p>
            </div>
            <img 
                ref="imageRef" 
                class="inner-viewer__image cus-transition" 
                @load="loadImage" 
                @error="errorImage" 
                src="" 
                alt="picture" 
                style="width: 120px;height: 120px;">
            <LoadingUI v-if="loading"></LoadingUI>
    </div>
    
    <div class="viewer-previous-icon" @click.stop.prevent="previous">
        <svg class="icon-is-hover cus-cursor" viewBox="0 0 1024 1024" width="25" height="25">
            <path d="M758.656 937.344a32 32 0 1 1-45.31199999 45.312l-448.00000001-448.128a32 32 0 0 1 0-45.248l448.00000001-447.936a32 32 0 1 1 45.31199999 45.312l-425.408 425.28000001L758.656 937.344z" fill="#eee"></path>
        </svg>
    </div>
    <div class="viewer-next-icon" @click.stop.prevent="next">
        <svg class="icon-is-hover cus-cursor" viewBox="0 0 1024 1024" width="25" height="25">
            <path d="M265.344 86.656a32 32 0 1 1 45.312-45.312l448 448.128a32 32 0 0 1 0 45.248l-448 447.936a32 32 0 1 1-45.312-45.312l425.408-425.28L265.344 86.656z" fill="#eee"></path>
        </svg> 
    </div>
    <div class="nav-image-viewer__wrap">
        <div class="navbar-control__wrap">
            <div class="viewer-pagination__info">
                共{{images.length}}张/{{totalPage}}页&nbsp;&nbsp;第{{currentPage}}页
            </div>
            <!-- 放大 -->
            <svg @click.stop.prevent="zoomIn" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M476.48 903.36C248.96 903.36 64 718.4 64 491.2S248.96 78.72 476.48 78.72s412.48 184.96 412.48 412.48-185.28 412.16-412.48 412.16z m0-741.12c-181.44 0-328.96 147.52-328.96 328.96s147.52 328.96 328.96 328.96 328.96-147.52 328.96-328.96S657.6 162.24 476.48 162.24z" fill="#eee"></path>
                <path d="M918.4 945.28c-9.28 0-18.56-2.88-26.24-9.28l-156.48-126.4c-17.92-14.4-20.8-40.64-6.08-58.56 14.4-17.92 40.64-20.8 58.56-6.08l156.48 126.4c17.92 14.4 20.8 40.64 6.08 58.56-8.32 9.92-20.16 15.36-32.32 15.36zM643.84 532.8H309.12c-23.04 0-41.6-18.56-41.6-41.6s18.56-41.6 41.6-41.6h334.72c23.04 0 41.6 18.56 41.6 41.6s-18.56 41.6-41.6 41.6z" fill="#eee"></path>
                <path d="M476.48 700.16c-23.04 0-41.6-18.56-41.6-41.6V323.84c0-23.04 18.56-41.6 41.6-41.6s41.6 18.56 41.6 41.6v334.72c0 23.04-18.56 41.6-41.6 41.6z" fill="#eee"></path>
            </svg>
            <!-- 缩小 -->
            <svg @click.stop.prevent="zoomOut" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M485.76 921.92C253.12 921.92 64 732.8 64 500.48 64 267.84 253.12 78.72 485.76 78.72s421.76 189.12 421.76 421.76c-0.32 232.32-189.44 421.44-421.76 421.44z m0-759.68c-186.56 0-338.24 151.68-338.24 338.24s151.68 338.24 338.24 338.24 338.24-151.68 338.24-338.24S672 162.24 485.76 162.24z" fill="#eee"></path>
                <path d="M918.4 945.28c-9.28 0-18.56-2.88-26.24-9.28l-156.48-126.4c-17.92-14.4-20.8-40.64-6.08-58.56 14.4-17.92 40.64-20.8 58.56-6.08l156.48 126.4c17.92 14.4 20.8 40.64 6.08 58.56-8.32 9.92-20.16 15.36-32.32 15.36zM657.28 542.08H314.24c-23.04 0-41.6-18.56-41.6-41.6 0-23.04 18.56-41.6 41.6-41.6h343.04c23.04 0 41.6 18.56 41.6 41.6 0 23.04-18.56 41.6-41.6 41.6z" fill="#eee"></path>
            </svg>
            <!-- 逆时针旋转 -->
            <svg @click.stop.prevent="counterclockwise" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M981.675 313.572c-25.714-60.758-62.464-115.257-109.227-162.02S771.186 68.039 710.428 42.325C647.51 15.815 580.836 2.275 512 2.275s-135.51 13.54-198.428 40.05c-60.758 25.714-115.257 62.464-162.02 109.227-25.486 25.486-48.014 53.248-67.356 83.172V188.87c0-22.528-18.432-40.96-40.96-40.96s-40.96 18.432-40.96 40.96v327.68c0 22.528 18.432 40.96 40.96 40.96s40.96-18.432 40.96-40.96v-57.116c4.778-39.595 15.018-78.166 30.72-115.143 21.731-51.314 52.792-97.394 92.387-136.989s85.675-70.77 136.989-92.387C397.426 92.5 453.86 81.01 512 81.01c58.254 0 114.688 11.378 167.708 33.906 51.314 21.731 97.394 52.792 136.989 92.387s70.77 85.675 92.387 136.989C931.5 397.426 942.99 453.86 942.99 512c0 58.254-11.378 114.688-33.906 167.708-21.731 51.314-52.792 97.394-92.387 136.989s-85.675 70.77-136.989 92.387C626.574 931.5 570.14 942.99 512 942.99c-73.5 0-146.09-18.773-209.806-54.386-61.895-34.588-114.802-84.309-153.145-144.042-11.72-18.318-36.068-23.666-54.386-11.833-18.318 11.719-23.666 36.067-11.833 54.386 45.284 70.542 107.862 129.365 181.02 170.211 75.322 42.098 161.224 64.398 248.15 64.398 68.836 0 135.51-13.54 198.428-40.05 60.758-25.713 115.257-62.463 162.02-109.226 46.763-46.763 83.513-101.262 109.227-162.02 26.51-62.919 40.05-129.592 40.05-198.428s-13.54-135.51-40.05-198.428z" fill="#eee"></path>
                <path d="M242.802 584.249c10.809-2.845 21.731 3.3 25.372 13.88 3.982 11.606 11.264 20.14 21.732 25.715 8.078 4.437 17.18 6.599 27.306 6.599 18.888 0 35.044-7.851 48.356-23.666 13.312-15.701 22.756-37.205 28.33-85.447-8.76 13.88-19.683 23.666-32.654 29.354-12.97 5.69-26.965 8.42-41.87 8.42-30.378 0-54.272-9.444-72.021-28.33-17.636-18.888-26.51-43.122-26.51-72.932 0-28.558 8.76-53.59 26.169-75.321 17.408-21.618 43.121-32.54 77.14-32.54 45.853 0 77.484 20.593 94.892 61.895 9.67 22.641 14.45 51.086 14.45 85.22 0 38.456-5.803 72.59-17.409 102.285-19.228 49.494-51.769 74.183-97.621 74.183-30.72 0-54.158-8.078-70.087-24.12-11.378-11.492-18.66-25.032-21.96-40.733-2.275-10.923 4.552-21.731 15.36-24.576l1.025 0.114z m117.19-84.65c10.696-8.534 16.044-23.439 16.044-44.715 0-19.115-4.78-33.337-14.45-42.667s-21.846-13.995-36.75-13.995c-15.93 0-28.672 5.348-38.002 16.043-9.33 10.695-14.109 25.031-14.109 42.894 0 16.953 4.096 30.379 12.402 40.391 8.192 10.013 21.39 14.905 39.367 14.905 12.97 0 24.804-4.323 35.499-12.857z m305.153-98.646c14.108 25.941 21.049 61.44 21.049 106.61 0 42.78-6.372 78.165-19.115 106.154-18.432 40.164-48.697 60.189-90.567 60.189-37.774 0-65.877-16.384-84.423-49.266-15.36-27.42-23.097-64.17-23.097-110.364 0-35.727 4.665-66.447 13.88-92.047 17.295-47.786 48.584-71.68 93.868-71.68 40.846 0 70.314 16.84 88.405 50.404zM619.406 598.13c10.695-15.815 15.93-45.398 15.93-88.747 0-31.175-3.87-56.889-11.492-77.027-7.737-20.14-22.642-30.265-44.829-30.265-20.366 0-35.271 9.557-44.715 28.672-9.443 19.114-14.108 47.331-14.108 84.537 0 27.989 2.958 50.517 8.988 67.584 9.216 25.94 25.032 39.025 47.332 39.025 17.863 0 32.2-7.964 42.894-23.78z m224.029-228.125c12.743 12.857 19.114 28.445 19.114 46.877 0 19-6.599 34.93-19.91 47.559-13.199 12.743-28.673 19.115-46.195 19.115-19.456 0-35.498-6.6-47.9-19.798-12.402-13.198-18.66-28.558-18.66-46.194 0-18.773 6.6-34.588 19.684-47.445 13.084-12.857 28.786-19.342 46.876-19.342 18.546 0 34.248 6.485 46.99 19.228z m-72.59 72.59c7.054 7.055 15.587 10.582 25.6 10.582 9.557 0 17.976-3.527 25.144-10.581 7.168-7.055 10.695-15.588 10.695-25.714 0-9.671-3.527-18.09-10.58-25.145-7.055-7.054-15.475-10.581-25.26-10.581s-18.318 3.527-25.486 10.58c-7.168 7.055-10.695 15.588-10.695 25.715-0.114 9.557 3.413 17.977 10.581 25.145z" fill="#eee"></path>
            </svg>
            <!-- 顺时针旋转 -->
            <svg @click.stop.prevent="clockwise" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M512 1021.724c-68.836 0-135.51-13.54-198.428-40.05-60.758-25.713-115.257-62.463-162.02-109.226S68.039 771.186 42.325 710.428C15.815 647.51 2.275 580.836 2.275 512s13.54-135.51 40.05-198.428c25.714-60.758 62.464-115.257 109.227-162.02s101.262-83.513 162.02-109.227C376.49 15.815 443.164 2.275 512 2.275s135.51 13.54 198.428 40.05c60.758 25.714 115.257 62.464 162.02 109.227s83.513 101.262 109.227 162.02c26.51 62.919 40.05 129.592 40.05 198.428 0 21.732-17.636 39.367-39.368 39.367S942.99 533.732 942.99 512c0-58.254-11.378-114.688-33.906-167.708-21.731-51.314-52.792-97.394-92.387-136.989s-85.675-70.77-136.989-92.387C626.574 92.5 570.14 81.01 512 81.01c-58.254 0-114.688 11.378-167.708 33.906-51.314 21.731-97.394 52.792-136.989 92.387s-70.77 85.675-92.387 136.989C92.5 397.426 81.01 453.86 81.01 512c0 58.254 11.378 114.688 33.906 167.708 21.731 51.314 52.792 97.394 92.387 136.989s85.675 70.77 136.989 92.387C397.426 931.5 453.86 942.99 512 942.99c73.5 0 146.09-18.773 209.806-54.386 61.895-34.588 114.802-84.309 153.145-144.042 11.72-18.318 36.068-23.666 54.386-11.833 18.318 11.719 23.666 36.067 11.833 54.386-45.284 70.542-107.862 129.365-181.02 170.211-75.322 42.098-161.224 64.398-248.15 64.398z" fill="#eee"></path>
                <path d="M980.764 557.511c-22.528 0-40.96-18.432-40.96-40.96v-327.68c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v327.68c0 22.528-18.432 40.96-40.96 40.96zM242.802 584.25c10.809-2.845 21.731 3.3 25.372 13.88 3.982 11.606 11.264 20.14 21.732 25.715 8.078 4.437 17.18 6.599 27.306 6.599 18.888 0 35.044-7.851 48.356-23.666 13.312-15.701 22.756-37.205 28.33-85.447-8.76 13.88-19.683 23.666-32.654 29.354-12.97 5.69-26.965 8.42-41.87 8.42-30.378 0-54.272-9.444-72.021-28.33-17.636-18.888-26.51-43.122-26.51-72.932 0-28.558 8.76-53.59 26.169-75.321 17.408-21.618 43.121-32.54 77.14-32.54 45.853 0 77.484 20.593 94.892 61.895 9.67 22.641 14.45 51.086 14.45 85.22 0 38.456-5.803 72.59-17.409 102.285-19.228 49.494-51.769 74.183-97.621 74.183-30.72 0-54.158-8.078-70.087-24.12-11.378-11.492-18.66-25.032-21.96-40.733-2.275-10.923 4.552-21.731 15.36-24.576l1.025 0.114z m117.19-84.65c10.696-8.534 16.044-23.439 16.044-44.715 0-19.115-4.78-33.337-14.45-42.667s-21.846-13.995-36.75-13.995c-15.93 0-28.672 5.348-38.002 16.043-9.33 10.695-14.109 25.031-14.109 42.894 0 16.953 4.096 30.379 12.402 40.391 8.192 10.013 21.39 14.905 39.367 14.905 12.97 0 24.804-4.323 35.499-12.857z m305.153-98.646c14.108 25.941 21.049 61.44 21.049 106.61 0 42.78-6.372 78.165-19.115 106.154-18.432 40.164-48.697 60.189-90.567 60.189-37.774 0-65.877-16.384-84.423-49.266-15.36-27.42-23.097-64.17-23.097-110.364 0-35.727 4.665-66.447 13.88-92.047 17.295-47.786 48.584-71.68 93.868-71.68 40.846 0 70.314 16.84 88.405 50.404zM619.406 598.13c10.695-15.815 15.93-45.398 15.93-88.747 0-31.175-3.87-56.889-11.492-77.027-7.737-20.14-22.642-30.265-44.829-30.265-20.366 0-35.271 9.557-44.715 28.672-9.443 19.114-14.108 47.331-14.108 84.537 0 27.989 2.958 50.517 8.988 67.584 9.216 25.94 25.032 39.025 47.332 39.025 17.863 0 32.2-7.964 42.894-23.78z m224.029-228.125c12.743 12.857 19.114 28.445 19.114 46.877 0 19-6.599 34.93-19.91 47.559-13.199 12.743-28.673 19.115-46.195 19.115-19.456 0-35.498-6.6-47.9-19.798-12.402-13.198-18.66-28.558-18.66-46.194 0-18.773 6.6-34.588 19.684-47.445 13.084-12.857 28.786-19.342 46.876-19.342 18.546 0 34.248 6.485 46.99 19.228z m-72.59 72.59c7.054 7.055 15.587 10.582 25.6 10.582 9.557 0 17.976-3.527 25.144-10.581 7.168-7.055 10.695-15.588 10.695-25.714 0-9.671-3.527-18.09-10.58-25.145-7.055-7.054-15.475-10.581-25.26-10.581s-18.318 3.527-25.486 10.58c-7.168 7.055-10.695 15.588-10.695 25.715-0.114 9.557 3.413 17.977 10.581 25.145z" fill="#eee"></path>
            </svg>
            <!-- 水平翻转 -->
            <svg @click.stop.prevent="inevrtX" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M573.248 832v88h-96V832h96zM128 224a64 64 0 0 1 45.248 18.752l229.504 229.504a64 64 0 0 1 0 90.496l-229.504 229.504A64 64 0 0 1 64 747.008V288a64 64 0 0 1 64-64z m781.248-5.504a64 64 0 0 1 63.552 56.576l0.448 7.424v459.008a64 64 0 0 1-103.232 50.56l-6.016-5.312-229.504-229.504a64 64 0 0 1-5.312-84.48l5.312-6.016L864 237.248a64 64 0 0 1 45.248-18.752zM128 288v459.008l229.504-229.504L128 288z m445.248 368v88h-96V656h96z m0-176v88h-96V480h96z m0-176v88h-96V304h96z m0-176v88h-96V128h96z" fill="#eee"></path>
            </svg>
            <!-- 垂直翻转 -->
            <svg @click.stop.prevent="inevrtY" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M660.48 106.24L512 291.84l-149.12-185.6h297.6M768 69.12c1.28-19.2-13.44-36.48-33.28-37.12H289.28c-19.2 1.28-33.92 17.92-33.28 37.12 0 8.96 3.2 17.92 8.32 24.96l222.72 277.76a30.72 30.72 0 0 0 49.28 0l222.72-277.76c6.4-7.04 8.96-16 8.96-24.96zM768 954.88c1.28 19.2-13.44 36.48-33.28 37.12H289.28a35.52 35.52 0 0 1-33.28-37.12c0-8.96 3.2-17.92 8.32-24.96l222.72-277.76a30.72 30.72 0 0 1 49.28 0l222.72 277.76c6.4 7.04 8.96 16 8.96 24.96zM800 480h64v64h-64zM928 480h64v64h-64zM672 480h64v64h-64zM544 480h64v64h-64zM416 480h64v64h-64zM288 480h64v64h-64zM160 480h64v64h-64zM32 480h64v64h-64z" fill="#eee"></path>
            </svg>
        </div>
        <div class="navbar-thumbnail__wrap">
            <svg @click.stop.prevent="prevPage" class="icon-is-hover cus-cursor" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M758.656 937.344a32 32 0 1 1-45.31199999 45.312l-448.00000001-448.128a32 32 0 0 1 0-45.248l448.00000001-447.936a32 32 0 1 1 45.31199999 45.312l-425.408 425.28000001L758.656 937.344z" fill="#eee"></path>
            </svg>
            <div class="navbar-list-group">
                <img 
                    :id="`navImage${index}`"
                    :class="['navbar-image__item', {'nav-active-current__img': currentIndex === index }]" 
                    v-for="(item, index) in pageData" 
                    :key="index" :src="item"  
                    @click.stop.prevent="onClickNavImage($event, item, index)"/>
            </div>
            <svg @click.stop.prevent="nextPage" class="icon-is-hover cus-cursor" viewBox="0 0 1024 1024" width="25" height="25">
                <path d="M265.344 86.656a32 32 0 1 1 45.312-45.312l448 448.128a32 32 0 0 1 0 45.248l-448 447.936a32 32 0 1 1-45.312-45.312l425.408-425.28L265.344 86.656z" fill="#eee"></path>
            </svg> 
        </div>
    </div>

    <HotKeys v-model:hotkey="hotkey" :is-active-key.camel="isActiveKey"></HotKeys>

</div>

</template>
<script setup>
import { watch, ref, nextTick } from 'vue';
import { useAction } from './useAction';
import { debounce } from '../utils';
import { FlipAnimate } from './flip-animate';
import HotKeys from './HotKeys.vue';
import LoadingUI from './Loading.vue';
import { useCusShortKey } from '../utils/hotkeys';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    current: {
        type: String,
        default: () => {
            return ''
        }
    },
    images: {
        type: Array,
        default: () => {
            return []
        }
    },
    zIndex: {
        type: Number,
        default: () => {
            return 2000
        }
    },
    image: {
        type: HTMLImageElement,
        default: () => {
            return {
                src: ""
            }
        }
    },
    onUpdateCurrent: {
        type: Function,
        default: () => {
            return () => {}
        }
    },
    onClose: {
        type: Function,
        default: () => {
            return () => {}
        }
    }
})

const {
    loadImageErrorText,
    loading, 
    imageRef, 
    imageVieverWidgetRef, 
    loadImage, 
    errorImage, 
    zoomIn, 
    zoomOut,
    inevrtY,
    inevrtX,
    clockwise,
    counterclockwise,
    closeViewer,
    prevPage,
    nextPage,
    pageData,
    initPage,
    currentPage,
    totalPage 
} = useAction(props.images);

const emits = defineEmits(['on-close', 'onUpdate:value']);

// 快捷键
const hotkey = ref('')
const isActiveKey = ref(false)
// next
useCusShortKey({'right': (event, handler) => {
    next()
    toggleHotkey(event, handler, true)
}})
// previous
useCusShortKey({'left': (event, handler) => {
    previous()
    toggleHotkey(event, handler, true)
}})
// nextPage
useCusShortKey({'ctrl+right': (event, handler) => {
    nextPage()
    toggleHotkey(event, handler, true)
}})
// prevPage
useCusShortKey({'ctrl+left': (event, handler) => {
    prevPage()
    toggleHotkey(event, handler, true)
}})
// inevrtY
useCusShortKey({'ctrl+i+y': (event, handler) => {
    inevrtY(event)
    toggleHotkey(event, handler, true)
}})
// inevrtX
useCusShortKey({'ctrl+i+x': (event, handler) => {
    inevrtX(event)
    toggleHotkey(event, handler, true)
}})
// Rotate 90 degrees clockwise
useCusShortKey({'ctrl+c+r': (event, handler) => {
    clockwise(event)
    toggleHotkey(event, handler, true)
}})
// Rotate 90 degrees counterclockwise
useCusShortKey({'ctrl+c+l': (event, handler) => {
    counterclockwise(event)
    toggleHotkey(event, handler, true)
}})
// close
useCusShortKey({'esc':  (event, handler) => {
    close()
    toggleHotkey(event, handler, true)
}})
// scale
useCusShortKey({'ctrl+*': (event, handler) => {
    switch (event.key) {
        case '-':
            zoomOut(event)
            toggleHotkey(event, handler, true, 'ctrl + '+event.key)
            break;
        case '+':
            zoomIn(event)
            toggleHotkey(event, handler, true, 'ctrl + '+event.key)
            break;
        default:
            break;
    }
}})

// isPrevent：true阻止浏览器默认快捷键
function toggleHotkey (event, handler, isPrevent = false, cusKey = "") {
    if (isPrevent) event.preventDefault()

    const { key } = handler;
    hotkey.value = cusKey||key
    isActiveKey.value = true
    setTimeout(() => {
        isActiveKey.value = false
    }, 1000)
}

const updateImage = ref('')
const currentIndex = ref(0)

watch(() => props.current, (newValue, oldValue) => {
    if (newValue) {

        const findIndex = props.images.findIndex(el => el === props.current)

        if (findIndex !== -1) {
            currentIndex.value = findIndex
        }

        nextTick().then(res => {
            const firstRect = props.image.getBoundingClientRect()
            updateImage.value = imageRef.value.src = props.image.src
            const lastRect = imageRef.value.getBoundingClientRect()
            
            FlipAnimate(imageRef.value, firstRect, lastRect)
        })
        
        initPage(1, 10)
    }
}, {
    deep: true,
    immediate: true
});

const previous = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        updateImage.value = imageRef.value.src = props.images[currentIndex.value]
    }
}

const next = () => {
    if (currentIndex.value < props.images.length-1) {
        currentIndex.value++;
        updateImage.value = imageRef.value.src = props.images[currentIndex.value]
    }
}

const onClickNavImage = debounce(clickImge, 360)

function clickImge (evt,item, index) {
    loadImageErrorText.value = ""
    const firstRect = evt.target.getBoundingClientRect()
    updateImage.value = imageRef.value.src = evt.target.src
    const lastRect = imageRef.value.getBoundingClientRect()
    currentIndex.value = index
    FlipAnimate(imageRef.value, firstRect, lastRect)
    // updateImage.value = item
    props.onUpdateCurrent(item, index)
}

function close () {
    props.onClose()
    closeViewer()
    emits('on-close')
    updateImage.value = ""
}

</script>

<style lang="scss" src="../styles/index.scss" scoped></style>