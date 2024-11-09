<template>
    <div class="nav-image-loading__wrap">
        <div class="loading-spin"></div>
    </div>
</template>

<style lang="scss" scoped>
.nav-image-loading__wrap {
    .loading-spin {
        width: 60px;
        aspect-ratio: 1;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #10ac84;
        border-bottom: 16px solid tomato;
        -webkit-animation: animate 2s linear infinite;
                animation: animate 2s linear infinite;
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