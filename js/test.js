// 屏内需要有动画的元素
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

// 设置屏内动画
function setScreenAnimate(screenCls){
    // 获取当前屏内的元素
    const screen = document.querySelector(screenCls);
    // 获取需要设置动画的元素
    const animateElements = screenAnimateElements[screenCls];

    // 判断是否有初始化子元素的样式
    let isSetAnimateClass = false; 

    // 判断是否有初始化子元素的样式是done吗
    let isAnimateDone = false;
    screen.onclick = () => {
        // 初始化样式 给元素增加 _animate-init 样式（动画）
        if(isSetAnimateClass === false){
            for(let i = 0; i < animateElements.length; i++){
                let element = document.querySelector(animateElements[i]);
                let baseCls = element.getAttribute('class');
                element.setAttribute('class', baseCls +' '+animateElements[i].substr(1) + '_animate-init' );
            }
            isSetAnimateClass = true;
            return ;
        }

        // 切换所有 anmiateElements 的 init 为 done
        if(isAnimateDone === false){
            for(let i = 0; i < animateElements.length; i++){
                let element = document.querySelector(animateElements[i]);
                let baseCls = element.getAttribute('class');
                element.setAttribute('class', baseCls.replace('_animate-init', '_animate-done'));
            }
            isAnimateDone =true;
            return ;
        }

        // 切换所有 anmiateElements 的 done 为 init
        if(isAnimateDone === true){
            for(let i = 0; i < animateElements.length; i++){
                let element = document.querySelector(animateElements[i]);
                let baseCls = element.getAttribute('class');
                element.setAttribute('class', baseCls.replace('_animate-done', '_animate-init'));
            }
            isAnimateDone =false;
            return ;
        }
    }
}

// 调用方法 设置动画
for(key in screenAnimateElements){
    setScreenAnimate(key);
}

