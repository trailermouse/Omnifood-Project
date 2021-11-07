/* jshint esversion: 6 */

/* Setting current year in the footer */
const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;


/* Mobile navigation menu */
const btnNav = document.querySelector(".btn-mobile-nav");
const headerEL = document.querySelector(".header");

btnNav.addEventListener("click", function () {
  headerEL.classList.toggle("nav-open");
});


/* Smooth scrolling */
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to the top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other sections
    if (href !== "#" && href.startsWith("#")) {
      const sectionEL = document.querySelector(href);
      sectionEL.scrollIntoView({ behavior: "smooth" });
    }

    // Close the mobile nav
    if (link.classList.contains("main-nav-link"))
      headerEL.classList.toggle("nav-open");
  });
});


/* Sticky navigation */
const sectionHeroEL = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null /* in the viewport */,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHeroEL);


/* Fixing flexbox gap property missing in some Safari versions */
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();