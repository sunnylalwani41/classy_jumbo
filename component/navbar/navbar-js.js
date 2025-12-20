// data link
const htmlCodeLink = "/component/navbar/navbar.html";
const menuDataLink = "/json/menu.json";
const companyInformationDataLink = "/json/company_information.json";

//country
let country = "in";

//data store variable
let menuData = null;
let companyDataForLogo = null;

let fetchMenu = async () =>{
  try{
    let response = await fetch(menuDataLink);
    let data = await response.json();

    if(data)
      menuData = data;
  }
  catch(error){
    console.error("Error during loading the menu data", error);
  }
}

let fetchCompanyInformation = async () =>{
  try{
    let response = await fetch(companyInformationDataLink);
    let data = await response.json();

    if(data)
      companyDataForLogo = data;
  }
  catch(error){
    console.error("Error during loading the menu data", error);
  }
}

//logo
let companyLogoLoad = async () => {
  let navbarLogo = document.querySelector(".navbar-logo");
  
  if (!companyDataForLogo)
    await fetchCompanyInformation();

  navbarLogo.innerHTML = `<img src="${companyDataForLogo.logo}" alt="Company Logo" />`;
}

let loadMenuData = async () =>{
  let navMenu = document.getElementsByClassName("nav-menu")[0];
  
  if (!menuData)
    await fetchMenu();

  navMenu.innerHTML = "";

  menuData.forEach (e =>{
    let li = document.createElement("li");
    li.className = "nav-item";

    let parts = e.route.replace("#/", "").split("/");

    if(e.submenu){
      li.classList.add("dropdown");
      
      // li.innerHTML = `
      //   <div class="nav-link-wrap">
      //     <a href="${e.route}" class="nav-link" data-menu="${parts[0]}">${e.title}</a>
      //     <span class="submenu-toggle"></span>
      //   </div>
      //   <ul class="submenu">
      //     ${e.submenu.map(sub =>
      //       `<li><a href="${sub.route}" data-menu="${parts[0]}">${sub.title}</a></li>`
      //     ).join("")}
      //   </ul>
      // `;


      li.innerHTML = `
        <a href="${e.route}" class="nav-link" data-menu="${parts[0]}">${e.title}</a>
        <ul class="submenu">
          ${e.submenu.map(sub =>
            `<li><a href="${sub.route}" data-menu="${parts[0]}">${sub.title}</a></li>`
          ).join("")}
        </ul>
      `;
    }
    else{
      li.innerHTML = `<a href="${e.route}" class="nav-link" data-menu="${parts[0]}" >${e.title}</a>`;
    }
    navMenu.append(li);
  });

  setupNav();
  setupSubmenuToggle();
  handleRoute(); 
}

function setupSubmenuToggle() {
  document.querySelectorAll(".submenu-toggle").forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.stopPropagation();
      const dropdown = toggle.closest(".dropdown");
      dropdown.classList.toggle("open");
    });
  });
}


let navbarHtmlCodeLoad = async () =>{
  // Load navbar
  fetch(htmlCodeLink)
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;

      loadMenuData();
      companyLogoLoad();
      setupHamburger();
    });
}

// Click handling
function setupNav() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
      const parentLi = this.closest(".dropdown");

      // MOBILE + DROPDOWN PARENT
      if (parentLi && window.innerWidth <= 768) {
        e.preventDefault();
        parentLi.classList.toggle("open");
        return;
      }

      // NORMAL NAVIGATION
      let href = this.getAttribute("href");
      let parts = href.replace("#/", "").split("/");

      const pagePart = parts[0];
      const subPagePart = parts[1];

      const page = `/pages/${pagePart}/${subPagePart || pagePart}.html`;
      const menu = this.dataset.menu;

      loadPage(page, menu);
      closeMobileMenu();   // CLOSE MENU AFTER CLICK
    });
  });
}


// Load page content
function loadPage(page, menu) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      setActive(menu);
      
      if (typeof initHeroSlider === "function") {
        initHeroSlider();
      }
      if(typeof companyInformationForPrivacyPolicy === "function"){
        companyInformationForPrivacyPolicy();
      }
    });
}

// Hash router
async function handleRoute() {
  const hash = location.hash || "#/home";

  const parts = hash.replace("#/", "").split("/");

  const page = parts[0];        // buy / rent / home
  const subPage = parts[1];     // apartments / villas

  loadPage(`/pages/${page}/${subPage || page}.html`, page);
}

// Hamburger
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll(".dropdown > .nav-link").forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });
}

function closeMobileMenu() {
  document.getElementById("hamburger")?.classList.remove("active");
  document.getElementById("navMenu")?.classList.remove("open");
}

// Highlight active menu
function setActive(menu) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.menu === menu);
  });
  document.querySelector(".navbar-logo").classList.remove("active");
}

document.addEventListener("click", e => {
  if (
    window.innerWidth <= 768 &&
    e.target.matches(".submenu a")
  ) {
    closeMobileMenu();
  }
});


// Handle refresh + back/forward
window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);

//navbar data
navbarHtmlCodeLoad();