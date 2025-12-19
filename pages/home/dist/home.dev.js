"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//data file link
var landingPageSildingFileLink = "/json/landing_sliding.json"; //data store variable

var landingPageSlidingData = null;

function animateCharacters(container) {
  var elements = container.querySelectorAll(".char-animate");
  elements.forEach(function (el) {
    var text = el.dataset.text || el.textContent;
    el.dataset.text = text; // store original text

    el.innerHTML = ""; // clear previous chars

    _toConsumableArray(text).forEach(function (_char, i) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = _char === " " ? "\xA0" : _char; // 🔥 RevSlider-style stagger

      span.style.animationDelay = "".concat(i * 0.06, "s");
      el.appendChild(span);
    });
  });
}

var fetchSlidingImageForLandingPage = function fetchSlidingImageForLandingPage() {
  var response, data;
  return regeneratorRuntime.async(function fetchSlidingImageForLandingPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(landingPageSildingFileLink));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          if (data) landingPageSlidingData = data;
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("error during fetching the sliding page data", _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var loadSlidingHtmlData = function loadSlidingHtmlData(data) {
  //selector
  var landingSlidingSelector = document.querySelector(".hero-slider");
  landingSlidingSelector.innerHTML = "\n  <!-- Splash overlay -->\n  <div class=\"slider-splash\"></div>\n  ";
  data.forEach(function (e) {
    landingSlidingSelector.innerHTML += "\n      <div class=\"slide\">\n        <picture>\n          <img src=\"".concat(e.img, "\">\n        </picture>\n\n        <div class=\"slide-content\">\n          ").concat(e.heading ? "<h1 class=\"char-animate\">".concat(e.heading, "</h1>") : "", "\n          ").concat(e.subheading ? "<p class=\"char-animate delay-1\">".concat(e.subheading, "</p>") : "", "\n        </div>\n      </div>\n    ");
  });
};

function initHeroSlider() {
  var current, slides, activateSlide;
  return regeneratorRuntime.async(function initHeroSlider$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          activateSlide = function _ref(index) {
            slides.forEach(function (slide) {
              return slide.classList.remove("active");
            });
            var activeSlide = slides[index];
            activeSlide.classList.add("active"); // 🔥 Restart character animation every time

            animateCharacters(activeSlide);
          };

          if (landingPageSlidingData) {
            _context2.next = 4;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(fetchSlidingImageForLandingPage());

        case 4:
          loadSlidingHtmlData(landingPageSlidingData);
          current = 0;
          slides = document.querySelectorAll(".hero-slider .slide");

          if (slides.length) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return");

        case 9:
          activateSlide(current);
          setInterval(function () {
            current = (current + 1) % slides.length;
            activateSlide(current);
          }, 4500);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}