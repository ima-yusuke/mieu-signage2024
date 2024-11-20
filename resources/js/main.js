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
const CategoryTitle = document.getElementById("category");
const CloseContentsBtn = document.getElementById("close_contents_btn");

// 遷移アニメーション
const AnimationContainer = document.getElementById("animation_container");
const ImgElement = AnimationContainer.querySelector("img");  // imgタグを取得
const TextElement = AnimationContainer.querySelector("p");  // pタグを取得

const slide = document.getElementById('slide');

let testArray = [
    {"id":1, "name":"test1",
        "url":
            [
                "https://www.youtube.com/embed/6ibo2m7xtEo?si=e_o-CtlIauhatdn1",
                "https://www.youtube.com/embed/zzJs4I821iI?si=s164KMq-TxbZoE4K",
                "https://www.youtube.com/embed/6lJ6zhQaZG8?si=IN6Ljx0T8oSfpX7t",
                "https://www.youtube.com/embed/JstmCvvTyRE?si=XyiCgNfKhHkBl0f2",
                "https://www.youtube.com/embed/ANfpuKUk4og?si=uvNC3AxCfBcK2KUp",
                "https://www.youtube.com/embed/VHhe0gzEm9c?si=mQWTxX9yGEuikx9k",
                "https://www.youtube.com/embed/SO6ENzhidWE?si=JSZ-49qjsFdZ4BL3",
                "https://www.youtube.com/embed/nCdxaDWmTJU?si=TlOXmh26m14IWRiC"
            ]
    },
    {"id":2, "name":"test2",
        "url":
            [
                "https://www.youtube.com/embed/N4GIoQxpJXY?si=-L0i48Ka6ZrPS7Un",
                "https://www.youtube.com/embed/uXk4f8NFP-Q?si=7J_cppNFqmABxHzh",
                "https://www.youtube.com/embed/-Zk7Y-8mf6Q?si=9HQbKshaECAFA_tj" ,
                "https://www.youtube.com/embed/e_YVZkOc8zM?si=ghLWFbErbhUt__er",
                "https://www.youtube.com/embed/HGl75kurxok?si=0BDEOpRzA-9qvlNw",
                "https://www.youtube.com/embed/Fp5ghKduTK8?si=11kDiMZhWEm9a1yU",
                "https://www.youtube.com/embed/SpQ8-xiDYWI?si=Vz1SqSm42zBiPhE7",
                "https://www.youtube.com/embed/3o11r3qZlNU?si=u_tL9Jno_Xg-PHkh"
            ]
    }
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

        // クリックされたスライドのサイズと位置を取得
        const slideImage = e.currentTarget.querySelector("img");
        const slideRect = slideImage.getBoundingClientRect();

        const animImage = AnimationContainer.querySelector("img");
        const animText = AnimationContainer.querySelector("p");

        // スライド非表示
        HideSlide();


        const selectedData = testArray.find(data => data.id == e.currentTarget.id);
        // ContentsWrapperにコンテンツを追加
        for (let j=0;j<selectedData["url"].length;j++){
            let newSlide = document.createElement("div");
            newSlide.classList.add("swiper-slide");
            newSlide.innerHTML =
                `<iframe width="100%" height="100%" src="${selectedData["url"][j]}"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>`
            ContentsWrapper.appendChild(newSlide);
        }

        const img = e.currentTarget.closest(".category-slide").querySelector("img");
        const text = e.currentTarget.closest(".category-slide").querySelector("p");

        //画像サイズ変更アニメーション
        ImgSizeChangeAnimation(slideRect,animImage,animText,img,text);

        setTimeout(function(){

            ShowContents(animText);

            // Swiperが動作している場合、ここで更新
            if (typeof categorySwiper !== "undefined") {
                contentSwiper.update();
            }
        },1500);
    });
}

// コンテンツを閉じるボタンをクリック時の処理
CloseContentsBtn.addEventListener("click", function () {

    slide.style.left = '0'; // 左端に移動
    slide.style.opacity = '1'; // 透明にする

    setTimeout(function() {
        DeleteContents();
        HideContents();
        CategoryContainer.style.display = "flex";
        contentSwiper.slideTo(0, 0, false); // スライドを初期位置に戻す（アニメーションなし）
        slide.style.left = '100%'; // 右端に移動
    },1000);

    // さらに1秒後にスライドを非表示に戻す
    setTimeout(function() {
        slide.style.opacity = '0'; // 透明にする
        slide.style.left = '-100%'; // 左端の外に移動
    }, 2000); // 2秒後にクラスを削除して元の状態に戻す
});

// カテゴリースライド非表示
function HideSlide(){
    CategoryContainer.style.display = "none";
}

// カテゴリー画像サイズ変更アニメーション
function ImgSizeChangeAnimation(slideRect,animImage,animText,img,text){
    // animation_container内の画像とテキストにスライドのサイズを適用
    animImage.style.width = `${slideRect.width}px`;
    animImage.style.height = `${slideRect.height}px`;

    AnimationContainer.classList.add("flex");
    AnimationContainer.classList.remove("hidden");
    ImgElement.src = img.src;
    TextElement.innerText = text.innerText;

    setTimeout(function(){
        animImage.classList.add("zoom-fade-out");
        animText.classList.add("move-up-fade-out");

        let sizeBigBtn = document.getElementById('btn1')
        let sizeSmallBtn = document.getElementById('btn2')

        if(sizeBigBtn.style.display === 'none'){
            sizeSmallBtn.classList.add('btn-fade-out')
        }else{
            sizeBigBtn.classList.add('btn-fade-out')
        }

        // アニメーション完了後に非表示にする
        animImage.addEventListener("animationend", function() {
            AnimationContainer.classList.add("hidden");
            animImage.classList.remove("zoom-fade-out"); // クラスをリセット

            if(sizeBigBtn.style.display === 'none'){
                sizeSmallBtn.classList.remove('btn-fade-out')
            }else{
                sizeBigBtn.classList.remove('btn-fade-out')
            }
        });
    },10);//拡大する画像を切り替えてからアニメーションスタートさせるため

}

// コンテンツを削除
function DeleteContents(){
    while (ContentsWrapper.firstChild) {
        ContentsWrapper.removeChild(ContentsWrapper.firstChild);
    }
}

// コンテンツ非表示
function HideContents(){
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

