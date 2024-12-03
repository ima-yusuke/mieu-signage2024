const LoadingContainer = document.getElementById('loading_container');
const CategoryContainer = document.getElementById('category_container');

async function waitForVideoLoad(video) {
    return new Promise((resolve) => {
        if (video.readyState >= 4) {
            resolve();
        } else {
            video.addEventListener('canplaythrough', () => {
                resolve();
            });
        }
    });
}

async function init() {
    const droneVideo = document.getElementById('myVideo');
    const videos = document.getElementsByClassName('video');

    // 動画のロード完了を待機
    await waitForVideoLoad(droneVideo);

    for (let i = 0; i < videos.length; i++) {
        await waitForVideoLoad(videos[i]);
    }

    // ローディング画面を非表示
    LoadingContainer.style.display = 'none';

    // 次のフレームでアニメーションを開始
    requestAnimationFrame(() => {
        CategoryContainer.classList.add('fade-in', 'show');
        CategoryContainer.classList.remove('fade-in','show');
    });
}

init();



