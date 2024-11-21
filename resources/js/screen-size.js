// フルスクリーン表示
document.getElementById('btn1').addEventListener('click', function(){
    document.body.requestFullscreen().then(() => {
        document.body.style.backgroundColor = '#E9E9E9';
        document.body.style.backgroundImage = `linear-gradient(0deg, transparent calc(100% - 1px), #f0f0f0 calc(100% - 1px)),
            linear-gradient(90deg, transparent calc(100% - 1px), #f0f0f0 calc(100% - 1px))`;
        document.body.style.backgroundSize = "16px 16px";
    });
    document.getElementById('btn1').style.display = 'none';
    document.getElementById('btn2').style.display = 'block';
});

// フルスクリーン解除
document.getElementById('btn2').addEventListener('click', function(){
    document.exitFullscreen().then(() => {
        document.body.style.backgroundColor = '#E9E9E9';  // デフォルトの背景色に戻す
        document.body.style.backgroundImage = `linear-gradient(0deg, transparent calc(100% - 1px), #f0f0f0 calc(100% - 1px)),
            linear-gradient(90deg, transparent calc(100% - 1px), #f0f0f0 calc(100% - 1px))`;
        document.body.style.backgroundSize = "16px 16px";
    });
    document.getElementById('btn1').style.display = 'block';
    document.getElementById('btn2').style.display = 'none';
});


