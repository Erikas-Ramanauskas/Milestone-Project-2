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
  threshold: [1, 0.15, 0.3, 0.45],
});

allSections.forEach(function (section) {
  section.classList.add("section-hidden");
  sectionObserver.observe(section);
});
