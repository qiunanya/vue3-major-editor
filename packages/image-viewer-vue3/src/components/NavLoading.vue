<template>
    <div class="nav-image-loading__wrap">
        <div class="loading-spin"></div>
    </div>
</template>

<style lang="scss" scoped>
.nav-image-loading__wrap {
    .loading-spin {
        --loading-w: 5;
        width: 30px;
        aspect-ratio: 1;
        border: calc(var(--loading-w) * 1px) solid #f3f3f3;
        border-radius: 50%;
        border-top: calc(var(--loading-w) * 1px) solid #10ac84;
        border-bottom: calc(var(--loading-w) * 1px) solid tomato;
        -webkit-animation: animate 1s linear infinite;
                animation: animate 1s linear infinite;
        position: absolute;
        top: 15px;
        left: 20px;
    }
    @-webkit-keyframes animate {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes animate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>