<template>
    <div class="loading-image__wrap">
        <span class="item1" style="--i: -0.32s;"></span>
        <span class="item2" style="--i: -0.16s;"></span>
        <span class="item3" style="--i: 0s;"></span>
    </div>
</template>

<style lang="scss" scoped>
.loading-image__wrap {
    .item1 {
        animation-delay: var(--i);
        background: #10ac84;
        box-shadow: 0 0 15px #10ac84;
    }
    .item2 {
        animation-delay: var(--i);
        background: #14FFEC;
        box-shadow: 0 0 15px #14FFEC;
    }
    .item3 {
        animation-delay: var(--i);
        background: #C62A88;
        box-shadow: 0 0 15px #C62A88;
    }
}
.loading-image__wrap span {
    display: inline-block;
    width: 40px;
    aspect-ratio: 1;
    border-radius: 50%;
    animation: loading 1.4s cubic-bezier(0, 0.55, 0.45, 1) infinite;
    -webkit-animation: loading 1.4s cubic-bezier(0, 0.55, 0.45, 1) infinite;
}
@-webkit-keyframes loading {
    0%, 80%, 100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    40% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
@keyframes loading {
    0%, 80%, 100% {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    40% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>