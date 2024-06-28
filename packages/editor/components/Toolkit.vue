<template>
    <div class="vue3-major-editor__toolbar" data-major-editor="true">
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button :style="{ cursor: !isUndo ? 'not-allowed' : 'pointer' }" data-toolbar-type="toolbar-btn"
                    @click="editor.chain().focus().undo().run()" :disabled="!isUndo">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M223.300267 221.320533h410.555733c214.493867 0 388.437333 173.192533 388.437333 386.798934 0 213.674667-173.943467 386.8672-388.437333 386.8672H116.053333a64.580267 64.580267 0 0 1-64.7168-64.512c0-35.566933 29.013333-64.443733 64.7168-64.443734h517.802667a258.389333 258.389333 0 0 0 258.935467-257.911466 258.389333 258.389333 0 0 0-258.935467-257.8432h-415.061333L293.546667 424.823467a64.3072 64.3072 0 0 1-28.672 108.7488 64.853333 64.853333 0 0 1-62.941867-17.6128L19.114667 333.687467a64.375467 64.375467 0 0 1 0-91.204267L201.9328 60.074667a64.9216 64.9216 0 0 1 91.613867 0c25.258667 25.122133 25.258667 65.9456 0 91.136l-70.314667 70.0416z"
                            :fill="!isUndo ? '#666' : ''"></path>
                    </svg>
                </button>
            </template>
            <span>撤销</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button :style="{ cursor: !isRedo ? 'not-allowed' : 'pointer' }" data-toolbar-type="toolbar-btn"
                    @click="editor.chain().focus().redo().run()" :disabled="!isRedo">
                    <svg viewBox="0 0 1092 1024" width="200" height="200">
                        <path
                            d="M828.893867 220.091733H418.338133C203.844267 220.091733 29.969067 393.216 29.969067 606.890667c0 213.674667 173.8752 386.798933 388.369066 386.798933h517.802667a64.580267 64.580267 0 0 0 64.7168-64.443733 64.580267 64.580267 0 0 0-64.7168-64.443734H418.338133A258.389333 258.389333 0 0 1 159.402667 606.890667a258.389333 258.389333 0 0 1 258.935466-257.911467h415.1296l-74.888533 74.615467a64.3072 64.3072 0 0 0 28.672 108.7488 64.853333 64.853333 0 0 0 62.941867-17.6128l183.022933-182.272a64.375467 64.375467 0 0 0 0-91.272534L850.193067 58.914133a64.9216 64.9216 0 0 0-91.5456 0 64.3072 64.3072 0 0 0 0 91.136l70.314666 70.0416z"
                            :fill="!isRedo ? '#666' : ''"></path>
                    </svg>
                </button>
            </template>
            <span>重做</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleClearContent">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M573.44 962.56s-5.12 0 0 0l-102.4-56.32v-5.12c10.24-20.48 97.28-204.8 87.04-199.68-10.24 10.24-71.68 76.8-117.76 143.36l-25.6 35.84s-102.4-71.68-138.24-112.64c20.48-30.72 133.12-174.08 133.12-174.08l-189.44 112.64c-10.24-10.24-71.68-76.8-92.16-112.64 15.36-15.36 117.76-102.4 117.76-102.4l-143.36 51.2-51.2-97.28v-5.12c25.6-5.12 235.52-46.08 332.8-117.76h10.24l291.84 291.84s5.12 5.12 0 10.24c-10.24 25.6-92.16 158.72-112.64 337.92zM952.32 163.84L768 348.16v5.12c40.96 71.68 40.96 153.6-20.48 215.04h-5.12L450.56 276.48v-5.12c61.44-61.44 143.36-61.44 215.04-20.48h5.12l184.32-184.32c25.6-25.6 71.68-25.6 97.28 0s25.6 71.68 0 97.28z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>清空文档</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover" v-if="editor">
            <template #trigger>
                <button :class="[
                    {
                        'is-cell_active': editor && editor.isActive('bold'),
                    },
                ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Bold')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M362.976 804.704h141.12c79.616 0 135.776-10.24 168.384-30.784 32.64-20.48 48.96-54.496 48.96-101.984 0-47.904-15.584-82.016-46.72-102.304-31.168-20.288-85.92-30.432-164.288-30.432h-147.456v265.504z m0-345.152h132.832c60.16 0 104.768-9.728 133.76-29.12 29.056-19.456 43.552-49.44 43.552-90.048 0-38.4-13.12-67.872-39.392-88.384-26.272-20.48-64-30.752-113.12-30.752h-157.632v238.304zM545.376 896H236.48c-14.816 0-25.92-3.872-33.344-11.648-7.424-7.776-11.136-19.424-11.136-34.976 0-17.28 15.04-44.672 50.24-44.672h20.96V221.248H242.24c-32.64 0-46.4-28.928-46.4-46.624 0-15.104 3.776-26.656 11.424-34.656 7.616-8 18.624-11.968 33.024-11.968h266.336c89.824 0 158.24 17.792 205.248 53.44 47.04 35.584 70.56 87.296 70.56 155.072 0 34.112-7.2 63.904-21.6 89.376-14.4 25.472-35.84 46.4-64.192 62.816 45.76 16.832 79.744 40.32 101.984 70.56 22.24 30.24 33.376 68.64 33.376 115.264 0 39.296-9.536 75.136-28.608 107.52-19.072 32.352-45.952 58.88-80.704 79.616a232.64 232.64 0 0 1-69.28 26.24c-25.408 5.408-61.44 8.096-108.032 8.096z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>加粗</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover" v-if="editor">
            <template #trigger>
                <button :class="[
                    {
                        'is-cell_active': editor.isActive('italic'),
                    },
                ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Italic')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M828.30933 0l-20.374574 89.671814h-133.856209l-195.453757 844.656372h133.856209l-20.374573 89.671814H195.927584l20.374573-89.671814H350.869108l195.453756-844.656372H411.755914L432.130488 0z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>斜体</span>
        </NTooltip>
        <NPopover style="max-height: 270px;max-width: 300px;" trigger="click" placement="right" scrollable>
            <template #trigger>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <button class="is-active" data-toolbar-type="toolbar-btn">
                            <svg viewBox="0 0 1024 1024" width="200" height="200">
                                <path
                                    d="M0.239888 1024 0.239888 896.059972 1023.760112 896.059972 1023.760112 1024 0.239888 1024ZM677.762299 538.531563 340.22452 538.531563 246.924254 768.775636 127.444261 768.775636 451.420397 0.031985 582.990723 0.031985 895.244354 768.775636 767.576199 768.775636 677.762299 538.531563ZM512.223895 114.122505 374.59241 453.73931 644.689802 453.73931 512.223895 114.122505Z">
                                </path>
                            </svg>
                            <svg viewBox="0 0 1024 1024" width="200" height="200">
                                <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                            </svg>
                        </button>
                    </template>
                    <span>字体颜色</span>
                </NTooltip>
            </template>
            <div data-color-picker="major-color-picker" class="major-color-picker__wrap">
                <p style="margin: 5px 0;">颜色面板</p>
                <div style="display: flex;flex-wrap: wrap;">
                    <span v-for="(item, index) in colorList" :key="index" :style="{
                    background: item.value,
                    width: '2rem',
                    height: '2rem',
                    margin: '0.2rem',
                    borderRadius: '0.4rem'
                }" @click.stop="handleColorPicker(item.value)"></span>

                </div>
                <p style="margin: 5px 0;">颜色选择器</p>
                <input class="color-input__picker cursor" v-model="selectColor" type="color" list=""
                    @input="onChangeColor" />
            </div>
        </NPopover>
        <NTooltip placement="bottom" trigger="hover" v-if="editor">
            <template #trigger>
                <button :class="[
                    {
                        'is-cell_active': editor.isActive('underline'),
                    },
                ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Underline')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M512 811.296a312 312 0 0 0 312-312V89.6h-112v409.696a200 200 0 1 1-400 0V89.6h-112v409.696a312 312 0 0 0 312 312zM864 885.792H160a32 32 0 0 0 0 64h704a32 32 0 0 0 0-64z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>下划线</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover" v-if="editor">
            <template #trigger>
                <button :class="[
                    {
                        'is-cell_active': editor.isActive('strike'),
                    },
                ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Strike')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M968 542.9V481c0-1.7-0.5-3-2.3-3H571.6l-0.5-0.1c-10.7-2.1-21.6-4.2-32.5-6.2-16.9-3.1-23.2-4.3-31.8-6-53.1-10.4-85.4-20.7-111.6-35.8-37.9-22.1-56.3-52.2-56.3-92 0-39.7 16.4-72.8 47.3-95.7 30.1-22.3 72.8-34 123.3-34 57.8 0 102.6 15.3 133.1 45.5 15.6 15.4 27.1 34.3 34 56.2 1.6 4.9 3.1 11.4 4.6 18.8 0.5 2.5 2.7 4.3 5.3 4.3h75c2.9 0 5.4-2.3 5.4-5.2v-0.8c-1-6.8-1.3-12.1-2-15.9-7.3-43.8-28-82-59.9-110.8-44.7-40.8-110.8-62.4-191-62.4-73.4 0-139.4 18.3-185.9 51.5-25.8 18.6-45.6 41.4-58.8 67.9-13.4 27.2-20.3 58.7-20.3 93.5 0 29.5 5.6 54.5 17.2 76.5 8.2 15.5 19.3 29.2 34 41.9l10.2 8.8H59.2c-1.8 0-4.2 1.4-4.2 3.1V543c0 1.8 2.4 3 4.2 3h446.7l0.5 0.2c1.3 0.3 2.6 0.6 3.8 0.8 0.8 0.2 1.5 0.3 2.3 0.5 33 6.6 51.7 10.9 69 15.8 24.3 6.9 42.8 14.1 58 22.6 38.7 21.8 57.5 53.2 57.5 96 0 37.9-16.6 71.8-46.8 95.4-32.2 25.2-79.7 38.6-137.5 38.6-45.6 0-84.6-8.9-116-26.4-30.9-17.3-52.4-42.3-63.8-74.3-0.9-2.4-1.8-5.8-2.9-9.9-0.6-2.3-2.8-4.3-5.2-4.3h-82.1c-3 0-5.7 3-5.7 6v0.8c0 2.2 0.5 4.1 0.7 5.4 6.5 48.9 30.4 89 70.9 119 47.6 35.2 115 53.8 194.6 53.8 85.6 0 157.4-20.1 207.3-58 25-18.9 44.3-42.2 57.3-69.3 13.1-27.4 19.8-58.4 19.8-92.1 0-32-5.8-58.6-17.8-81.5-5.7-11.1-13-21.4-21.7-30.7l-7.9-8.5h225.3c2 0.1 2.5-1.3 2.5-3z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>删除线</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover" v-if="editor">
            <template #trigger>
                <button :class="[
                    {
                        'is-cell_active': editor.isActive('code'),
                    },
                ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Code')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M500.6336 124.6208L107.6736 512h776.6528L500.6336 124.6208z m434.432 362.0352a51.2 51.2 0 0 1 0 72.448l-398.2336 398.2336a51.2 51.2 0 0 1-72.3968 0L66.2016 559.104a51.2 51.2 0 0 1 0-72.448L464.384 88.4224a52.224 52.224 0 0 1 0.512-0.512l-0.512-0.512a51.1488 51.1488 0 0 1 72.3456 0l398.336 399.2576zM947.2 921.6c-42.3936 0-76.8-38.1952-76.8-85.3504 0-31.3856 25.6-88.2688 76.8-170.6496 51.2 82.3808 76.8 139.264 76.8 170.6496 0 47.104-34.4064 85.3504-76.8 85.3504z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>代码标签</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover" v-if="editor">
            <template #trigger>
                <button :class="[
                    {
                        'is-cell_active': editor.isActive('codeBlock'),
                    },
                ]" data-toolbar-type="toolbar-btn" @click="handleTextStyle('CodeBlock')">
                    <svg viewBox="0 0 1027 1024" width="200" height="200">
                        <path
                            d="M321.828571 226.742857c-14.628571-14.628571-36.571429-14.628571-51.2 0L7.314286 482.742857c-14.628571 14.628571-14.628571 36.571429 0 51.2l256 256c14.628571 14.628571 36.571429 14.628571 51.2 0 14.628571-14.628571 14.628571-36.571429 0-51.2L87.771429 512l234.057142-234.057143c7.314286-14.628571 7.314286-36.571429 0-51.2z m263.314286 0c-14.628571 0-36.571429 7.314286-43.885714 29.257143l-131.657143 497.371429c-7.314286 21.942857 7.314286 36.571429 29.257143 43.885714s36.571429-7.314286 43.885714-29.257143l131.657143-497.371429c7.314286-14.628571-7.314286-36.571429-29.257143-43.885714z m431.542857 256l-256-256c-14.628571-14.628571-36.571429-14.628571-51.2 0-14.628571 14.628571-14.628571 36.571429 0 51.2L936.228571 512l-234.057142 234.057143c-14.628571 14.628571-14.628571 36.571429 0 51.2 14.628571 14.628571 36.571429 14.628571 51.2 0l256-256c14.628571-14.628571 14.628571-43.885714 7.314285-58.514286z"
                            fill=""></path>
                    </svg>
                </button>
            </template>
            <span>代码块</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Blockquote')">
                    <svg viewBox="0 0 1025 1024" width="200" height="200">
                        <path
                            d="M224.992 448c123.712 0 224 100.288 224 224s-100.288 224-224 224-224-100.288-224-224l-0.992-32c0-247.424 200.576-448 448-448l0 128c-85.472 0-165.824 33.28-226.272 93.728-11.648 11.648-22.24 24.032-31.84 37.024 11.424-1.792 23.168-2.752 35.104-2.752zM800.992 448c123.712 0 224 100.288 224 224s-100.288 224-224 224-224-100.288-224-224l-0.992-32c0-247.424 200.576-448 448-448l0 128c-85.472 0-165.824 33.28-226.272 93.728-11.648 11.648-22.24 24.032-31.84 37.024 11.456-1.792 23.168-2.752 35.104-2.752z"
                            fill="#444444"></path>
                    </svg>
                </button>
            </template>
            <span>引用</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleTextStyle('OrderedList')">
                    <svg viewBox="0 0 1097 1024" width="200" height="200">
                        <path
                            d="M330.313143 225.499429v-109.714286h728.356571v109.714286H330.313143z m1.974857 369.005714v-109.714286h728.722286v109.714286H332.288z m-0.438857 365.129143v-109.714286h727.259428v109.714286H331.849143zM179.126857 49.298286v212.992h-58.88V122.733714c-9.508571 7.241143-18.724571 13.092571-27.648 17.554286s-20.041143 8.777143-33.499428 12.873143V105.325714c19.748571-6.363429 35.181714-14.043429 46.08-22.966857 10.971429-8.996571 19.602286-20.041143 25.746285-33.133714h48.201143z m38.4 578.706285H42.934857c2.048-17.261714 8.045714-33.499429 18.285714-48.64 10.093714-15.213714 29.110857-33.133714 57.051429-53.833142 17.042286-12.653714 27.940571-22.235429 32.694857-28.818286a32.329143 32.329143 0 0 0 7.094857-18.724572 21.869714 21.869714 0 0 0-7.021714-16.384 24.649143 24.649143 0 0 0-17.773714-6.729142 24.795429 24.795429 0 0 0-18.285715 6.948571c-4.681143 4.681143-7.826286 12.946286-9.508571 24.722286l-58.221714-4.681143c2.267429-16.384 6.436571-29.184 12.580571-38.4a58.368 58.368 0 0 1 25.746286-21.138286c11.117714-4.900571 26.477714-7.314286 46.08-7.314286 20.48 0 36.425143 2.340571 47.762286 6.948572a58.148571 58.148571 0 0 1 26.916571 21.504c6.509714 9.654857 9.728 20.48 9.728 32.548571a66.56 66.56 0 0 1-11.190857 36.571429c-7.460571 11.629714-21.065143 24.356571-40.740572 38.253714-11.702857 8.045714-19.602286 13.750857-23.552 17.042286a215.259429 215.259429 0 0 0-13.897142 12.653714h90.843428v47.469714zM103.643429 844.8l-55.003429-9.874286a69.046857 69.046857 0 0 1 26.331429-40.228571c13.019429-9.435429 31.451429-14.043429 55.296-14.043429 27.282286 0 47.030857 5.12 59.245714 15.286857 12.214857 10.166857 18.285714 22.966857 18.285714 38.4a42.934857 42.934857 0 0 1-7.387428 24.576 63.122286 63.122286 0 0 1-22.454858 19.309715c8.045714 1.974857 14.262857 4.315429 18.578286 6.948571a45.348571 45.348571 0 0 1 16.237714 16.969143 51.2 51.2 0 0 1 5.778286 25.088 69.851429 69.851429 0 0 1-9.581714 35.108571 64.146286 64.146286 0 0 1-27.574857 25.819429c-11.995429 5.997714-27.794286 9.069714-47.323429 9.069714-19.017143 0-34.011429-2.267429-45.056-6.729143a67.291429 67.291429 0 0 1-27.136-19.675428 90.258286 90.258286 0 0 1-16.384-32.475429l58.148572-7.753143c2.340571 11.702857 5.851429 19.894857 10.678857 24.356572 4.827429 4.534857 10.971429 6.802286 18.285714 6.802286 7.899429 0 14.336-2.852571 19.529143-8.557715a32.694857 32.694857 0 0 0 7.826286-22.820571 31.744 31.744 0 0 0-7.533715-22.601143 26.550857 26.550857 0 0 0-20.333714-8.045714c-4.534857 0-10.825143 1.170286-18.870857 3.437714l2.998857-41.545143a55.588571 55.588571 0 0 0 7.606857 0.731429 26.550857 26.550857 0 0 0 19.017143-7.314286 23.113143 23.113143 0 0 0 7.68-17.261714 20.626286 20.626286 0 0 0-5.705143-15.36 21.211429 21.211429 0 0 0-15.725714-5.632 23.04 23.04 0 0 0-16.749714 6.217143c-4.242286 4.096-7.168 11.410286-8.704 21.796571z"
                            fill="#333333"></path>
                    </svg>
                </button>
            </template>
            <span>有序列表</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleTextStyle('BulletList')">
                    <svg viewBox="0 0 1102 1024" width="200" height="200">
                        <path
                            d="M93.105231 187.943385a78.769231 78.769231 0 1 1 0-157.538462 78.769231 78.769231 0 0 1 0 157.538462z m0 393.846153a78.769231 78.769231 0 1 1 0-157.538461 78.769231 78.769231 0 0 1 0 157.538461z m0 393.846154a78.769231 78.769231 0 1 1 0-157.538461 78.769231 78.769231 0 0 1 0 157.538461zM276.243692 161.792v-118.153846h787.692308v118.153846h-787.692308z m0.472616 397.233231v-118.153846h788.007384v118.153846H276.716308z m-3.308308 397.154461v-118.153846h789.267692v118.153846H273.329231z"
                            fill="#333333"></path>
                    </svg>
                </button>
            </template>
            <span>无序列表</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleTextStyle('HorizontalRule')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M175.573333 688v-221.738667h253.44v221.738667h74.154667V192.64h-74.154667V405.76h-253.44V192.64H101.418667v495.36h74.154666z m485.12 0V497.92h74.154667l114.474667 190.08h81.365333l-122.410667-200.149333c66.986667-20.181333 107.264-73.429333 107.264-142.549334 0-90.026667-69.12-152.661333-167.04-152.661333H587.946667v495.36h72.746666z m77.013334-249.130667h-77.013334V251.733333h77.013334c60.501333 0 102.272 38.869333 102.272 93.568 0 54.741333-41.813333 93.610667-102.272 93.610667z"
                            fill="#191919" p-id="8929"></path>
                        <path d="M91.989333 768.981333h840.021334v64H91.989333z" fill="#191919"></path>
                    </svg>
                </button>
            </template>
            <span>水平分隔符</span>
        </NTooltip>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleTextStyle('Paragraph')">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M128 224C128 206.336 142.336 192 160 192l704 0C881.664 192 896 206.336 896 224l0 0C896 241.664 881.664 256 864 256l-704 0C142.336 256 128 241.664 128 224L128 224zM384 416C384 433.664 398.336 448 416 448l448 0C881.664 448 896 433.664 896 416l0 0C896 398.336 881.664 384 864 384l-448 0C398.336 384 384 398.336 384 416L384 416zM384 608C384 625.664 398.336 640 416 640l448 0c17.664 0 32-14.336 32-32l0 0C896 590.336 881.664 576 864 576l-448 0C398.336 576 384 590.336 384 608L384 608zM384 800C384 817.664 398.336 832 416 832l448 0c17.664 0 32-14.336 32-32l0 0c0-17.664-14.336-32-32-32l-448 0C398.336 768 384 782.336 384 800L384 800zM164.352 765.312 313.6 616C317.888 611.776 320 606.72 320 601.024S317.888 590.272 313.6 585.984L164.352 436.672C160.064 432.384 155.136 430.336 149.248 430.336c-5.696 0-10.624 2.048-14.976 6.336C130.048 440.896 128 445.888 128 451.648l0 298.688c0 5.76 2.048 10.752 6.272 14.912 4.352 4.288 9.344 6.4 14.976 6.4C155.136 771.712 160.064 769.6 164.352 765.312z"
                            fill="#020202"></path>
                    </svg>
                </button>
            </template>
            <span>段落</span>
        </NTooltip>
        <NPopselect v-model:value="selectHvalue" trigger="hover" :options="optionsHT" :on-update:value="handleHeading">
            <NTooltip placement="top" trigger="hover">
                <template #trigger>
                    <button class="is-active" data-toolbar-type="toolbar-btn">
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path
                                d="M768 512v384c0 35.4 28.6 64 64 64s64-28.6 64-64V128c0-35.4-28.6-64-64-64s-64 28.6-64 64v256H256V128c0-35.4-28.6-64-64-64S128 92.6 128 128v768c0 35.4 28.6 64 64 64s64-28.6 64-64V512h512z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                        </svg>
                    </button>
                </template>
                <span>标题</span>
            </NTooltip>
        </NPopselect>
        <NPopselect v-model:value="selectLineHeight" trigger="hover" :options="lineHeightOptions"
            :on-update:value="handleLineHeight">
            <NTooltip placement="top" trigger="hover">
                <template #trigger>
                    <button class="is-active" data-toolbar-type="toolbar-btn">
                        <svg viewBox="0 0 1097 1024" width="200" height="200">
                            <path
                                d="M37.888 155.355429v-109.714286h1024.219429v109.714286H37.888zM476.891429 445.952v-109.714286h584.265142v109.714286H476.891429z m0.877714 225.718857v-109.714286h582.656v109.714286H477.622857zM40.228571 958.025143v-109.714286h1018.587429v109.714286H40.228571z m-40.301714-514.925714l181.833143-172.690286L363.52 443.172571H-0.073143z m1.974857 148.772571h363.300572L183.588571 762.660571 1.901714 591.872z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                        </svg>
                    </button>
                </template>
                <span>行间距</span>
            </NTooltip>
        </NPopselect>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleTaskList()">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M853.333333 0a170.666667 170.666667 0 0 1 170.666667 170.666667v682.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H170.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V170.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h682.666666zM213.333333 76.8H170.666667a93.866667 93.866667 0 0 0-93.610667 87.168L76.8 170.666667v682.666666a93.866667 93.866667 0 0 0 87.168 93.610667L170.666667 947.2h682.666666a93.866667 93.866667 0 0 0 93.610667-87.168L947.2 853.333333V170.666667a93.866667 93.866667 0 0 0-87.168-93.610667L853.333333 76.8h-42.666666V213.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667 42.666667 0 0 1-42.666667-42.666667V76.8z m596.096 296.832a38.4 38.4 0 0 1 3.413334 50.389333l-3.413334 3.925334-307.712 307.754666a38.272 38.272 0 0 1-27.818666 11.221334 38.272 38.272 0 0 1-27.776-11.221334l-187.050667-187.050666a38.4 38.4 0 1 1 54.272-54.314667l160.554667 160.512 281.216-281.173333a38.4 38.4 0 0 1 54.314666 0zM733.866667 76.8H290.133333v102.4h443.733334V76.8z">
                        </path>
                    </svg>
                </button>
            </template>
            <span>任务列表</span>
        </NTooltip>
        <NPopselect v-model:value="selectTextAlign" trigger="hover" :options="textAlignOptions"
            :on-update:value="handleTextAlign">
            <NTooltip placement="top" trigger="hover">
                <template #trigger>
                    <button class="is-active" data-toolbar-type="toolbar-btn">
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path
                                d="M114.259 124.62h795.48c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-795.48c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 798.86h456.6c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-456.6c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 349.37h456.6c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-456.6c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26zM114.259 574.16h795.48c27.76 0 50.26 22.5 50.26 50.26 0 27.76-22.5 50.26-50.26 50.26h-795.48c-27.76 0-50.26-22.5-50.26-50.26 0-27.76 22.5-50.26 50.26-50.26z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M209.656 344.031l298.604 335.938 306.084-335.839-604.688-0.099z"></path>
                        </svg>
                    </button>
                </template>
                <span>文本对齐方式</span>
            </NTooltip>
        </NPopselect>
        <NTooltip placement="bottom" trigger="hover">
            <template #trigger>
                <button class="is-active" data-toolbar-type="toolbar-btn" @click="handleUploadImg()">
                    <svg viewBox="0 0 1024 1024" width="200" height="200">
                        <path
                            d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z">
                        </path>
                        <path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"></path>
                        <path d="M32 128v768h960V128H32z m896 704H96V192h832v640z"></path>
                    </svg>
                </button>
            </template>
            <span>添加图片</span>
        </NTooltip>
        <NPopover style="max-height: 340px;max-width: 335px;" trigger="click" placement="bottom" scrollable :on-update:show="doTable">
            <template #trigger>
                <NTooltip placement="top" trigger="hover">
                    <template #trigger>
                        <button class="is-active" data-toolbar-type="toolbar-btn">
                            <svg viewBox="0 0 1024 1024">
                                <path
                                    d="M938.666667 42.666667H85.333333C38.4 42.666667 0 81.066667 0 128v768c0 46.933333 38.4 85.333333 85.333333 85.333333h853.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V128c0-46.933333-38.4-85.333333-85.333333-85.333333zM298.666667 896H85.333333v-213.333333h213.333334v213.333333z m0-298.666667H85.333333V384h213.333334v213.333333z m341.333333 298.666667H384v-213.333333h256v213.333333z m0-298.666667H384V384h256v213.333333z m298.666667 298.666667h-213.333334v-213.333333h213.333334v213.333333z m0-298.666667h-213.333334V384h213.333334v213.333333z m0-298.666666H85.333333V128h853.333334v170.666667z">
                                </path>
                            </svg>
                        </button>
                    </template>
                    <span>表格</span>
                </NTooltip>
            </template>
            <div class="major-table-picker__wrap">
                <p style="margin: 5px 0; display: flex; align-items: center;">
                    <strong>{{tbOptions.row}}</strong>行x<strong>{{tbOptions.column}}</strong>列, 
                    表头: <input type="checkbox" v-model="tbOptions.isWithHeaderRow">
                    <a href="#" class="confirm__btn" @click.stop="handleTable">确定</a>
                </p>
                <div ref="tableFilterWrapRef" class="table-filter__wrap" 
                    @mousedown.stop="onMousedown"
                    @mousemove.stop="onMousemove"
                    @mouseleave.stop="onMouseleave"
                    @mouseup.stop="onMouseup">
                    <span class="table-column-item" v-for="(item, index) in 100" :key="index"></span>
                    <div ref="maskRef" class="table-mask__wrap"></div>
                </div>
            </div>
        </NPopover>
    </div>

    <UploadImage ref="UploadImageRef" @uploadImageSuccess="uploadImageSuccess"></UploadImage>
</template>

<script lang="ts" setup name="Toolkit">
import { ref, h, computed, reactive } from "vue";
import { NPopselect, NTooltip, NPopover, NModal } from "naive-ui";
import type { SelectOption } from "naive-ui";
import { useSelectCore } from "../hooks/useSelect";
import { useNaiveDiscrete } from "../hooks/navie-ui";
import { v4 as uuidV4 } from 'uuid';
import UploadImage from "./UploadImage.vue";
import { colorList, alignList, lineHeighList } from '../tools/config';

const { majorEditor, editor } = useSelectCore();
const { message, dialog, modal } = useNaiveDiscrete();
// const dialog = useDialog()

const emits = defineEmits(['onUploadImage'])

// 表格
const tbOptions = reactive({
    row: 0,
    column: 0,
    isWithHeaderRow: true
})
const tableFilterWrapRef = ref<HTMLElement | null>(null)
const maskRef = ref<HTMLElement | null>(null)
let startTop = 0, endTop = 0, startLeft = 0, endLeft = 0, selectedCells = [];
const isMouseDown = ref(false)
const doTable = (val:boolean) => {
    if (val) {
        tbOptions.row = 0
        tbOptions.column = 0
    }
}
const handleTable = () => {
    if (tbOptions.column==0 || editor.isActive('table')) return
    editor
    .chain()
    .focus()
    .insertTable({
        rows: tbOptions.row,
        cols: tbOptions.column,
        withHeaderRow: tbOptions.isWithHeaderRow
    }).run()
}
const onMousedown = (evt: MouseEvent) => {
    if (tableFilterWrapRef.value) {
        isMouseDown.value = true
        // const { top, left } = tableFilterWrapRef.value.getBoundingClientRect();
        // 动态获取鼠标按下起点坐标, 不设置，则起点坐标是父元素的左上角坐标值
        // startTop = evt.y - top
        // startLeft = evt.x - left
        
        // 恢复子元素样式
        const childrenList = tableFilterWrapRef.value.children
        for (let i = 0; i < childrenList.length; i++) {
            const child = childrenList[i] as HTMLElement
            if (child.className!=='table-mask__wrap') {
                child.style.background = '#f0f0f0'
                child.style.color = "#333"
            }
        }
    }
}
const onMousemove = (evt: MouseEvent) => {
    if (isMouseDown.value) {
        calculateSelectedCells(evt)
    }
}
const onMouseleave = (evt: MouseEvent) => {
    resetPosition()
} 
const onMouseup = (evt: MouseEvent) => {
    resetPosition()
}
function resetPosition () {
    isMouseDown.value = false
    if (maskRef.value && tableFilterWrapRef.value) {
        maskRef.value.style.width = '0px';
        maskRef.value.style.height = '0px';
        maskRef.value.style.border = 'none';
        startLeft = 0;
        startTop = 0;
        endLeft = 0;
        endTop = 0;
    }
}
function calculateSelectedCells(evt:MouseEvent) {
    if (maskRef.value && tableFilterWrapRef.value) {
        const { top, left } = tableFilterWrapRef.value.getBoundingClientRect();
        const childrenList = tableFilterWrapRef.value.children
    
        // 鼠标移动触发时，先清空数据
        selectedCells = []
        let minRow = 10, maxRow = 0, minCol = 10, maxCol = 0;
        // 获取移动中的鼠标位置
        endTop = evt.y - top;
        endLeft = evt.x - left;

        // 设置遮罩层的位置
        maskRef.value.style.top = Math.min(startTop, endTop) + 'px'
        maskRef.value.style.left = Math.min(startLeft, endLeft) + 'px'

        // 计算遮罩层宽高
        const maskWidth = Math.abs(startLeft - endLeft)
        const maskHeight = Math.abs(startTop - endTop)
        maskRef.value.style.width = maskWidth + 'px'
        maskRef.value.style.height = maskHeight + 'px'
        maskRef.value.style.border = '1px solid #18a058'

        // 获取遮罩层位置信息
        const maskPosition = maskRef.value.getBoundingClientRect()
        
        for (let i = 0; i < childrenList.length; i++) {
            // 获取每个子元素的位置信息
            const { left, top, right, bottom } = childrenList[i].getBoundingClientRect()

            // 判断子元素和遮罩是否有重叠
            if (
                right > maskPosition.left && 
                bottom > maskPosition.top && 
                left < maskPosition.right && 
                top < maskPosition.bottom
            ) {
                const child = childrenList[i] as HTMLElement
                
                if(child.className!=='table-mask__wrap') {
                    child.style.background = 'rgba(24, 160, 88, 0.1)'
                    // child.style.color = "#18a058"
                    // 获取选中的子元素索引
                    // selectedCells.push(i+1)
                    // console.log(selectedCells);
                    // 行索引
                    const row = Math.floor(i / 10);
                    // 列索引
                    const col = i % 10;
                    minRow = Math.min(minRow, row);
                    maxRow = Math.max(maxRow, row);
                    minCol = Math.min(minCol, col);
                    maxCol = Math.max(maxCol, col);
                }
            } else {
                const child = childrenList[i] as HTMLElement
                // child.style.color = "#333"
                child.style.background = '#f0f0f0'
            }
        }

        tbOptions.row = maxRow - minRow + 1;
        tbOptions.column = maxCol - minCol + 1;
    }
}

// 对齐
const selectTextAlign = ref("left");
const textAlignOptions = ref<Array<SelectOption>>(alignList);
const handleTextAlign = (val: string) => {
    selectTextAlign.value = val;
    if (majorEditor.editor) {
        majorEditor.editor.chain().focus().setTextAlign(val).run();
    }
};

// 设置行高
const selectLineHeight = ref("1.5");
const lineHeightOptions = ref<Array<SelectOption>>(lineHeighList);
const handleLineHeight = (val: string) => {
    selectLineHeight.value = val;
    majorEditor.setTextStyle("lineHeight", { lineHeight: val });
};

// 设置标题
const optionsHT = ref<Array<SelectOption>>([]);
const selectHvalue = ref("4");
const handleHeading = (val: string) => {
    majorEditor.setTextStyle("Heading", {
        level: +val,
    });
};

// 设置文本样式
function handleTextStyle(key: string) {
    majorEditor.setTextStyle(key);
}

// 创建任务列表
const handleTaskList = () => {
    if (editor) {
        // 查看是否存在任务
        const contentJSON = editor.getJSON();
        const hasTaskList = contentJSON.content?.some((item) => item.type === "taskList");
        if (hasTaskList) {
            editor
                .chain()
                .focus()
                .insertContent('<li data-type="taskItem" data-checked="false"><p>New Task</p></li>')
                .run();
        } else {
            // 如果没有任务列表，插入任务列表和任务项
            editor
                .chain()
                .focus()
                .insertContent(
                    '<ul data-type="taskList"><li data-type="taskItem" data-checked="false"><p>New Task</p></li></ul>'
                )
                .run();
        }
    }
};

// 上传图片
interface UploadImageType {
    initialize: () => void;
}
const UploadImageRef = ref<UploadImageType | null>(null)
const handleUploadImg = () => {
    UploadImageRef.value && UploadImageRef.value.initialize()
}
const uploadImageSuccess = ({ file, formData }: { file: FileList, formData: FormData }) => {
    emits('onUploadImage', { file, formData })
}

// 清空文本
function handleClearContent() {
    const texts = editor.getText();
    if (!texts) {
        message.info("暂无内容可清空");
        return;
    }
    dialog.warning({
        title: "警告",
        content: "你确定要清空全部文档内容吗？",
        positiveText: "确定",
        negativeText: "取消",
        maskClosable: false,
        onPositiveClick: () => {
            if (editor) {
                editor.commands.clearContent();
            }
        },
        onMaskClick: () => {
            // message.success('不能关闭')
        },
        onEsc: () => {
            // message.success('通过 esc 关闭')
        },
    });
}

// 是否允许撤销|重做
const isRedo = computed(() => {
    return editor && editor.can().chain().focus().redo().run() || false
});
const isUndo = computed(() => {
    return editor && editor.can().chain().focus().undo().run() || false
});


function getHList() {
    optionsHT.value = [];
    let i = 0;
    while (i < 6) {
        optionsHT.value.push({ label: `H${i + 1}`, value: `${i + 1}`, disabled: false });
        i++;
    }
}

// 设置字体颜色
const selectColor = ref('#94ddde')
const onChangeColor = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    majorEditor.setTextStyle('Color', {
        color: target.value
    });
}
const handleColorPicker = (color: string) => {
    majorEditor.setTextStyle('Color', {
        color
    });
}

function initialize() {
    getHList();
}

initialize();
</script>

<style lang="scss" scoped>
.major-table-picker__wrap {
    display: flex;
    flex-wrap: wrap;
    .confirm__btn {
        padding: 0;
        padding-inline: 0;
        margin-left: 0.5rem;
    }
    .table-filter__wrap {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        column-gap: 0.15rem;
        row-gap: 0.15rem;
        position: relative;

        .table-column-item {
            text-align: center;
            width: 1.8rem;
            height: 1.5rem;
            // margin: 0.2rem;
            border-radius: 0.1rem;
            background: #f0f0f0;
            // border: 1px solid #18a058;
            user-select: none;
        }

        .table-mask__wrap {
            position: absolute;
            width: 0px;
            height: 0px;
            // background-color: #000;
            // border: 1px solid #18a058;
            // opacity: 0.4;
        }
    }
}

.vue3-major-editor__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // background: rgba(24, 160, 88, 0.1);
    background: #f0f0f0;

    .is-cell_active {

        // background:rgba(24, 160, 88, 0.1);
        svg {
            fill: #18a058;
        }
    }

    svg:focus,
    svg:active {
        border: 0;
        outline: none;
    }

    svg {
        width: 1.3em;
        flex: 0 0 1.3em;
        height: 1.2em;
        fill: rgb(51, 54, 57);
    }

    button[data-toolbar-type="toolbar-btn"] {
        display: flex;
        align-items: center;
        padding: 0.5em 0.5em;
        outline: none;
        border: none;
        border-radius: 0.2em;
        // background: transparent;
        cursor: pointer;
        height: 3em;
    }
}
</style>