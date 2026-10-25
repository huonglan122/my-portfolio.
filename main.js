"use strict";

/* Đánh dấu JavaScript đã sẵn sàng (CSS dùng class này cho hiệu ứng cuộn) */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  /* 1. Menu di động ------------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* Đóng menu sau khi chọn một liên kết */
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 2. Năm hiện tại ở footer -------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* 3. Hiệu ứng xuất hiện khi cuộn -------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* 4. Biểu mẫu liên hệ (chỉ minh họa, không gửi dữ liệu đi đâu) --- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.classList.remove("is-error");

      if (!form.checkValidity()) {
        status.classList.add("is-error");
        status.textContent = "Vui lòng điền đầy đủ và đúng định dạng các trường bắt buộc.";
        form.reportValidity();
        return;
      }

      var name = document.getElementById("name").value.trim();
      status.textContent =
        "Cảm ơn " + name + "! Đây là bản demo nên tin nhắn chưa được gửi đi thật.";
      form.reset();
    });
  }
});
