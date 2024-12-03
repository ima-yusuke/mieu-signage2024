<div class="swiper-slide relative overflow-hidden">
    <!-- サムネイル -->
    <img
        src="{{ asset('storage/img/takagi.jpeg') }}"
        alt="Video Thumbnail"
        class="absolute w-full cursor-pointer z-10 thumbnail"
    >
    <video
        class="w-full h-full video"
        controls
        style="display: none;">
        <source src="{{ asset("storage/video/$src") }}" type="video/mp4">
    </video>
</div>

