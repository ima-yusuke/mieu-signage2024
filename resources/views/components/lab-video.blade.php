<div class="swiper-slide relative overflow-hidden">
    <!-- サムネイル -->
    <img
        src="{{ asset("storage/img/$img") }}"
        alt="Video Thumbnail"
        class="m-auto w-auto h-full cursor-pointer z-10 thumbnail "
    >
    <video
        class="w-0 h-0 video"
        controls
        style="display: none;">
        <source src="{{ asset("storage/video/$src") }}" type="video/mp4">
    </video>
</div>

