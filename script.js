// ================= SELECT ELEMENTS =================

const container = document.getElementById("project-container");
const viewBtn = document.getElementById("view-more-btn");

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");
const modalLink = document.getElementById("git-links");


let showAll = false;


//  RENDERING 

function renderProjects() {

    console.log("Rendering projects:", showAll ? "ALL" : "LIMITED");

    container.innerHTML = "";
    const data = showAll ? projects : projects.slice(0, 3);

    console.log("Projects count:", data.length);

    data.forEach((project, index) => {
        console.log("Rendering:", project.title);


        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">

      <div class="project-card-content">
        <h3>${project.title}</h3>
        <p>${project.shortDesc}</p>
      </div>
    `;

        // CLICK → OPEN MODAL
        card.addEventListener("click", () => {
            console.log("clicked");
            openModal(project);
        });

        container.appendChild(card);
    });
}


// VIEW MORE 

viewBtn.addEventListener("click", () => {

    showAll = !showAll;

    console.log("TOGGLE:", showAll);
    console.log("SHOW ALL STATE:", showAll);
    renderProjects(); // force rendering

    viewBtn.innerText = showAll ? "View Less" : "View More";

});


// MODAL 

function openModal(project) {
    modal.style.display = "block";

    modalTitle.innerText = project.title;
    modalDesc.innerHTML = project.description;
    //   modalImg.src = project.image;
    // GALLERY
    modalLink.innerText = project.github;
    const gallery = document.getElementById("modal-gallery");
    gallery.innerHTML = "";

    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(img => {
            const image = document.createElement("img");
            image.src = img;
            gallery.appendChild(image);
        });
    }
}


// CLOSE BUTTON
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// CLICK OUTSIDE
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


//INITIAL LOADING 

renderProjects();