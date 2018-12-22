// 获取元素
const getElement = function(selector){
    return document.querySelector(selector);
}
 
const getAllElement = function(selector){
    return document.querySelectorAll(selector);
}

// 获取元素样式
const getCls = (element) =>{
    return element.getAttribute('class');
}

// 设置元素样式
const setCls = (element, cls) => {
    return element.setAttribute('class', cls);
}

// 为元素添加样式
const addCls = (element, cls) => {
    const baseCls = getCls(element);
    if(baseCls.indexOf(cls) === -1){
        setCls(element, baseCls+' '+cls);
    }
}

// 为元素删除样式
const delCls = (element, cls) => {
    const baseCls = getCls(element);
    if(baseCls.indexOf(cls) != -1){
        setCls(element, baseCls.split(cls).join('').replace(/\s+/g,''));
    }
}

// 初始化元素样式为 _animate-init
// 存放屏内需要有动画的元素
const screenAnimateElements = {
    '.screen1':[
        '.screen1_description',
        '.screen1_image',
        '.screen1_shadow'
    ],
    '.screen2':[
        '.screen2_desp1',
        '.screen2_desp2',
        '.screen2_image',
        '.sp1',
        '.sp2',
        '.sp3'
    ],
    '.screen3':[
        '.screen3_desp1',
        '.screen3_desp2',
        '.screen3_image',
        '.features',
        '.features_item'
    ],
    '.screen4':[
        '.screen4_desp1',
        '.screen4_desp2',
        '.screen4_image',
        '.screen4_image-1',
        '.screen4_image-2',
        '.screen4_image-3',
        '.screen4_image-4',
        '.model_desp1',
        '.model_desp2',
        '.model_desp3',
        '.model_desp4'
    ],
    '.screen5':[
        '.screen5_desp1',
        '.screen5_desp2',
        '.screen5_image',
    ]
};

// 设置屏内元素初始状态为 _animate-init 
const setScreenAnimateInit = (screenCls) => {
    // 获取当前屏内的元素
    const screen = document.querySelector(screenCls);
    // 获取需要设置动画的元素
    const animateElements = screenAnimateElements[screenCls];

    for(let i = 0; i < animateElements.length; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls +' '+animateElements[i].substr(1) + '_animate-init' );
    }
}

//  设置屏内元素播放动画
const playScreenAnimateDone = (screenCls) => {
    // 获取当前屏内的元素
    const screen = document.querySelector(screenCls);
    // 获取需要设置动画的元素
    const animateElements = screenAnimateElements[screenCls];

    for(let i = 0; i < animateElements.length; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class', baseCls.replace('_animate-init', '_animate-done'));
    }
}

// 页面刚加载时调用
window.onload = () => {
    // console.log('hello');
    // 调用方法 设置动画
    for(key in screenAnimateElements){
        setScreenAnimateInit(key);
    }
}


// 滚动条滚动时触发
const navItems = getAllElement('.nav_item');
const rightNavItems = getAllElement('.rn_item');

const switchNavItemsActive = (idx) => {
    for(let i = 0; i<navItems.length; i++){
        delCls(navItems[i], 'nav_item_active');
    }
    addCls(navItems[idx], 'nav_item_active');

    for(let i = 0; i<rightNavItems.length; i++){
        delCls(rightNavItems[i], 'rn_item_active');
    }
    addCls(rightNavItems[idx], 'rn_item_active');
};
// 默认首页给高亮
switchNavItemsActive(0);

window.onscroll = () => {
    // 获取滚动条高度
    const high =  document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(high);
    if(high > 80){
        // 为header 元素添加header_changed样式
        addCls( getElement('.header'), 'header_changed');
        // 为rightNav 元素添加rightNav_changed样式
        addCls( getElement('.rightNav'), 'rightNav_changed');
    }else{
        // 为header 元素删除header_changed样式
        delCls( getElement('.header'), 'header_changed');
        // 为rightNav 元素删除rightNav_changed样式
        delCls( getElement('.rightNav'), 'rightNav_changed');
        switchNavItemsActive(0);
    }

    if(high > 1){
        playScreenAnimateDone('.screen1');
    }
    if(high > 800*1-150){
        playScreenAnimateDone('.screen2');
        switchNavItemsActive(1);
    }
    if(high > 800*2-150){
        playScreenAnimateDone('.screen3');
        switchNavItemsActive(2);
    }
    if(high > 800*3-150){
        playScreenAnimateDone('.screen4');
        switchNavItemsActive(3);
    }
    if(high > 800*4-150){
        playScreenAnimateDone('.screen5');
        switchNavItemsActive(4);
    }

}

/* 定位 点击导航类别 跳到相应的页面 */


const setNavJump = (i, lib) => {
    const item = lib[i];
    item.onclick = () => {
        document.documentElement.scrollTop = i*800;
    };
};

for(let i = 0; i<navItems.length; i++){
    setNavJump(i, navItems);
}
for(let i = 0; i<rightNavItems.length; i++){
    setNavJump(i, rightNavItems);
}