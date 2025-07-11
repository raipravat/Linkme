document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");

      // Change icon and save preference
      const icon = this.querySelector("i");
      if (document.body.classList.contains("light-theme")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    const icon = document.querySelector(".theme-toggle i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll to top button visibility
    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to bottom button functionality
  document.getElementById("scrollTrigger").addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  };

  // Initialize animations
  animateOnScroll();

  // Active nav link based on scroll position
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-link");

  function setActiveSection() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveSection);
  setActiveSection();

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Remove any existing success message
        const existingSuccess = this.querySelector(".form-success");
        if (existingSuccess) {
          existingSuccess.remove();
        }

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.className = "form-success";
        successMsg.textContent = "Message sent successfully!";
        this.appendChild(successMsg);

        // Reset form
        this.reset();

        setTimeout(() => {
          successMsg.remove();
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        alert("There was an error sending your message. Please try again.");
      }
    });
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Active section indicator for navigation
  const indicatorDots = document.querySelectorAll(
    ".current-section-indicator a"
  );
  const activeIndicator = document.querySelector(".nav-indicator");

  function updateSectionIndicator(currentSection) {
    // Update navigation links
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");

        // Update indicator position
        const activeItem = item.parentElement;
        const itemLeft = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;

        if (activeIndicator) {
          activeIndicator.style.width = `${itemWidth}px`;
          activeIndicator.style.left = `${itemLeft}px`;
          activeIndicator.style.opacity = "1";
        }
      }
    });

    // Update indicator dots
    indicatorDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("href") === `#${currentSection}`) {
        dot.classList.add("active");
      }
    });

    // Hide indicator if no active section
    if (!currentSection && activeIndicator) {
      activeIndicator.style.opacity = "0";
    }
  }

  // Call updateSectionIndicator when scroll position changes
  window.addEventListener("scroll", function () {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    updateSectionIndicator(currentSection);
  });

  // Initial call
  let initialSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      initialSection = section.getAttribute("id");
    }
  });
  updateSectionIndicator(initialSection);
});

// Hero text typed style
  const nameWords = ["Prabhat Rai"]; // Replace with your actual name
  const typedText = document.getElementById("typed-text");

  let wordIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeEffect() {
    const currentWord = nameWords[wordIndex];

    if (typing) {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        typing = false;
        setTimeout(typeEffect, 800); // wait before deleting
        return;
      }
    } else {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        typing = true;
        wordIndex = (wordIndex + 1) % nameWords.length;
      }
    }

    setTimeout(typeEffect, 100); // typing speed
  }

  typeEffect();

