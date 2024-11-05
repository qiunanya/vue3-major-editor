<template>
<div 
    ref="imageVieverWidgetRef" 
    :class="[
        'images-viewer-vue3__wrapper', 
        {'is-active':visible}, 
        {'nav-scroll-style__wrap':!getUserAgent()}]">
    <!-- 移动端 -->
    <div v-if="getUserAgent()" class="images-viewer-vue3__mobile">
        <div v-if="isMultipleImage" class="cus-head-info">
            <span>{{images.length}}&nbsp;&nbsp;/&nbsp;{{currentIndex+1}}</span>
        </div>
        <MobileViewer
            :viewer-images.camel="images" 
            :current-image.camel="current" 
            :active-image.camel="image" 
            @on-cb="onCallBack">
        </MobileViewer>
    </div>
    <!-- pc端 -->
    <div v-else :class="['images-viewer-vue3__content', { 'active-grid': !isVisibleNav}, { 'close-grid': !isMultipleImage}]">
        <div :class="['content-nav__wrapper', { 'nav-active': isVisibleNav }, { 'is-hidden': getUserAgent() }]" v-if="isMultipleImage">
            <!-- 使用Vueuse的虚拟滚动useVirtualList hook -->
            <ScrollItemNav
                ref="scrollItemNavRef" 
                v-model="currentIndex"
                :viewer-images.camel="images" 
                :current-image.camel="current"
                @on-click="clickImge">
            </ScrollItemNav>
        </div>
        <div class="content-viewer-image__wrapper" @wheel="onWheelListener">
            <svg v-show="isMultipleImage" @click.stop.prevent="setNavState" :class="['icon-is-hover cursor image-collapse-nav__btn svg-icon__action', {'rotate-right__btn': !isVisibleNav },{ 'is-hidden': getUserAgent() }]" viewBox="0 0 1024 1024">
                <path  d="M322.12 353.93L104.61 490.77c-18.45 11.61-18.44 38.51 0.02 50.1l217.51 136.64c19.71 12.38 45.33-1.78 45.33-25.06V378.98c0-23.29-25.64-37.45-45.35-25.05zM94.78 125.02h834.44c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5H94.78c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5zM929.22 342.34H444.11c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5h485.11c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5zM929.22 620.66H444.11c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5h485.11c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5zM929.22 898.98H94.78c-16.84 0-30.5 13.66-30.5 30.5s13.66 30.5 30.5 30.5h834.44c16.84 0 30.5-13.66 30.5-30.5s-13.66-30.5-30.5-30.5z"></path>
            </svg>
            <ul class="image-info" v-if="!getUserAgent()">
                <li>{{$t('image.ruleText')}}：{{imageInfo.width}}{{$t('image.px')}} X {{imageInfo.height}}{{$t('image.px')}}</li>
            </ul>
            <div v-if="loadImageErrorText" style="user-select: text;">
                <p style="color: orange;text-decoration: solid;">{{ $t('image.loadErrorText') }}</p>
                <p>{{ updateImageSrc }}</p>
            </div>
            <img 
                ref="imageRef" 
                :class="['image-viewer__inner cus-transition']" 
                @load="loadImage" 
                @error="errorImage" 
                alt="picture" 
                @mouseenter="onMouseEnterImage">
            <LoadingUI v-if="loading"></LoadingUI>

            <div :class="['image-viewer__controls',{ 'is-hidden': getUserAgent() }]">
                <div :class="['control-info',{ 'position': !getUserAgent() }]" v-show="isMultipleImage">
                    <span>{{$t('image.total')}}&nbsp;{{images.length}}&nbsp;{{$t('image.pictures')}}&nbsp;</span>
                    <span>/&nbsp;{{$t('image.the')}}&nbsp;{{currentIndex+1}}&nbsp;{{$t('image.img')}}&nbsp;</span>
                </div>
                <div class="control-svg__btns">
                    <!-- 上一张 -->
                    <svg v-if="isMultipleImage" @click.stop.prevent="setPrevious" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M758.656 937.344a32 32 0 1 1-45.31199999 45.312l-448.00000001-448.128a32 32 0 0 1 0-45.248l448.00000001-447.936a32 32 0 1 1 45.31199999 45.312l-425.408 425.28000001L758.656 937.344z" ></path>
                    </svg>
                    <!-- 下一张 -->
                    <svg v-if="isMultipleImage" @click.stop.prevent="setNext" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M265.344 86.656a32 32 0 1 1 45.312-45.312l448 448.128a32 32 0 0 1 0 45.248l-448 447.936a32 32 0 1 1-45.312-45.312l425.408-425.28L265.344 86.656z" ></path>
                    </svg>
                    <!-- 放大 -->
                    <svg @click.stop.prevent="zoomIn" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M476.48 903.36C248.96 903.36 64 718.4 64 491.2S248.96 78.72 476.48 78.72s412.48 184.96 412.48 412.48-185.28 412.16-412.48 412.16z m0-741.12c-181.44 0-328.96 147.52-328.96 328.96s147.52 328.96 328.96 328.96 328.96-147.52 328.96-328.96S657.6 162.24 476.48 162.24z"></path>
                        <path d="M918.4 945.28c-9.28 0-18.56-2.88-26.24-9.28l-156.48-126.4c-17.92-14.4-20.8-40.64-6.08-58.56 14.4-17.92 40.64-20.8 58.56-6.08l156.48 126.4c17.92 14.4 20.8 40.64 6.08 58.56-8.32 9.92-20.16 15.36-32.32 15.36zM643.84 532.8H309.12c-23.04 0-41.6-18.56-41.6-41.6s18.56-41.6 41.6-41.6h334.72c23.04 0 41.6 18.56 41.6 41.6s-18.56 41.6-41.6 41.6z"></path>
                        <path d="M476.48 700.16c-23.04 0-41.6-18.56-41.6-41.6V323.84c0-23.04 18.56-41.6 41.6-41.6s41.6 18.56 41.6 41.6v334.72c0 23.04-18.56 41.6-41.6 41.6z"></path>
                    </svg>
                    <!-- 缩小 -->
                    <svg @click.stop.prevent="zoomOut" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M485.76 921.92C253.12 921.92 64 732.8 64 500.48 64 267.84 253.12 78.72 485.76 78.72s421.76 189.12 421.76 421.76c-0.32 232.32-189.44 421.44-421.76 421.44z m0-759.68c-186.56 0-338.24 151.68-338.24 338.24s151.68 338.24 338.24 338.24 338.24-151.68 338.24-338.24S672 162.24 485.76 162.24z"></path>
                        <path d="M918.4 945.28c-9.28 0-18.56-2.88-26.24-9.28l-156.48-126.4c-17.92-14.4-20.8-40.64-6.08-58.56 14.4-17.92 40.64-20.8 58.56-6.08l156.48 126.4c17.92 14.4 20.8 40.64 6.08 58.56-8.32 9.92-20.16 15.36-32.32 15.36zM657.28 542.08H314.24c-23.04 0-41.6-18.56-41.6-41.6 0-23.04 18.56-41.6 41.6-41.6h343.04c23.04 0 41.6 18.56 41.6 41.6 0 23.04-18.56 41.6-41.6 41.6z"></path>
                    </svg>
                    <!-- 逆时针旋转 -->
                    <svg @click.stop.prevent="counterclockwise" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M981.675 313.572c-25.714-60.758-62.464-115.257-109.227-162.02S771.186 68.039 710.428 42.325C647.51 15.815 580.836 2.275 512 2.275s-135.51 13.54-198.428 40.05c-60.758 25.714-115.257 62.464-162.02 109.227-25.486 25.486-48.014 53.248-67.356 83.172V188.87c0-22.528-18.432-40.96-40.96-40.96s-40.96 18.432-40.96 40.96v327.68c0 22.528 18.432 40.96 40.96 40.96s40.96-18.432 40.96-40.96v-57.116c4.778-39.595 15.018-78.166 30.72-115.143 21.731-51.314 52.792-97.394 92.387-136.989s85.675-70.77 136.989-92.387C397.426 92.5 453.86 81.01 512 81.01c58.254 0 114.688 11.378 167.708 33.906 51.314 21.731 97.394 52.792 136.989 92.387s70.77 85.675 92.387 136.989C931.5 397.426 942.99 453.86 942.99 512c0 58.254-11.378 114.688-33.906 167.708-21.731 51.314-52.792 97.394-92.387 136.989s-85.675 70.77-136.989 92.387C626.574 931.5 570.14 942.99 512 942.99c-73.5 0-146.09-18.773-209.806-54.386-61.895-34.588-114.802-84.309-153.145-144.042-11.72-18.318-36.068-23.666-54.386-11.833-18.318 11.719-23.666 36.067-11.833 54.386 45.284 70.542 107.862 129.365 181.02 170.211 75.322 42.098 161.224 64.398 248.15 64.398 68.836 0 135.51-13.54 198.428-40.05 60.758-25.713 115.257-62.463 162.02-109.226 46.763-46.763 83.513-101.262 109.227-162.02 26.51-62.919 40.05-129.592 40.05-198.428s-13.54-135.51-40.05-198.428z"></path>
                        <path d="M242.802 584.249c10.809-2.845 21.731 3.3 25.372 13.88 3.982 11.606 11.264 20.14 21.732 25.715 8.078 4.437 17.18 6.599 27.306 6.599 18.888 0 35.044-7.851 48.356-23.666 13.312-15.701 22.756-37.205 28.33-85.447-8.76 13.88-19.683 23.666-32.654 29.354-12.97 5.69-26.965 8.42-41.87 8.42-30.378 0-54.272-9.444-72.021-28.33-17.636-18.888-26.51-43.122-26.51-72.932 0-28.558 8.76-53.59 26.169-75.321 17.408-21.618 43.121-32.54 77.14-32.54 45.853 0 77.484 20.593 94.892 61.895 9.67 22.641 14.45 51.086 14.45 85.22 0 38.456-5.803 72.59-17.409 102.285-19.228 49.494-51.769 74.183-97.621 74.183-30.72 0-54.158-8.078-70.087-24.12-11.378-11.492-18.66-25.032-21.96-40.733-2.275-10.923 4.552-21.731 15.36-24.576l1.025 0.114z m117.19-84.65c10.696-8.534 16.044-23.439 16.044-44.715 0-19.115-4.78-33.337-14.45-42.667s-21.846-13.995-36.75-13.995c-15.93 0-28.672 5.348-38.002 16.043-9.33 10.695-14.109 25.031-14.109 42.894 0 16.953 4.096 30.379 12.402 40.391 8.192 10.013 21.39 14.905 39.367 14.905 12.97 0 24.804-4.323 35.499-12.857z m305.153-98.646c14.108 25.941 21.049 61.44 21.049 106.61 0 42.78-6.372 78.165-19.115 106.154-18.432 40.164-48.697 60.189-90.567 60.189-37.774 0-65.877-16.384-84.423-49.266-15.36-27.42-23.097-64.17-23.097-110.364 0-35.727 4.665-66.447 13.88-92.047 17.295-47.786 48.584-71.68 93.868-71.68 40.846 0 70.314 16.84 88.405 50.404zM619.406 598.13c10.695-15.815 15.93-45.398 15.93-88.747 0-31.175-3.87-56.889-11.492-77.027-7.737-20.14-22.642-30.265-44.829-30.265-20.366 0-35.271 9.557-44.715 28.672-9.443 19.114-14.108 47.331-14.108 84.537 0 27.989 2.958 50.517 8.988 67.584 9.216 25.94 25.032 39.025 47.332 39.025 17.863 0 32.2-7.964 42.894-23.78z m224.029-228.125c12.743 12.857 19.114 28.445 19.114 46.877 0 19-6.599 34.93-19.91 47.559-13.199 12.743-28.673 19.115-46.195 19.115-19.456 0-35.498-6.6-47.9-19.798-12.402-13.198-18.66-28.558-18.66-46.194 0-18.773 6.6-34.588 19.684-47.445 13.084-12.857 28.786-19.342 46.876-19.342 18.546 0 34.248 6.485 46.99 19.228z m-72.59 72.59c7.054 7.055 15.587 10.582 25.6 10.582 9.557 0 17.976-3.527 25.144-10.581 7.168-7.055 10.695-15.588 10.695-25.714 0-9.671-3.527-18.09-10.58-25.145-7.055-7.054-15.475-10.581-25.26-10.581s-18.318 3.527-25.486 10.58c-7.168 7.055-10.695 15.588-10.695 25.715-0.114 9.557 3.413 17.977 10.581 25.145z"></path>
                    </svg>
                    <!-- 顺时针旋转 -->
                    <svg @click.stop.prevent="clockwise" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M512 1021.724c-68.836 0-135.51-13.54-198.428-40.05-60.758-25.713-115.257-62.463-162.02-109.226S68.039 771.186 42.325 710.428C15.815 647.51 2.275 580.836 2.275 512s13.54-135.51 40.05-198.428c25.714-60.758 62.464-115.257 109.227-162.02s101.262-83.513 162.02-109.227C376.49 15.815 443.164 2.275 512 2.275s135.51 13.54 198.428 40.05c60.758 25.714 115.257 62.464 162.02 109.227s83.513 101.262 109.227 162.02c26.51 62.919 40.05 129.592 40.05 198.428 0 21.732-17.636 39.367-39.368 39.367S942.99 533.732 942.99 512c0-58.254-11.378-114.688-33.906-167.708-21.731-51.314-52.792-97.394-92.387-136.989s-85.675-70.77-136.989-92.387C626.574 92.5 570.14 81.01 512 81.01c-58.254 0-114.688 11.378-167.708 33.906-51.314 21.731-97.394 52.792-136.989 92.387s-70.77 85.675-92.387 136.989C92.5 397.426 81.01 453.86 81.01 512c0 58.254 11.378 114.688 33.906 167.708 21.731 51.314 52.792 97.394 92.387 136.989s85.675 70.77 136.989 92.387C397.426 931.5 453.86 942.99 512 942.99c73.5 0 146.09-18.773 209.806-54.386 61.895-34.588 114.802-84.309 153.145-144.042 11.72-18.318 36.068-23.666 54.386-11.833 18.318 11.719 23.666 36.067 11.833 54.386-45.284 70.542-107.862 129.365-181.02 170.211-75.322 42.098-161.224 64.398-248.15 64.398z"></path>
                        <path d="M980.764 557.511c-22.528 0-40.96-18.432-40.96-40.96v-327.68c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v327.68c0 22.528-18.432 40.96-40.96 40.96zM242.802 584.25c10.809-2.845 21.731 3.3 25.372 13.88 3.982 11.606 11.264 20.14 21.732 25.715 8.078 4.437 17.18 6.599 27.306 6.599 18.888 0 35.044-7.851 48.356-23.666 13.312-15.701 22.756-37.205 28.33-85.447-8.76 13.88-19.683 23.666-32.654 29.354-12.97 5.69-26.965 8.42-41.87 8.42-30.378 0-54.272-9.444-72.021-28.33-17.636-18.888-26.51-43.122-26.51-72.932 0-28.558 8.76-53.59 26.169-75.321 17.408-21.618 43.121-32.54 77.14-32.54 45.853 0 77.484 20.593 94.892 61.895 9.67 22.641 14.45 51.086 14.45 85.22 0 38.456-5.803 72.59-17.409 102.285-19.228 49.494-51.769 74.183-97.621 74.183-30.72 0-54.158-8.078-70.087-24.12-11.378-11.492-18.66-25.032-21.96-40.733-2.275-10.923 4.552-21.731 15.36-24.576l1.025 0.114z m117.19-84.65c10.696-8.534 16.044-23.439 16.044-44.715 0-19.115-4.78-33.337-14.45-42.667s-21.846-13.995-36.75-13.995c-15.93 0-28.672 5.348-38.002 16.043-9.33 10.695-14.109 25.031-14.109 42.894 0 16.953 4.096 30.379 12.402 40.391 8.192 10.013 21.39 14.905 39.367 14.905 12.97 0 24.804-4.323 35.499-12.857z m305.153-98.646c14.108 25.941 21.049 61.44 21.049 106.61 0 42.78-6.372 78.165-19.115 106.154-18.432 40.164-48.697 60.189-90.567 60.189-37.774 0-65.877-16.384-84.423-49.266-15.36-27.42-23.097-64.17-23.097-110.364 0-35.727 4.665-66.447 13.88-92.047 17.295-47.786 48.584-71.68 93.868-71.68 40.846 0 70.314 16.84 88.405 50.404zM619.406 598.13c10.695-15.815 15.93-45.398 15.93-88.747 0-31.175-3.87-56.889-11.492-77.027-7.737-20.14-22.642-30.265-44.829-30.265-20.366 0-35.271 9.557-44.715 28.672-9.443 19.114-14.108 47.331-14.108 84.537 0 27.989 2.958 50.517 8.988 67.584 9.216 25.94 25.032 39.025 47.332 39.025 17.863 0 32.2-7.964 42.894-23.78z m224.029-228.125c12.743 12.857 19.114 28.445 19.114 46.877 0 19-6.599 34.93-19.91 47.559-13.199 12.743-28.673 19.115-46.195 19.115-19.456 0-35.498-6.6-47.9-19.798-12.402-13.198-18.66-28.558-18.66-46.194 0-18.773 6.6-34.588 19.684-47.445 13.084-12.857 28.786-19.342 46.876-19.342 18.546 0 34.248 6.485 46.99 19.228z m-72.59 72.59c7.054 7.055 15.587 10.582 25.6 10.582 9.557 0 17.976-3.527 25.144-10.581 7.168-7.055 10.695-15.588 10.695-25.714 0-9.671-3.527-18.09-10.58-25.145-7.055-7.054-15.475-10.581-25.26-10.581s-18.318 3.527-25.486 10.58c-7.168 7.055-10.695 15.588-10.695 25.715-0.114 9.557 3.413 17.977 10.581 25.145z"></path>
                    </svg>
                    <!-- 水平翻转 -->
                    <svg @click.stop.prevent="inevrtX" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M573.248 832v88h-96V832h96zM128 224a64 64 0 0 1 45.248 18.752l229.504 229.504a64 64 0 0 1 0 90.496l-229.504 229.504A64 64 0 0 1 64 747.008V288a64 64 0 0 1 64-64z m781.248-5.504a64 64 0 0 1 63.552 56.576l0.448 7.424v459.008a64 64 0 0 1-103.232 50.56l-6.016-5.312-229.504-229.504a64 64 0 0 1-5.312-84.48l5.312-6.016L864 237.248a64 64 0 0 1 45.248-18.752zM128 288v459.008l229.504-229.504L128 288z m445.248 368v88h-96V656h96z m0-176v88h-96V480h96z m0-176v88h-96V304h96z m0-176v88h-96V128h96z"></path>
                    </svg>
                    <!-- 垂直翻转 -->
                    <svg @click.stop.prevent="inevrtY" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                        <path d="M660.48 106.24L512 291.84l-149.12-185.6h297.6M768 69.12c1.28-19.2-13.44-36.48-33.28-37.12H289.28c-19.2 1.28-33.92 17.92-33.28 37.12 0 8.96 3.2 17.92 8.32 24.96l222.72 277.76a30.72 30.72 0 0 0 49.28 0l222.72-277.76c6.4-7.04 8.96-16 8.96-24.96zM768 954.88c1.28 19.2-13.44 36.48-33.28 37.12H289.28a35.52 35.52 0 0 1-33.28-37.12c0-8.96 3.2-17.92 8.32-24.96l222.72-277.76a30.72 30.72 0 0 1 49.28 0l222.72 277.76c6.4 7.04 8.96 16 8.96 24.96zM800 480h64v64h-64zM928 480h64v64h-64zM672 480h64v64h-64zM544 480h64v64h-64zM416 480h64v64h-64zM288 480h64v64h-64zM160 480h64v64h-64zM32 480h64v64h-64z"></path>
                    </svg>
                    <!-- 重置 -->
                    <svg @click.stop.prevent="resetStyle" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" width="20" height="20">
                        <path d="M863.153113 702.196507h116.959605a43.887282 43.887282 0 0 1 0 87.774563H863.153113A73.182042 73.182042 0 0 0 789.97107 863.153113v116.959605a43.887282 43.887282 0 0 1-87.774563 0V863.153113A160.956606 160.956606 0 0 1 863.153113 702.196507z m0-380.393014h116.959605a43.887282 43.887282 0 0 0 0-87.774563H863.153113A73.182042 73.182042 0 0 1 789.97107 160.956606V43.887282a43.887282 43.887282 0 0 0-87.774563 0v117.069324a160.846887 160.846887 0 0 0 160.956606 160.846887z m-702.196507 0H43.887282a43.887282 43.887282 0 0 1 0-87.774563h117.069324a73.072324 73.072324 0 0 0 73.072324-73.072324V43.887282a43.887282 43.887282 0 0 1 87.774563 0v117.069324a160.846887 160.846887 0 0 1-160.846887 160.846887z m0 380.393014H43.887282a43.887282 43.887282 0 0 0 0 87.774563h117.069324a73.182042 73.182042 0 0 1 73.072324 73.182043v116.959605a43.887282 43.887282 0 0 0 87.774563 0V863.153113A160.846887 160.846887 0 0 0 160.956606 702.196507z"></path>
                    </svg>
                    <!-- 下载 -->
                    <svg @click.stop.prevent="downloads" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024" >
                        <path d="M768.35456 416a256 256 0 1 0-512 0 192 192 0 1 0 0 384v64a256 256 0 0 1-58.88-505.216 320.128 320.128 0 0 1 629.76 0A256.128 256.128 0 0 1 768.35456 864v-64a192 192 0 0 0 0-384z m-512 384h64v64H256.35456v-64z m448 0h64v64h-64v-64z" ></path>
                        <path d="M539.04256 845.248V512.192a32.448 32.448 0 0 0-32-32.192c-17.664 0-32 14.912-32 32.192v333.056l-36.096-36.096a32.192 32.192 0 0 0-45.056 0.192 31.616 31.616 0 0 0-0.192 45.056l90.88 90.944a31.36 31.36 0 0 0 22.528 9.088 30.08 30.08 0 0 0 22.4-9.088l90.88-90.88a32.192 32.192 0 0 0-0.192-45.12 31.616 31.616 0 0 0-45.056-0.192l-36.096 36.096z"></path>
                    </svg>
                    <template v-if="playState">
                        <svg v-if="isMultipleImage" @click.stop.prevent="stopPlay" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                            <path d="M512 2.56C231.424 2.56 3.584 229.888 3.584 510.976S231.424 1018.88 512 1018.88s508.416-227.328 508.416-508.416S793.088 2.56 512 2.56z m0 941.568c-239.616 0-433.664-194.048-433.664-433.664S272.384 76.8 512 76.8s433.664 194.048 433.664 433.664-194.048 433.664-433.664 433.664z"></path>
                            <path d="M409.6 730.112c-19.968 0-35.84-15.872-35.84-35.84v-332.8c0-19.968 15.872-35.84 35.84-35.84s35.84 15.872 35.84 35.84v332.8c0 19.968-15.872 35.84-35.84 35.84zM614.4 730.112c-19.968 0-35.84-15.872-35.84-35.84v-332.8c0-19.968 15.872-35.84 35.84-35.84s35.84 15.872 35.84 35.84v332.8c0 19.968-15.872 35.84-35.84 35.84z"></path>
                        </svg>
                    </template>
                    <template v-else>
                        <svg v-if="isMultipleImage" @click.stop.prevent="autoPlay" class="tool-item-icon__btn icon-is-hover" viewBox="0 0 1024 1024">
                            <path d="M423.687947 757.47897a100.195631 100.195631 0 0 1-100.195631-101.197587V366.716009a100.195631 100.195631 0 0 1 153.299316-85.166286l232.453863 145.283665a100.195631 100.195631 0 0 1 0 170.332573L476.791632 741.447669a100.195631 100.195631 0 0 1-52.101729 15.029345z m0-410.802087a21.041083 21.041083 0 0 0-10.019563 3.005869 20.039126 20.039126 0 0 0-10.019563 17.033257v289.565374a20.039126 20.039126 0 0 0 31.060646 17.033257l232.453863-145.283665a20.039126 20.039126 0 0 0 0-34.066514L433.70751 349.682752a19.03717 19.03717 0 0 0-10.019563-4.007825z"></path>
                            <path d="M512.862059 1023.999349A511.999674 511.999674 0 0 1 313.472753 40.078252a511.999674 511.999674 0 0 1 398.778611 942.840888 508.993805 508.993805 0 0 1-199.389305 41.080209z m0-943.842844C274.396457 80.156505 81.018889 273.534073 81.018889 511.999674s193.377568 431.84317 431.84317 431.84317 431.84317-194.379524 431.843169-431.84317S750.325704 80.156505 512.862059 80.156505z"></path>
                        </svg>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <div class="images-viewer-vue3__close close-btn" @click="close">
        <svg class="close-icon icon-is-hover svg-icon__action" viewBox="0 0 1024 1024" width="15" height="15">
            <path d="M835.2 854.4c-12.8 0-22.4-3.2-32-12.8L211.2 256C192 240 192 211.2 208 195.2s44.8-16 60.8 0L864 780.8c16 16 16 44.8 0 60.8-6.4 9.6-16 12.8-28.8 12.8z"></path>
            <path d="M236.8 848c-12.8 0-22.4-3.2-32-12.8-16-16-16-44.8 0-60.8l604.8-576c16-16 44.8-16 60.8 0s16 44.8 0 60.8l-604.8 576c-9.6 9.6-19.2 12.8-28.8 12.8z"></path>
        </svg>
    </div>

    <HotKeys v-model:hotkey="hotkey" :is-active-key.camel="isActiveKey"></HotKeys>
    <Message :is-active="isMessage"></Message>
</div>

</template>
<script setup lang="ts">
import { watch, ref, nextTick, onBeforeUnmount } from 'vue';
import type { PropType, Ref } from 'vue'
import { useToolbar } from '../hooks/toolbar';
import { debounce, getUserAgent } from '../utils';
import { FlipAnimate } from '../utils/flip-animate';
import HotKeys from './HotKeys.vue';
import Message from './Message.vue';
import MobileViewer from './MobileViewer.vue';
import LoadingUI from './Loading.vue';
import ScrollItemNav from './ScrollItemNav.vue'
import { useCusShortKey } from '../utils/hotkeys';
import { HotkeysEvent } from 'hotkeys-js';
import { messages, lang } from '../langs/index';
import { useMouse } from '../hooks/mouse';
import { usePlayer } from '../hooks/player';
import { ImageObjectTypes } from '../types/image-viewer';

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
        type: Array as PropType<string[]>,
        required: true
    },
    zIndex: {
        type: Number,
        default: () => {
            return 2000
        }
    },
    image: {
        type: HTMLImageElement,
        required: false
    },
    from: {
        type: String,
        default: () => {
            return ''
        }
    },
    handleChange: {
        type: Function,
        default: () => {
            return () => {}
        }
    },
    handleClose: {
        type: Function,
        default: () => {
            return () => {}
        }
    },
    language: {
        type: String,
        default: () => {
            return 'zh'
        }
    }
})

const $t = (langkey = "") => {
    // @ts-ignore
    const local = messages[props.language]
    if (local) {
        const { image } = local
        const keys = langkey.split('.')
        return image[keys[1]] || langkey
    } else {
        console.warn(`[images-viewer-vue3]:The current language '${props.language}' is not supported`)
        return props.language
    }
}

const {
    updateImageSrc,
    isMultipleImage,
    onWheelListener,
    imageInfo,
    nextImage,
    previousImage,
    destroyedExe,
    resetStyle,
    downloads,
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
    currentIndex,
} = useToolbar(props.images as string[], props.handleChange);

const emits = defineEmits(['on-close', 'on-change', 'onUpdate:value']);

const { onMouseDown,onMouseMove,onMouseUp, onMouseLeave } = useMouse()

// 自动播放
const { scrollItemNavRef, playState, autoPlay, stopPlay, hotKeyAutoPlay} = usePlayer(currentIndex, props.images, imageRef, props.handleChange)
const onMouseEnterImage = (evt:MouseEvent) => {
    stopPlay()
}

// 自动播放过程中，手动切换图片，停止播放
const setPrevious = () => {
    stopPlay()
    previousImage()
}
const setNext = () => {
    stopPlay()
    nextImage()
}

// 快捷键提示
const hotkey = ref('')
const isActiveKey = ref(false)

// 注册快捷键
function registerHotkey (keys: string, action: () => void, prevent: boolean = true) {
    useCusShortKey({
        [keys]:(event: KeyboardEvent, handler: HotkeysEvent) => {
            // action(event)
            action()
            toggleHotkey(event, handler, prevent)
        }
    })
}

// next
registerHotkey('right', nextImage)
// previous
registerHotkey('left', previousImage)
// inevrtY
registerHotkey('ctrl+i+y', inevrtY)
// inevrtX
registerHotkey('ctrl+i+x', inevrtX)
// Rotate 90 degrees clockwise
registerHotkey('ctrl+c+r', clockwise)
// Rotate 90 degrees counterclockwise
registerHotkey('ctrl+c+l', counterclockwise)
// reset
registerHotkey('ctrl+z', resetStyle)
// close
registerHotkey('esc', close)
// autoPlay image
registerHotkey('space', hotKeyAutoPlay)

// scale
useCusShortKey({'ctrl+*': (event:KeyboardEvent, handler:HotkeysEvent) => {
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
function toggleHotkey (event:KeyboardEvent, handler:HotkeysEvent, isPrevent = false, cusKey = "") {
    if (isPrevent) event.preventDefault()

    const { key } = handler;
    hotkey.value = cusKey||key
    isActiveKey.value = true
    setTimeout(() => {
        isActiveKey.value = false
    }, 2000)
}

// 移动端监听回调
const onCallBack = ({ index, url}: ImageObjectTypes) => {
    currentIndex.value = index
    updateImageSrc.value = url
    props.handleChange({image: url, index: currentIndex.value })
}

const isVisibleNav = ref(false)
const isMessage = ref(false)
const setNavState = () => {
    isVisibleNav.value = !isVisibleNav.value
}

// 页面渲染完成后
nextTick(() => {
    if (getUserAgent()) {
        // @TODO
        updateImageSrc.value = props.current
        loading.value = false
        const findIndex = props.images.findIndex(el => el === props.current)
        if (findIndex !== -1) {
            currentIndex.value = findIndex
        }
    } else loadPc()
})

function loadPc () {
    if (!imageRef.value) return

    if (props.image === void 0) {
        imageRef.value.src = props.current
    } else {
        const findIndex = props.images.findIndex(el => el === props.current)
        if (findIndex !== -1) {
            currentIndex.value = findIndex
        }

        const firstRect = props.image.getBoundingClientRect()

        updateImageSrc.value = imageRef.value.src = props.image.src

        const lastRect = imageRef.value.getBoundingClientRect()
        const player = FlipAnimate(imageRef.value, firstRect, lastRect)

        player.addEventListener('finish', (evt) => { 
            isVisibleNav.value = true
            // console.log('Animation execution completed.')
        })
    }
}

watch(() => currentIndex.value, (n, o) => {
    if (n) {
        updateIsActive()
    }
})

function updateIsActive () {
    if (currentIndex.value===props.images.length-1) {
        isMessage.value = true
        setTimeout(() => {
            isMessage.value = false
        }, 2000)
    }
}

// const onClickNavImage = debounce(clickImge, 200)
type ClickImageType = {
    evt:Event, 
    item: ImageObjectTypes, 
    index: number
}
function clickImge ({ evt, item, index }:ClickImageType) {

    loadImageErrorText.value = ""
    if (!imageRef.value) return

    if (evt.target) {
        const EL = evt.target as HTMLImageElement
        const firstRect = EL.getBoundingClientRect()
        const imageId = Number(EL.getAttribute('data-id')) 
        // 点击相同照片不更新视图
        if (imageId === currentIndex.value) return

        currentIndex.value = item.index
        // currentIndex.value = originImages.value.findIndex(el => el.index === activeIndex.value)
        updateImageSrc.value = imageRef.value.src = EL.src
        const lastRect = imageRef.value.getBoundingClientRect()
        props.handleChange({image: updateImageSrc.value, index: currentIndex.value })
        FlipAnimate(imageRef.value, firstRect, lastRect)
    }
}

function close () {
    destroyedExe()
    props.handleClose()
    updateImageSrc.value = ""
}

onBeforeUnmount( () => {
    destroyedExe()
})
</script>

<style lang="scss" src="../styles/index.scss" scoped></style>