"use strict";

//  main Js file for index.html page

// sticky navigation
const navbar = document.querySelector(".navigation-container");
const header = document.querySelector(".header");
const navHeight = navbar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// reviel sections
const allSections = document.querySelectorAll(".section");

const revealElements = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};
const sectionsObserver = new IntersectionObserver(revealElements, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((sec) => {
  sec.classList.add("section-hidden");
  sectionsObserver.observe(sec);
});

// Preloader fade out
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  loader.classList.add("loader-hidden");
});
