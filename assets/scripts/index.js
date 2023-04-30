"use strict";

//  main Js file for index.html page

// reviel sections
const allSections = document.querySelectorAll(".section");

function revealSection(entries, observer) {
  console.log(entries);
  const [entry] = entries;
  console.log(entry);

  if (entry.isIntersecting) {
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  }
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65],
});

allSections.forEach(function (section) {
  section.classList.add("section-hidden");
  sectionObserver.observe(section);
});
