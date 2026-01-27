// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "213698308898"; // Replace with your actual WhatsApp number (International format without +)

// --- SERVICE DATA STRUCTURE (SCALABLE) ---
// Add new objects here to add new services automatically
const services = [
  {
    id: "cv",
    title: "CV & Resume Writing",
    icon: "fa-file-signature",
    desc: "ATS-optimized resumes tailored for internships and jobs.",
    fields: [
      {
        label: "Current Education Level",
        type: "text",
        placeholder: "e.g. Final Year MSc",
      },
      {
        label: "Target Job Role",
        type: "text",
        placeholder: "e.g. Data Analyst",
      },
    ],
  },
  {
    id: "web",
    title: "Website Development",
    icon: "fa-code",
    desc: "Personal portfolios, landing pages, and project sites.",
    fields: [
      {
        label: "Type of Website",
        type: "select",
        options: ["Portfolio", "Landing Page", "E-Commerce", "Blog"],
      },
      {
        label: "Key Features Needed",
        type: "textarea",
        placeholder: "e.g. Dark mode, Contact form, Gallery...",
      },
    ],
  },
  {
    id: "ppt",
    title: "PowerPoint Design",
    icon: "fa-chart-pie",
    desc: "Professional decks for thesis defense and seminars.",
    fields: [
      {
        label: "Presentation Topic",
        type: "text",
        placeholder: "e.g. AI in Healthcare",
      },
      { label: "Number of Slides (Approx)", type: "number", placeholder: "10" },
      { label: "Deadline", type: "date" },
    ],
  },
  {
    id: "research",
    title: "Research & Thesis",
    icon: "fa-book-open",
    desc: "Assistance with editing, proofreading, and formatting.",
    fields: [
      {
        label: "Field of Study",
        type: "text",
        placeholder: "e.g. Molecular Biology",
      },
      {
        label: "Service Type",
        type: "select",
        options: ["Proofreading", "Formatting", "Statistical Analysis"],
      },
      { label: "Word Count", type: "number", placeholder: "e.g. 5000" },
    ],
  },
  {
    id: "app",
    title: "App Development",
    icon: "fa-mobile-screen",
    desc: "Mobile applications for graduation projects or startups.",
    fields: [
      {
        label: "Platform",
        type: "select",
        options: ["iOS", "Android", "Cross-Platform"],
      },
      {
        label: "App Idea Summary",
        type: "textarea",
        placeholder: "Describe core functionality...",
      },
    ],
  },
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  setupFormNavigation();
});

// --- RENDER SERVICES ---
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  services.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
            <div class="service-icon"><i class="fa-solid ${service.icon}"></i></div>
            <h3>${service.title}</h3>
            <p style="color: #64748b; font-size: 0.9rem; margin-top: 0.5rem;">${service.desc}</p>
        `;
    card.addEventListener("click", () => openForm(service));
    grid.appendChild(card);
  });

  // Add "Add Custom Request" card (Scalability)
  const addCard = document.createElement("div");
  addCard.className = "service-card";
  addCard.style.border = "2px dashed #cbd5e1";
  addCard.style.display = "flex";
  addCard.style.flexDirection = "column";
  addCard.style.alignItems = "center";
  addCard.style.justifyContent = "center";
  addCard.innerHTML = `<i class="fa-solid fa-plus" style="font-size: 2rem; color: #94a3b8; margin-bottom: 1rem;"></i><h3 style="color: #64748b;">Other Inquiry</h3>`;
  addCard.addEventListener("click", () =>
    openForm({
      id: "custom",
      title: "General Inquiry",
      fields: [
        {
          label: "Describe your request",
          type: "textarea",
          placeholder: "How can we help?",
        },
      ],
    }),
  );
  grid.appendChild(addCard);
}

// --- FORM LOGIC ---
let currentService = null;

function openForm(service) {
  currentService = service;
  const formSection = document.getElementById("orderFormSection");
  const titleSpan = document.getElementById("selectedServiceName");
  const dynamicContainer = document.getElementById("dynamicFields");

  // 1. Set Title
  titleSpan.textContent = service.title;

  // 2. Generate Fields dynamically
  dynamicContainer.innerHTML = "";
  service.fields.forEach((field, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "input-group";

    const label = document.createElement("label");
    label.textContent = field.label;

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      field.options.forEach((opt) => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
    } else if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 3;
      input.placeholder = field.placeholder || "";
    } else {
      input = document.createElement("input");
      input.type = field.type;
      input.placeholder = field.placeholder || "";
    }

    input.id = `dynamic_${index}`;
    input.className = "dynamic-input";

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    dynamicContainer.appendChild(wrapper);
  });

  // 3. Show Form & Scroll
  formSection.classList.add("visible");
  formSection.style.display = "block";

  // Reset steps
  document
    .querySelectorAll(".form-step")
    .forEach((s) => s.classList.remove("active"));
  document.querySelector('.form-step[data-step="1"]').classList.add("active");

  formSection.scrollIntoView({ behavior: "smooth", block: "center" });
}

function setupFormNavigation() {
  const nextBtn = document.querySelector(".btn-next");
  const backBtn = document.querySelector(".btn-back");
  const closeBtn = document.getElementById("closeForm");
  const form = document.getElementById("boostForm");

  nextBtn.addEventListener("click", () => {
    // Validate Step 1
    const name = document.getElementById("userName").value;
    const org = document.getElementById("userOrg").value;

    if (!name || !org) {
      alert("Please fill in your basic details.");
      return;
    }

    // Switch to Step 2
    document
      .querySelector('.form-step[data-step="1"]')
      .classList.remove("active");
    document.querySelector('.form-step[data-step="2"]').classList.add("active");
  });

  backBtn.addEventListener("click", () => {
    document
      .querySelector('.form-step[data-step="2"]')
      .classList.remove("active");
    document.querySelector('.form-step[data-step="1"]').classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    document.getElementById("orderFormSection").classList.remove("visible");
    setTimeout(() => {
      document.getElementById("orderFormSection").style.display = "none";
    }, 500);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendToWhatsApp();
  });
}

// --- WHATSAPP INTEGRATION ---
function sendToWhatsApp() {
  const name = document.getElementById("userName").value;
  const org = document.getElementById("userOrg").value;

  let message = `*New UniBoost Order* 🚀%0a`;
  message += `---------------------------%0a`;
  message += `*Service:* ${currentService.title}%0a`;
  message += `*Name:* ${name}%0a`;
  message += `*Uni/Org:* ${org}%0a`;
  message += `---------------------------%0a`;
  message += `*Project Details:*%0a`;

  // Gather dynamic inputs
  currentService.fields.forEach((field, index) => {
    const val = document.getElementById(`dynamic_${index}`).value;
    message += `- ${field.label}: ${val}%0a`;
  });

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  // Open WhatsApp
  window.open(url, "_blank");
}
