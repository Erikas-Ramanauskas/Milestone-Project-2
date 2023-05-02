"use strict";

//  main Js file for index.html page

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
