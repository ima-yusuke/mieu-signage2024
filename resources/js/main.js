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
const ContentsWrapper = document.getElementById("swiper_wrapper");
const Category = document.getElementById("category");
const CloseContentsBtn = document.getElementById("close_contents_btn");

// 遷移アニメーション
const AnimationContainer = document.getElementById("animation_container");


let testArray = [
    {"id":1, "name":"test1","url":"https://www.youtube.com/embed/6ibo2m7xtEo?si=e_o-CtlIauhatdn1"},
    {"id":2, "name":"test2","url":"https://www.youtube.com/embed/zzJs4I821iI?si=s164KMq-TxbZoE4K"},
    {"id":3, "name":"test3","url":"https://www.youtube.com/embed/6lJ6zhQaZG8?si=IN6Ljx0T8oSfpX7t"},
    {"id":4, "name":"test4","url":"https://www.youtube.com/embed/zVCPzEru3BQ?si=XhTsEm0Kd518oP56"},
    {"id":5, "name":"test5","url":"https://www.youtube.com/embed/JstmCvvTyRE?si=XyiCgNfKhHkBl0f2"},
    {"id":6, "name":"test6","url":"https://www.youtube.com/embed/ANfpuKUk4og?si=uvNC3AxCfBcK2KUp"},
    {"id":7, "name":"test7","url":"https://www.youtube.com/embed/VHhe0gzEm9c?si=mQWTxX9yGEuikx9k"},
    {"id":8, "name":"test8","url":"https://www.youtube.com/embed/SO6ENzhidWE?si=JSZ-49qjsFdZ4BL3"},
    {"id":9, "name":"test9","url":"https://www.youtube.com/embed/nCdxaDWmTJU?si=TlOXmh26m14IWRiC"},
]

// Initialize Swiper with configuration
const categorySwiper = new Swiper('.categorySwiper', {
    effect: 'coverflow', // スライダーに「カバーフロー」効果を適用します。中央のスライドが拡大され、3D的に表現されます。
    grabCursor: true,    // スライダー上でマウスカーソルが「掴む」形状になるように設定し、直感的なインターフェイスを提供します。
    centeredSlides: true, // スライダーを中央配置します。中央のスライドが常にビューポートの中央に表示されます。
    slidesPerView: 3,    // 画面上に同時に表示するスライドの数を指定します。この場合は「3枚」が表示されます。
    loop: true,          // スライドをループさせます。最後のスライドまで到達したら最初のスライドに戻ります。
    coverflowEffect: {   // カバーフロー効果の詳細設定を行うオプションです。
        rotate: 50,      // スライドの回転角度を設定します。値が大きいほどスライドが回転して立体感が増します。
        stretch: 0,      // スライド同士の間隔を制御します。正の値でスライド間が広がり、負の値で縮まります。
        depth: 100,      // 立体的な効果を強調するための奥行き（Z軸）を設定します。値が大きいほど深い効果が出ます。
        modifier: 1,     // 効果の強さを調整します。数値を大きくするほど効果が強調されます。
        slideShadows: true, // 各スライドに影を追加し、立体感を演出します。
    },

    pagination: {        // ページネーション（スライダーのインジケーター）の設定を行います。
        el: '.category-pagination', // ページネーションを表示するためのHTML要素を指定します。
        clickable: true, // ページネーションをクリックすることでスライドを切り替えられるようにします。
    },
});

const contentSwiper = new Swiper(".contentSwiper", {
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

for (let i = 0; i < CategorySlide.length; i++) {
    CategorySlide[i].addEventListener("click", function (e) {
        if(e.currentTarget.id === "1"){

            // クリックされたスライドのサイズと位置を取得
            const slideImage = e.currentTarget.querySelector("img");
            const slideRect = slideImage.getBoundingClientRect();

            // スライド非表示
            HideSlide();

            // ContentsWrapperにコンテンツを追加
            for (let j=0;j<testArray.length;j++){
                let newSlide = document.createElement("div");
                newSlide.classList.add("swiper-slide");
                newSlide.innerHTML =
                    `<iframe width="100%" height="100%" src="${testArray[j].url}"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`
                ContentsWrapper.appendChild(newSlide);
            }

            // animation_containerの画像とテキストにスタイルを適用
            const animImage = AnimationContainer.querySelector("img");
            const animText = AnimationContainer.querySelector("p");

            // animation_container内の画像とテキストにスライドのサイズを適用
            animImage.style.width = `${slideRect.width}px`;
            animImage.style.height = `${slideRect.height}px`;

            AnimationContainer.classList.add("flex");
            AnimationContainer.classList.remove("hidden");

            animImage.classList.add("zoom-fade-out");
            animText.classList.add("move-up-fade-out");

            // アニメーション完了後に非表示にする
            animImage.addEventListener("animationend", function() {
                AnimationContainer.classList.add("hidden");
                animImage.classList.remove("zoom-fade-out"); // クラスをリセット
            });

            setTimeout(function(){
                ContentsContainer.classList.remove("hidden");
                ContentsContainer.classList.add("flex");
                CloseContentsBtn.style.display = "block";
                Category.style.display = "block";
                Category.innerText = animText.innerText;

                // Swiperが動作している場合、ここで更新
                if (typeof categorySwiper !== "undefined") {
                    contentSwiper.update();
                }
            },1500);
        }
    });
}

// カテゴリースライド非表示
function HideSlide(){
    CategoryContainer.style.display = "none";
}

// コンテンツを閉じるボタンをクリック時の処理
CloseContentsBtn.addEventListener("click", function () {
    ContentsContainer.classList.add("hidden");
    DeleteContents();
    CategoryContainer.style.display = "flex";
    CloseContentsBtn.style.display = "none";
    Category.style.display = "none";
});

// コンテンツを削除
function DeleteContents(){
    while (ContentsWrapper.firstChild) {
        ContentsWrapper.removeChild(ContentsWrapper.firstChild);
    }
}
