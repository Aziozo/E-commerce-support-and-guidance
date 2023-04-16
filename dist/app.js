gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let panels = gsap.utils.toArray('.panel'),
  observer = ScrollTrigger.normalizeScroll(true),
  scrollTween;

// on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
document.addEventListener(
  'touchstart',
  (e) => {
    if (scrollTween) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },
  { capture: true, passive: false }
);

function goToSection(i) {
  scrollTween = gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false },
    onStart: () => {
      observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
      observer.enable();
    },
    duration: 1,
    onComplete: () => (scrollTween = null),
    overwrite: true,
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'top bottom',
    end: '+=199%',
    onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
  });
});

// just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
ScrollTrigger.create({
  start: 0,
  end: 'max',
  snap: 1 / (panels.length - 1),
});

$(document).ready(function () {
  setInterval(function () {
    $('.mouse').addClass('animate-mouse');
    setTimeout(function () {
      $('.mouse').removeClass('animate-mouse');
    }, 200);
  }, 3000);
  $('.country .item').on('click', function (evt) {
    var target =  $(this).text();
    $('.country .selected').removeClass('selected');
    $(this).addClass('selected');
    $('.contact-box .card .selected').removeClass('selected')
    $('.contact-box .card').find("."+target).addClass('selected')
  }); 
  $('a[data-modal]').click(function (event) {
    $(this).modal({
      fadeDuration: 250,
      fadeDelay: 1.5,
    });
    return false;
  });
  var link = 'https://www.facebook.com/profile.php?id=100008823150711';
  $('.fblink').click(function (event) {
      event.preventDefault(); // отменяем действие по умолчанию
      window.open(link); // открываем ссылку в новом окне
    });
});