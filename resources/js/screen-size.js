// フルスクリーン表示
document.getElementById('btn1').addEventListener('click', function(){
    document.body.requestFullscreen().then(() => {
        document.body.style.backgroundColor = '#f4efef';
    });
    document.getElementById('btn1').style.display = 'none';
    document.getElementById('btn2').style.display = 'block';
});

// フルスクリーン解除
document.getElementById('btn2').addEventListener('click', function(){
    document.exitFullscreen();
    document.getElementById('btn1').style.display = 'block';
    document.getElementById('btn2').style.display = 'none';
});
