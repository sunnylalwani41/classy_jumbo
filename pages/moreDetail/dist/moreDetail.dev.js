"use strict";

var moreDetailPageImagesArrange = function moreDetailPageImagesArrange(images) {
  return images.map(function (img) {
    return "<div class=\"more-slide\"><img src=\"".concat(img, "\"></div>");
  }).join("");
};

var moreDetailPageVideosArrange = function moreDetailPageVideosArrange(videos) {
  return videos.map(function (vid) {
    return "<div class=\"more-slide\"><video controls><source src=\"".concat(vid.video, "\" type=\"").concat(vid.type, "\"></video></div>");
  }).join("");
};

var moreDetailPageThumbImagesArrange = function moreDetailPageThumbImagesArrange(images) {
  return images.map(function (img) {
    return "<div class=\"more-thumb\"><img src=\"".concat(img, "\"></div>");
  }).join("");
};

var moreDetailPageThumbVideosArrange = function moreDetailPageThumbVideosArrange(videos) {
  return videos.map(function (vid) {
    return "<div class=\"more-thumb\"><video muted><source src=\"".concat(vid.video, "\"></video></div>");
  }).join("");
};

var moreDetailDataArrange = function moreDetailDataArrange(data) {
  var moreHero = document.querySelector(".more-hero");
  var moreContainer = document.querySelector(".more-container");
  moreHero.innerHTML = "";
  moreContainer.innerHTML = "";
  data.forEach(function (e) {
    var moreImages = moreDetailPageImagesArrange(e.images);
    var moreVideos = moreDetailPageVideosArrange(e.videos);
    var thumbImages = moreDetailPageThumbImagesArrange(e.images);
    var thumbVideos = moreDetailPageThumbVideosArrange(e.videos);
    moreHero.innerHTML = "\n            <h1>".concat(e.title, "</h1>\n\n            ").concat(e.sub_title ? "<p>".concat(e.sub_title, "</p>") : "", "\n        ");
    moreContainer.innerHTML = "\n            <!-- ===== SLIDER ===== -->\n            <div class=\"more-slider-wrapper\">\n                <div class=\"more-slider\">\n                    <button class=\"more-nav-btn more-prev\">\u276E</button>\n                    <button class=\"more-nav-btn more-next\">\u276F</button>\n\n                    <div class=\"more-slides\" id=\"more-slides\">\n                        <!-- Images -->\n                        ".concat(moreImages ? moreImages : "", "\n\n                        <!-- Videos -->\n                        \n                        ").concat(moreVideos ? moreVideos : "", "\n                    </div>\n                </div>\n\n                <!-- Thumbnails -->\n                <div class=\"more-thumbs\" id=\"more-thumbs\">\n                    ").concat(thumbImages ? thumbImages : "", "\n                    ").concat(thumbVideos ? thumbVideos : "", "\n                </div>\n            </div>\n\n            <!-- ===== TEXT CONTENT ===== -->\n            <div class=\"more-content\">\n                <h2>").concat(e.title, "</h2>\n                <p>\n                    ").concat(e.detail_description, "\n                </p>\n            </div>\n        ");
  });
};

var loadMoreDetailPage = function loadMoreDetailPage() {
  var dataPageLink, list, data, filteredData;
  return regeneratorRuntime.async(function loadMoreDetailPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dataPageLink = fetchJsonDataLink();
          list = null;

          if (pageObj[dataPageLink]) {
            _context.next = 5;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(fetchProductData(dataPageLink));

        case 5:
          data = pageObj[dataPageLink];
          list = data.list;
          filteredData = filtersTheData(list);
          moreDetailDataArrange(filteredData);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var moreDetailInit = function moreDetailInit() {
  var index, slides, thumbs, total, updateSlider, nextSlide, prevSlide;
  return regeneratorRuntime.async(function moreDetailInit$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          prevSlide = function _ref3() {
            index = (index - 1 + total) % total;
            updateSlider();
          };

          nextSlide = function _ref2() {
            index = (index + 1) % total;
            updateSlider();
          };

          updateSlider = function _ref() {
            slides.style.transform = "translateX(-".concat(index * 100, "%)");
            thumbs.forEach(function (t, i) {
              return t.classList.toggle("active", i === index);
            }); // Pause all videos except active

            document.querySelectorAll("video").forEach(function (v) {
              return v.pause();
            });
          };

          _context2.next = 5;
          return regeneratorRuntime.awrap(loadMoreDetailPage());

        case 5:
          index = 0;
          slides = document.getElementById("more-slides");
          thumbs = document.querySelectorAll(".more-thumb");
          total = slides.children.length;
          thumbs.forEach(function (thumb, i) {
            thumb.addEventListener("click", function () {
              index = i;
              updateSlider();
            });
          });
          document.querySelector(".more-next").addEventListener("click", function () {
            nextSlide();
          });
          document.querySelector(".more-prev").addEventListener("click", function () {
            prevSlide();
          });
          updateSlider();

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};