$(document).ready(function () {
  $(".menu-toggler").on("click", function () {
    $(this).toggleClass("open");
    $(".top-nav").toggleClass("open");
  });

  $(".top-nav .nav-link").on("click", function () {
    $(".menu-toggler").removeClass("open");
    $(".top-nav").removeClass("open");
  });

  $('nav a[href*="#"]').on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 100,
      },
      2000
    );
  });

  $("#up").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      2000
    );
  });

  AOS.init({
    easing: "ease",
    duration: 1800,
    once: true,
  });
  var primary = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  var landingTitle = $("#landingTitle");
  var contactHeading = $("#contact-section-heading");
  var skillHeading = $("#skill-section-heading");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    console.log("scroll", scroll);
    if (scroll > 190) {
      landingTitle.css("color", "white");
      contactHeading.css("color", "white");
    } else {
      landingTitle.css("color", primary);
    }
  });

  var checkReplace = $(".replace-me");
  if (checkReplace !== null) {
    var replace = checkReplace.ReplaceMe({
      speed: 4000, // Delay between each phrase in miliseconds
    });
  }

  // Initialise each carousel on its own so cards are counted per project
  function initCarousel(carouselSelector, cardSelector) {
    $(carouselSelector).each(function () {
      var $carousel = $(this);
      var $cards = $carousel.children(cardSelector);
      var $middle = $cards.eq(Math.ceil($cards.length / 2) - 1);

      $middle.addClass("active");
      $middle.prev().addClass("prev");
      $middle.next().addClass("next");

      $cards.click(function () {
        var slide = $carousel.children(".active").width();

        if ($(this).hasClass("next")) {
          $carousel.stop(false, true).animate({ left: "-=" + slide });
        } else if ($(this).hasClass("prev")) {
          $carousel.stop(false, true).animate({ left: "+=" + slide });
        }

        $(this).removeClass("prev next");
        $(this).siblings().removeClass("prev active next");

        $(this).addClass("active");
        $(this).prev().addClass("prev");
        $(this).next().addClass("next");
      });
    });
  }

  initCarousel(".card-carousel", ".my-card");
  initCarousel(".card-flight-carousel", ".my-flight-card");
  initCarousel(".card-bus-carousel", ".my-bus-card");
  initCarousel(".card-shukran-carousel", ".my-shukran-card");
  initCarousel(".card-gavanpass-carousel", ".my-gavanpass-card");

  // Keyboard nav
  $("html body").keydown(function (e) {
    if (e.keyCode == 37) {
      // left
      $(".active").prev().trigger("click");
    } else if (e.keyCode == 39) {
      // right
      $(".active").next().trigger("click");
    }
  });
});
