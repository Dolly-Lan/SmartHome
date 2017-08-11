# SmartHome

[智能家居动画首页](http://babymian.com/work/home/)

### 需求：
首页滚动切换从早至晚6种智能家居场景，进入每种场景后按顺序执行3-4种动画效果。支持鼠标滚动浏览，上下键盘切换，导航任意切换。友好支持IE10+Chrome、Firfox、Safari。

1. JQuery.mousewheel插件moveToPage()方法内添加场景动画类
2. css3按顺序执行动画并流畅衔接，需严格计算动画执行时间和延迟执行时间来启动下一个动画
3. animation-fill-mode设定延迟动画执行前的状态解决尤其IE10明显bug
4. 同一元素动画相同但不能同时使用同一个keyframes

### 优化：
1. 按需加载图片，页面加载速度提高40%。
2. 添加等待状态