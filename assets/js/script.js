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


//added
document.querySelectorAll('[data-testimonials-item]').forEach(item => {
  item.addEventListener('click', function() {
    // Get the data attributes from the clicked testimonial
    const title = this.getAttribute('data-testimonials-title');
    const website = this.getAttribute('data-testimonials-website');
    const name = this.getAttribute('data-testimonials-name'); // Get the name
    const date = this.getAttribute('data-testimonials-date'); // Get the date
    const pro_description = this.getAttribute('data-testimonials-pro_description'); // Get the pro_description
    const imageSrc = this.querySelector('img').src; // Get the image source
    const linkText = this.getAttribute('data-testimonials-link-text'); // Fetch the new link text
    
    // Update the modal with the data
    document.querySelector('[data-modal-title]').textContent = title;

    document.querySelector('[data-modal-website]').textContent = linkText; // Use dynamic text
    document.querySelector('[data-modal-website]').setAttribute('href', website);
    document.querySelector('[data-modal-img]').setAttribute('src', imageSrc);

    // Update the new fields dynamically
    document.querySelector('[data-modal-name]').textContent = name; // Set the modal name
    document.querySelector('[data-modal-date]').textContent = date; // Set the modal date
    document.querySelector('[data-modal-description]').textContent = pro_description; // Set the pro_description

    // Show the modal
    document.querySelector('[data-modal-container]').classList.add('active');
  });
});

// Close modal
document.querySelector('[data-modal-close-btn]').addEventListener('click', function() {
  document.querySelector('[data-modal-container]').classList.remove('active');
});




// contact form using EmailJS.

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents page refresh
  
  emailjs.init("G0ASmtDaJpiHP4yCi"); // Your EmailJS API Key
  
  const serviceID = "service_uadm15a"; // Your Service ID
  const templateID = "template_b5lg4n6"; // Your Template ID

  const formData = {
    from_name: document.querySelector("input[name='name']").value,
    email: document.querySelector("input[name='email']").value,
    message: document.querySelector("textarea[name='message']").value
  };
  
  emailjs.send(serviceID, templateID, formData)
    .then(response => {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset(); // Clears form
    }, error => {
      alert("Failed to send message. Try again later.");
    });
});


// Certification Section
document.querySelectorAll('.certifications img').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <img src="${this.src}" alt="Certification" />
          <button class="close-modal">&times;</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    document.querySelector('.close-modal').addEventListener('click', () => {
      modal.remove();
    });
  });
});

document.querySelectorAll(".certification-card").forEach(card => {
  let bgColor = card.getAttribute("data-bg");
  let imgBgColor = card.getAttribute("data-img-bg");

  if (bgColor) {
    card.style.setProperty("--card-bg", `rgb(${bgColor})`);
  }

  if (imgBgColor) {
    card.querySelector(".certification-img").style.setProperty("--img-bg", `rgb(${imgBgColor})`);
  }
});



// for skills to glow

document.querySelectorAll(".skills-item").forEach(item => {
  let glowColor = "rgba(255, 215, 0, 0.5)"; // Default gold glow

  // Set different glow for skill categories
  if (item.innerText.includes("AI")) glowColor = "rgba(0, 255, 255, 0.5)"; // Cyan for AI
  if (item.innerText.includes("Programming")) glowColor = "rgba(255, 165, 0, 0.5)"; // Orange for Programming
  if (item.innerText.includes("Software")) glowColor = "rgba(173, 216, 230, 0.5)"; // Light Blue for Software
  if (item.innerText.includes("Hardware")) glowColor = "rgba(144, 238, 144, 0.5)"; // Light Green for Hardware

  item.addEventListener("mouseover", () => {
    item.style.boxShadow = `0px 0px 15px ${glowColor}`;
  });

  item.addEventListener("mouseout", () => {
    item.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
  });
});



//  services section background effect

document.querySelectorAll(".service-item").forEach(item => {
  let glowColor = "rgba(0, 255, 255, 0.5)"; // Default cyan glow

  // Set different glow colors for each service
  if (item.innerText.includes("Robotics")) glowColor = "rgba(255, 215, 0, 0.5)"; // Orange for Robotics
  if (item.innerText.includes("IoT")) glowColor = "rgba(255, 215, 0, 0.5)"; // Green for IoT
  if (item.innerText.includes("AI")) glowColor = "rgba(255, 215, 0, 0.5)"; // Indigo for AI
  if (item.innerText.includes("PCB")) glowColor = "rgba(255, 215, 0, 0.5)"; // Gold for PCB

  item.addEventListener("mouseover", () => {
    item.style.boxShadow = `0px 0px 15px ${glowColor}`;
  });

  item.addEventListener("mouseout", () => {
    item.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
  });
});


// for projects background glow

document.querySelectorAll(".project-item").forEach(item => {
  let glowColor = "rgba(0, 255, 255, 0.5)"; // Default cyan glow

  // Set different glow colors for each project category
  if (item.dataset.category === "ai & robotics") glowColor = "rgba(0, 255, 255, 0.5)"; // Orange for AI & Robotics
  if (item.dataset.category === "embedded systems") glowColor = "rgba(0, 255, 127, 0.5)"; // Green for Embedded Systems
  if (item.dataset.category === "applications") glowColor = "rgba(255, 215, 0, 0.5)"; // Gold for Applications

  item.addEventListener("mouseover", () => {
    item.style.boxShadow = `0px 0px 15px ${glowColor}`;
  });

  item.addEventListener("mouseout", () => {
    item.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
  });
});


// for the blog section background glow effect

document.querySelectorAll(".blog-post-item").forEach(item => {
  let category = item.querySelector(".blog-category")?.innerText || "";
  let glowColor = "rgba(0, 255, 255, 0.5)"; // Default cyan glow

  // Set different glow colors for each blog category
  if (category.includes("Robotics")) glowColor = "rgba(185, 134, 207, 0.8)"; // Orange for Robotics
  if (category.includes("3D Printing")) glowColor = "rgba(0, 255, 127, 0.5)"; // Green for 3D Printing
  if (category.includes("Electronics")) glowColor = "rgba(255, 215, 0, 0.5)"; // Gold for Electronics
  if (category.includes("PCB Design")) glowColor = "rgba(225, 79, 79, 0.58)"; // Indigo for PCB Design
  if (category.includes("AI")) glowColor = "rgba(0, 191, 255, 0.5)"; // Sky Blue for AI
  if (category.includes("Leadership")) glowColor = "rgba(119, 193, 191, 0.5)"; // Dark Orange for Leadership

  item.addEventListener("mouseover", () => {
    item.style.boxShadow = `0px 0px 15px ${glowColor}`;
  });

  item.addEventListener("mouseout", () => {
    item.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)";
  });
});

// // name and title
// // Function to highlight element
// function addHighlightEffect(element) {
//   element.style.transition = "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
//   element.style.backgroundColor = "rgba(99, 195, 105, 0.75)"; // Soft gold highlight
//   element.style.boxShadow = "0px 0px 12px rgba(51, 163, 70, 0.81)";
// }

// Function to remove highlight effect
// function removeHighlightEffect(element) {
//   setTimeout(() => {
//     element.style.backgroundColor = "transparent";
//     element.style.boxShadow = "none";
//   }, 500); // Reset after 0.5s
// }

// // Apply effect to name and title on hover and click
// document.querySelectorAll(".name, .title").forEach(element => {
//   element.addEventListener("mouseover", function () {
//     addHighlightEffect(this);
//   });

//   element.addEventListener("mouseout", function () {
//     removeHighlightEffect(this);
//   });

//   element.addEventListener("click", function () {
//     addHighlightEffect(this);
//     removeHighlightEffect(this);
//   });
// });

// // only the title to glow in the slider section
// function removeHighlightEffect(element) {
//   setTimeout(() => {
//     element.style.backgroundColor = "transparent";
//     element.style.boxShadow = "none";
//   }, 100); // Reset after 0.5s
// }

// // Apply effect to name and title on hover and click
// document.querySelectorAll(".title").forEach(element => {
//   element.addEventListener("mouseover", function () {
//     addHighlightEffect(this);
//   });

//   element.addEventListener("mouseout", function () {
//     removeHighlightEffect(this);
//   });

//   element.addEventListener("click", function () {
//     addHighlightEffect(this);
//     removeHighlightEffect(this);
//   });
// });


