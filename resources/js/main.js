//Import Swiper and required CSS
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
//cssをimport

// カテゴリー
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
// コンテンツ＿工学部
const LabContainer = document.getElementById("lab_container");
let videos =document.getElementsByClassName("video");


let videoFlag = false;

// 遷移アニメーション
const AnimationContainer = document.getElementById("animation_container");
const ImgElement = AnimationContainer.querySelector("img");  // imgタグを取得
const TextElement = AnimationContainer.querySelector("p");  // pタグを取得

const slide = document.getElementById('slide');

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

    pagination: {        // ページネーション（スライダーのインジケーター）の設定を行います。
        el: '.category-pagination', // ページネーションを表示するためのHTML要素を指定します。
        clickable: true, // ページネーションをクリックすることでスライドを切り替えられるようにします。
    },
});

let contentSwiper = new Swiper(".contentSwiper", {
    slidesPerView: 3,// 1行に表示するスライド数を3に設定
    centeredSlides: false,
    grid: {
        rows: 2,//縦に並べる数（2行に表示）
    },
    spaceBetween: 30, // 各スライド間のスペース（例: 30px）
    // ページネーション
    pagination: {
        el: ".content-pagination", // ここが同じだと最初の設定が上書きされてしまう
        clickable: true,
    },
});

let currentSlideIndex = contentSwiper.activeIndex;


for (let i = 0; i < CategorySlide.length; i++) {
    CategorySlide[i].addEventListener("click", function (e) {
        // クリックされたスライドのサイズと位置を取得
        const slideImage = e.currentTarget.querySelector("img");
        const slideRect = slideImage.getBoundingClientRect();

        const animImage = AnimationContainer.querySelector("img");
        const animText = AnimationContainer.querySelector("p");

        //カテゴリースライド非表示
        HideCategoryContainer();

        if(e.currentTarget.id==2) {
            videoFlag =false;
            if(contentSwiper.destroyed){
                contentSwiper = new Swiper(".contentSwiper", {
                    slidesPerView: 3,// 1行に表示するスライド数を3に設定
                    centeredSlides: false,
                    grid: {
                        rows: 2,//縦に並べる数（2行に表示）
                    },
                    spaceBetween: 30, // 各スライド間のス��ース（例: 30px）
                    // ページネーション
                    pagination: {
                        el: ".content-pagination", // ここが同じだと最初の設定が上書きされてしまう
                        clickable: true,
                    },
                });
            }
          ShowLabContents();//工学部動画表示
        }else{
            contentSwiper.destroy(true, true);
            videoFlag =true;
            ShowVideoContents();//ドローン動画表示

            // チャプターボタンにイベントを設定
            SetupChapterButton(BtnChapter1, 10);
            SetupChapterButton(BtnChapter2, 15);
            SetupChapterButton(BtnChapter3, 20);
        }

        const img = e.currentTarget.closest(".category-slide").querySelector("img");
        const text = e.currentTarget.closest(".category-slide").querySelector("p");

        //画像サイズ変更アニメーション
        ImgSizeChangeAnimation(slideRect,animImage,animText,img,text);

        setTimeout(function(){
            ShowContents(animText);
        },1500);
    });
}

// コンテンツを閉じるボタンをクリック時の処理
CloseContentsBtn.addEventListener("click", function () {

    slide.style.left = '0'; // 左端に移動
    slide.style.opacity = '1'; // 透明にする

    setTimeout(function() {
        HideContentContainer();
        ShowCategoryContainer();
        slide.style.left = '100%'; // 右端に移動
        if (videoFlag) {
            HideVideoContents();
        }else{
            HideLabContents();
        }

        for (let i = 0; i < videos.length; i++) {
            videos[i].pause();
        }

        VideoElement.pause();
    },1000);

    // さらに1秒後にスライドを非表示に戻す
    setTimeout(function() {
        slide.style.opacity = '0'; // 透明にする
        slide.style.left = '-100%'; // 左端の外に移動
    }, 2000); // 2秒後にクラスを削除して元の状態に戻す
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

    // 画像の読み込みが完了するまで待機
    await new Promise((resolve) => {
        ImgElement.src = img.src;
        TextElement.innerText = text.innerText; // テキストの設定
        ImgElement.onload = resolve; // 画像の読み込み完了後にresolveを呼び出す
    });

    // この後のコードは、上記のPromiseがresolveされるまで実行されません。

    // アニメーションを開始する
    animImage.classList.add("zoom-fade-out");
    animText.classList.add("move-up-fade-out");

    let sizeBigBtn = document.getElementById('btn1');
    let sizeSmallBtn = document.getElementById('btn2');

    if (sizeBigBtn.style.display === 'none') {
        sizeSmallBtn.classList.add('btn-fade-out');
    } else {
        sizeBigBtn.classList.add('btn-fade-out');
    }

    // アニメーション完了後に非表示にする
    animImage.addEventListener("animationend", function () {
        AnimationContainer.classList.add("hidden");
        animImage.classList.remove("zoom-fade-out"); // クラスをリセット

        if (sizeBigBtn.style.display === 'none') {
            sizeSmallBtn.classList.remove('btn-fade-out');
        } else {
            sizeBigBtn.classList.remove('btn-fade-out');
        }
    });
}



// コンテンツ非表示
function HideContentContainer(){
    ContentsContainer.classList.add("hidden");
    CloseContentsBtn.style.display = "none";
    CategoryTitle.style.display = "none";
}

// コンテンツ表示
function ShowContents(text){
    ContentsContainer.classList.remove("hidden");
    ContentsContainer.classList.add("flex");
    CloseContentsBtn.style.display = "block";
    CategoryTitle.style.display = "block";
    CategoryTitle.innerText = text.innerText;
}

// 工学部動画表示
function ShowLabContents(){
    LabContainer.classList.remove("hidden");
    LabContainer.classList.add("flex");
}

// 工学部動画非表示
function HideLabContents(){
    LabContainer.classList.add("hidden");
    LabContainer.classList.remove("flex");
}

for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener("play", async function () {
        // フルスクリーンモードにする
        if (videos[i].requestFullscreen) {
            await videos[i].requestFullscreen();
        }
    });

// 動画の再生が終了したらフルスクリーンを終了
    videos[i].addEventListener("ended", function () {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
}


// ドローン動画表示
function ShowVideoContents(){
    VideoContainer.classList.remove("hidden");
    VideoContainer.classList.add("flex");
}

// ドローン動画非表示
function HideVideoContents(){
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

let thumbnail = document.getElementsByClassName('thumbnail');
for (let i = 0; i < thumbnail.length; i++) {
    thumbnail[i].addEventListener('click', function () {
        currentSlideIndex = contentSwiper.activeIndex;
        thumbnail[i].style.display = 'none';

        // 動画要素を取得して再生する
        const video = thumbnail[i].nextElementSibling;
        video.style.display = 'block'; // 動画を表示
        video.play(); // 再生開始
        video.addEventListener('fullscreenchange', () => handleFullscreenExit(video));
    });
}
function handleFullscreenExit(video) {
    if (!document.fullscreenElement) {
        contentSwiper.slideTo(currentSlideIndex, 0); // 変更なしの位置に戻す
    }
}
