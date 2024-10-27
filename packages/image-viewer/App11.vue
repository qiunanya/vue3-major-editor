<template>
    <div class="container">
        <div class="list_scroll">
            <ul class="list"></ul>
        </div>
    </div>
</template>
<script setup>
import { nextTick} from 'vue'

nextTick(() => {
    // 获取容器和列表元素
    const listScroll = document.querySelector('.list_scroll')
    const { height, width } = listScroll.getBoundingClientRect()
    const list = document.querySelector('.list')
    // 源数据
    const dataSource = []
    // 渲染数据=> 通过定义首位index截取源数据
    let renderData = []
    // item的高度
    const itemWidth = 50
    // listScroll容器能够显示的最大数量
    // +2 撑开listScroll容器使其具有滚动条[可视区域容纳最大item个数]
    const maxCount = Math.floor(width/itemWidth) + 2
    console.log(width, maxCount, 77);
    // 开始位置索引
    let startIndex = 0
    // 结束位置索引
    let endIndex = 0
    // 记录到的位置索引
    let pointerIndex = 0

    let isDragging = false;
    let startX, scrollLeft;

    // 获取数据
    function GetData(params) {
        for (let i = 0; i < 200; i++) {
            dataSource.push(i)
        }
    }

    // 渲染
    function Render () {
        // 计算开始和结束位置
        const end = startIndex + maxCount
        endIndex = dataSource[end] !== void 0 ? end : dataSource.length

        // 获取数据
        renderData = dataSource.slice(startIndex, endIndex)
        // 将截取的渲染数据生成动态的item元素，填充到list内容元素
        list.innerHTML = renderData.map(item => `<li class="item" style="width: ${itemWidth}px">${item}</li>`).join('')
    }

    // 监听listOut滚动事件
    function ScrollHandle () {
        const maxScrollLeft = listScroll.scrollWidth - listScroll.clientWidth;
        // 更新开始位置索引：滚动的距离 / 每个元素的宽度
        startIndex = Math.floor(listScroll.scrollLeft / (itemWidth))
        console.log(endIndex, dataSource.length+4, 'endIndex')
        // 一致不做渲染
        if (pointerIndex === startIndex) return

        // if (endIndex === (dataSource.length+4)) return

        pointerIndex = startIndex

        // 更新位置，重新渲染
        Render()

        if (dataSource.length - startIndex >= maxCount) {
            // 测试发现每次向下滚动一个元素，列表会向上移动一个元素的位置，所以增加transform属性，使列表位置向下移动一个元素的位置
            // startIndex表示已经上移到的元素的个数，itemWidth表示每个元素的高度
            list.style.transform = `translateX(${startIndex * itemWidth}px)`
        } else {
            // 滑动到底部 加载增更多数据
            // GetData()
            return
        }
    }

    // 鼠标按下事件
    listScroll.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - listScroll.offsetLeft;
        scrollLeft = listScroll.scrollLeft;
        listScroll.style.cursor = 'grabbing';
        e.preventDefault();
    });

    // 鼠标移动事件
    listScroll.addEventListener('mousemove', (e) => {
        if (!isDragging) return; // 只有在拖动时才触发
        const x = e.pageX - listScroll.offsetLeft;
        const walk = (x - startX) * 2; // *2 增加拖动的滚动速度
        listScroll.scrollLeft = scrollLeft - walk;
    });

    // 鼠标松开事件
    listScroll.addEventListener('mouseup', () => {
        isDragging = false;
        listScroll.style.cursor = 'default';
    });

    // 鼠标离开事件（防止拖动时鼠标意外离开目标区域）
    listScroll.addEventListener('mouseleave', () => {
        isDragging = false;
        listScroll.style.cursor = 'grab';
    });

    function init () {
        // 获取数据
        GetData()
        Render()
        // 监听滚动事件
        listScroll.addEventListener('scroll', ScrollHandle)
    }
    init()
})
</script>
<style lang="scss">
 /* 最外层容器，宽高固定列表视口大小 */
 .container {
    // width: 500px;
    /* height: 800px; */
    border: 1px solid #f80c0c;
}

/* 可滚动容器，占最外层容器宽高100% 能被显示的列表撑开 */
.list_scroll {
    width: 100%;
    height: 100%;
    overflow-x: auto; /* 超出滚动 */
    background-color: antiquewhite;
}
/* 虚拟列表容器，用于展示长列表位于视口区域的部分项 */
.list {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px 0;
    list-style: none;
    /* width: max-content; */
}

/* 子项 */
.item {
    /* width: 100%; */
    height: 160px;
    flex: 0 0 50px;
    line-height: 160px;
    text-align: center;
    border: 1px solid #000;
    /* margin: 0 5px; */
}
</style>