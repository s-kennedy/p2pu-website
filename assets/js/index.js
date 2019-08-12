
(function($) {

  // Initialize slick on testimonial slides

  $('.p2pu-slide-container').each(function() {

    var slider = $(this);

    slider.slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      swipe: true,
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            pauseOnHover: false
          }
        },
      ]
    })
  })

})(jQuery)


// Initialize SmoothScroll
new SmoothScroll('a[href*="#"]');


// Initialize AOS
AOS.init();


// start video when modal opens, pause video when modal closes

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var ytPlayer;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('youtube-player', {
    height: '100%',
    width: '100%',
    videoId: 'bQqmIS7WQa8',
    events: {}
  });
}

$('#video-modal').on('shown.bs.modal', function() {
  ytPlayer.playVideo();
})

$('#video-modal').on('hidden.bs.modal', function() {
  ytPlayer.pauseVideo();
})
