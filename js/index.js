'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


//FETCH THE SKILLS FROM JSON FILE
//***************************************************** */

// Fetch JSON data and generate skills list
fetch('./js/skills.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not available ' + response.statusText);
  }
  return response.json();
})
.then(skills => {
  //Get the Skills Container
  const skillsList = document.querySelector('.project-list');

// Iterate over the skills array and create elements
  skills.forEach(skill => {
    // Create the skill item
    const skillItem = document.createElement('li');
    skillItem.className = 'project-item active';

    // Create the image element
    const img = document.createElement('img');
    img.src = skill['img-url'];
    img.alt = skill.name;
    img.loading = 'lazy';

    // Create the title element
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = skill.name;

    // Create the description element
    const desc = document.createElement('p');
    desc.className = 'project-category';
    desc.textContent = skill.desc;

    const anchor = document.createElement('a');
    anchor.href = '#';

    const fig = document.createElement('figure');
    fig.className = 'project-img'

    fig.appendChild(img);
    anchor.appendChild(fig);

    // Append the elements to the skill item
    skillItem.appendChild(anchor);
    skillItem.appendChild(title);
    skillItem.appendChild(desc);

    // Append the skill item to the skills list
    skillsList.appendChild(skillItem);
  });
})
.catch(error => {
  console.error('Error fetching the JSON file:', error);
});


//FETCH THE PROJECTS FROM JSON FILE
//***************************************************** */

fetch('./js/projects.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not available ' + response.statusText);
  }
  return response.json();
})
.then(projects => {
  //Get the Projects Container
  const projectsList = document.querySelector('.blog-posts-list');

  projects.forEach(project => {
  // Create the project item
    const projItem = document.createElement('li');
    projItem.className = 'blog-post-item';

    const an = document.createElement('a');
    an.target = '_blank';
    an.href = project.link;

    const figu = document.createElement('figure');
    figu.className = 'blog-banner-box';

    // Create the image element
    const proimg = document.createElement('img');
    proimg.src = project['img-url'];
    proimg.alt = project.alt;
    proimg.loading = 'lazy';

    figu.appendChild(proimg);

    const div1 = document.createElement('div');
    div1.className = 'blog-content';

    const div2 = document.createElement('div');
    div2.className = 'blog-meta';

    const para1 = document.createElement('p');
    para1.className = 'blog-category';
    para1.textContent = project.tech;
    div2.appendChild(para1);
    div1.appendChild(div2);

    // Create the title element
    const title = document.createElement('h3');
    title.className = 'h3 blog-item-title';
    title.textContent = project.title;

    div1.appendChild(title);

    // Create the description element
    const desc = document.createElement('p');
    desc.className = 'blog-text';
    desc.textContent = project.desc;

    div1.appendChild(desc);

    an.appendChild(figu);
    an.appendChild(div1);

    // Append the elements to the project item
    projItem.appendChild(an);

    // Append the project item to the projects list
    projectsList.appendChild(projItem);
  });
})
.catch(error => {
  console.error('Error fetching the JSON file:', error);
});