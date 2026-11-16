
console.log("Portfolio JavaScript is working!");
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector(".cursor-outline");


document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    cursorOutline.style.left = `${mouseX}px`;
    cursorOutline.style.top = `${mouseY}px`;
});

const interactiveElements = document.querySelectorAll('a, button');

interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursorDot.classList.add("active");
    });
    element.addEventListener('mouseleave', () => {
        cursorDot.classList.remove("active");
    });
});


const magneticButtons = document.querySelectorAll(
    ".primary-btn, .secondary-btn, .nav-btn"
);

magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.translate = `${x * 0.15}px ${y * 0.15}px`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.translate = "0px 0px";

    });

});



gsap.registerPlugin(ScrollTrigger);



gsap.from(".hero h1", {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: "power4.out"
});

gsap.from(".hero h2", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3
});

gsap.from(".hero-description", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5
});

// PROJECT SCROLL REVEAL

document.addEventListener("DOMContentLoaded", () => {

    const projectCards = document.querySelectorAll(".project-card");

    const projectObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                projectObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    projectCards.forEach((card) => {
        projectObserver.observe(card);
    });

});

// Initialize EmailJS
emailjs.init({
    publicKey: "MnwX023K9OcglnJ4I"
});

// Handle contact form submission
const contactForm = document.getElementById("contactForm");
const submitButton = contactForm.querySelector("button[type='submit']");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loading state
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    emailjs.sendForm(
        "service_cfio295",
        "template_sdexiin",
        this
    )
   .then(function () {
    contactForm.reset();
    errorMessage.classList.remove("show");
    successMessage.classList.add("show");
})
    .catch(function (error) {
    console.log("EmailJS Error:", error);

    successMessage.classList.remove("show");
    errorMessage.classList.add("show");
})
    .finally(function () {
        submitButton.textContent = "Send Message ↗";
        submitButton.disabled = false;
    });
});

// Scroll Reveal Animation
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `nav a[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, {
    threshold: 0.3
});

sections.forEach((section) => {
    navObserver.observe(section);
});