import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'swiper/css/pagination';

// カテゴリー（トップ画面メニュー）
const CategoryContainer  = document.getElementById("category_container");
const CategorySlide = document.getElementsByClassName("category-slide");

// コンテンツ
const ContentsContainer = document.getElementById("contents_container");
const CategoryTitle = document.getElementById("category");
const CloseContentsBtn = document.getElementById("close_contents_btn");

// コンテンツ_ドローン
const VideoContainer = document.getElementById("video_container");
const VideoElement = document.getElementById("myVideo");
const BtnChapter1 = document.getElementById("chapter1");
const BtnChapter2 = document.getElementById("chapter2");
const BtnChapter3 = document.getElementById("chapter3");

// コンテンツ＿各学部
let videos =document.getElementsByClassName("video");
let thumbnail = document.getElementsByClassName('thumbnail');
let imgIdx = 0;
let thumbnailFlag = false;
let currentContainer = null;

// 遷移アニメーション
const AnimationContainer = document.getElementById("animation_container");
const AnimationSlide = document.getElementById('slide');
const ImgElement = AnimationContainer.querySelector("img");
const TextElement = AnimationContainer.querySelector("p");

let videoFlag = false;

// Initialize Swiper with configuration
const categorySwiper = new Swiper('.categorySwiper', {
    effect: 'coverflow', // スライダーに「カバーフロー」効果を適用します。中央のスライドが拡大され、3D的に表現されます。
    grabCursor: true,    // スライダー上でマウスカーソルが「掴む」形状になるように設定し、直感的なインターフェイスを提供します。
    centeredSlides: false, // スライダーを中央配置します。中央のスライドが常にビューポートの中央に表示されます。
    slidesPerView: 3,    // 画面上に同時に表示するスライドの数を指定します。この場合は「3枚」が表示されます。
    loop: true,          // スライドをループさせます。最後のスライドまで到達したら最初のスライドに戻ります。
    coverflowEffect: {   // カバーフロー効果の詳細設定を行うオプションです。
        rotate: 50,      // スライドの回転角度を設定します。値が大きいほどスライドが回転して立体感が増します。
        stretch: -30,      // スライド同士の間隔を制御します。正の値でスライド間が広がり、負の値で縮まります。
        depth: 100,      // 立体的な効果を強調するための奥行き（Z軸）を設定します。値が大きいほど深い効果が出ます。
        modifier: 1,     // 効果の強さを調整します。数値を大きくするほど効果が強調されます。
        slideShadows: true, // 各スライドに影を追加し、立体感を演出します。
    },
});

// 各学部Swiperの初期化を関数化
function initializeContentSwiper(className) {
    return new Swiper(className, {
        slidesPerView: 3, // 1行に表示するスライド数
        centeredSlides: false,
        grid: {
            rows: 2, // 縦に並べる数
        },
        spaceBetween: 30, // 各スライド間のスペース
    });
}

let contentSwiper = initializeContentSwiper(".swiper-2");//デフォルト
let currentSlideIndex = contentSwiper.activeIndex;

// カテゴリースライドをクリックしたときの処理
for (let i = 0; i < CategorySlide.length; i++) {
    CategorySlide[i].addEventListener("click", async function (e) {
        // クリックされたスライドのサイズと位置を取得
        const slideImage = e.currentTarget.querySelector("img");
        const slideRect = slideImage.getBoundingClientRect();

        const animImage = AnimationContainer.querySelector("img");
        const animText = AnimationContainer.querySelector("p");

        //カテゴリースライド非表示
        HideCategoryContainer();

        if(e.currentTarget.id!=1) {
            //学部動画表示
            videoFlag =false;
            if (!contentSwiper.destroyed) {
                contentSwiper.destroy(true, true); // 破棄時にHTMLやCSSをリセット
            }
            if (contentSwiper.destroyed) {
                contentSwiper = initializeContentSwiper(`.swiper-${e.currentTarget.id}`); // Swiper再生成
            }
            currentContainer = document.getElementById(`container_${e.currentTarget.id}`);
            ShowContentVideos(currentContainer);
        }else{
            //ドローン動画表示
            contentSwiper.destroy(true, true);
            videoFlag = true;
            ShowDroneContainer();
            // チャプターボタンにイベントを設定
            SetupChapterButton(BtnChapter1, 0);
            SetupChapterButton(BtnChapter2, 123);
            SetupChapterButton(BtnChapter3, 252);
        }

        const img = e.currentTarget.closest(".category-slide").querySelector("img");
        const text = e.currentTarget.closest(".category-slide").querySelector("p");

        //画像サイズ変更アニメーション
        ImgSizeChangeAnimation(slideRect,animImage,animText,img,text);

        await Sleep(1500); // 1.5秒待機
        ShowContentContainer(animText); // コンテンツを表示
    });
}

// コンテンツを閉じるボタンをクリック時の処理
CloseContentsBtn.addEventListener("click", async function () {
    AnimationSlide.style.left = '0'; // 左端に移動
    AnimationSlide.style.opacity = '1'; // 表示

    await Sleep(1000); // 1秒待機

    HideContentContainer();
    ShowCategoryContainer();
    AnimationSlide.style.left = '100%'; // 右端に移動

    if (videoFlag) {
        HideDroneContainer();
        VideoElement.pause();
    } else {
        HideContentVideos(currentContainer);
        for (let i = 0; i < videos.length; i++) {
            videos[i].pause();
        }
    }

    await Sleep(1000); // さらに1秒待機

    AnimationSlide.style.opacity = '0'; // 透明にする
    AnimationSlide.style.left = '-100%'; // 左端の外に移動
});

// カテゴリースライド表示
function ShowCategoryContainer(){
    CategoryContainer.style.display = "flex";
}

// カテゴリースライド非表示
function HideCategoryContainer(){
    CategoryContainer.style.display = "none";
}

// カテゴリー画像サイズ変更アニメーション
async function ImgSizeChangeAnimation(slideRect, animImage, animText, img, text) {
    // animation_container内の画像とテキストにスライドのサイズを適用
    animImage.style.width = `${slideRect.width}px`;
    animImage.style.height = `${slideRect.height}px`;

    AnimationContainer.classList.add("flex");
    AnimationContainer.classList.remove("hidden");

    //画像の読み込みが完了するまで待機
    await new Promise((resolve) => {
        ImgElement.src = img.src;
        TextElement.innerText = text.innerText; // テキストの設定
        ImgElement.onload = resolve; // 画像の読み込み完了後にresolveを呼び出す
    });

    //この後のコードは、上記のPromiseがresolveされるまで実行されません。

    //アニメーションを開始する
    animImage.classList.add("zoom-fade-out");
    animText.classList.add("move-up-fade-out");

    let sizeBigBtn = document.getElementById('btn1');

    if (sizeBigBtn.style.display !== 'none') {
        sizeBigBtn.classList.add('btn-fade-out');
    }

    // アニメーション完了後に非表示にする
    animImage.addEventListener("animationend", function () {
        AnimationContainer.classList.add("hidden");
        animImage.classList.remove("zoom-fade-out"); // クラスをリセット

        if (sizeBigBtn.style.display !== 'none') {
            sizeBigBtn.classList.remove('btn-fade-out');
        }
    });
}

// 一定時間待機する関数（ カテゴリー画像サイズ変更アニメーション用）setTimeoutで指定時間後にresolve()を呼び出す。
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// コンテンツ非表示
function HideContentContainer(){
    ContentsContainer.classList.add("hidden");
    CloseContentsBtn.style.display = "none";
    CategoryTitle.style.display = "none";
}

// コンテンツ表示
function ShowContentContainer(text){
    ContentsContainer.classList.remove("hidden");
    ContentsContainer.classList.add("flex");
    CloseContentsBtn.style.display = "block";
    CategoryTitle.style.display = "block";
    CategoryTitle.innerText = text.innerText;
}

// 各学部動画表示
function ShowContentVideos(container){
    container.classList.remove("hideContainer");
    container.classList.add("flex");
    container.classList.add("contentSwiper");
}

// 各学部動画非表示
function HideContentVideos(container){
    container.classList.add("hideContainer");
    container.classList.remove("flex");
    container.classList.remove("contentSwiper");
}

// 各学部動画のサムネイルをクリックしたときの処理
for (let i = 0; i < thumbnail.length; i++) {
    thumbnail[i].addEventListener('click', function () {
        currentSlideIndex = contentSwiper.activeIndex;
        thumbnail[i].style.display = 'none';
        imgIdx = i;
        thumbnailFlag = true;
        const video = thumbnail[i].nextElementSibling;
        video.style.display = 'block'; //動画を表示
        startFullscreenAndObserve(video);
    });
}

async function startFullscreenAndObserve(videoElement) {
    try {
        // フルスクリーンを開始
        await videoElement.requestFullscreen();

        // フルスクリーンの切り替え完了を待つ
        await waitForFullscreen(videoElement);

        // 再生開始
        await videoElement.play();

        // サイズ変更を監視する ResizeObserver をセットアップ
        const resizeObserver = new ResizeObserver(() => {
             if (!document.fullscreenElement) {
                 videoElement.pause(); // 動画を停止
                 thumbnail[imgIdx].style.display = 'block';
                 thumbnailFlag = false;
                 contentSwiper.slideTo(currentSlideIndex, 0); // 変更なしの位置に戻す
                 resizeObserver.disconnect(); // ResizeObserver を停止
             }
        });
        resizeObserver.observe(videoElement);

        // フルスクリーン終了時の処理
        document.addEventListener("fullscreenchange", () => {
            videoElement.pause(); // 動画を停止
            thumbnail[imgIdx].style.display = 'block';
            thumbnailFlag = false;
            contentSwiper.slideTo(currentSlideIndex, 0); // 変更なしの位置に戻す
            resizeObserver.disconnect(); // ResizeObserver を停止
        });
    } catch (error) {
        console.error("フルスクリーンモードの開始に失敗しました:", error);
    }
}

function waitForFullscreen(videoElement) {
    return new Promise((resolve) => {
        const onFullscreenChange = () => {
            if (document.fullscreenElement === videoElement) {
                document.removeEventListener("fullscreenchange", onFullscreenChange);
                resolve(); // フルスクリーン化完了を通知
            }
        };
        document.addEventListener("fullscreenchange", onFullscreenChange);
    });
}

// ドローン動画表示
function ShowDroneContainer(){
    VideoContainer.classList.remove("hidden");
    VideoContainer.classList.add("flex");
}

// ドローン動画非表示
function HideDroneContainer(){
    VideoContainer.classList.add("hidden");
    VideoContainer.classList.remove("flex");
}

// ドローン動画の再生が開始したらフルスクリーンにする
VideoElement.addEventListener("play", async function () {
    // フルスクリーンモードにする
    if (VideoElement.requestFullscreen) {
        await VideoElement.requestFullscreen();
    }
});

//ドローン動画 チャプター時間設定
function SetupChapterButton(button, time) {
    button.addEventListener("click", async function () {
        // 再生位置を設定
        VideoElement.currentTime = time;

        // フルスクリーンにする
        if (VideoElement.requestFullscreen) {
            await VideoElement.requestFullscreen();
        }

        // 動画を再生
        VideoElement.play();
    });
}

// ドローン動画の再生が終了したらフルスクリーンを終了
VideoElement.addEventListener("ended", function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
});


