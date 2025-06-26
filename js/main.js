document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Toggle body overflow when menu is open
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle");
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

  // Improved Section Observer for Scroll Visibility
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Increased threshold for better visibility
  };

  let lastVisibleSection = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const correspondingNavItem = document.querySelector(
        `.nav-link[href="#${id}"]`
      );

      if (entry.isIntersecting) {
        // Only set the section as active if it's more than 50% visible
        if (entry.intersectionRatio >= 0.5) {
          // Remove active class from all sections and nav items
          sections.forEach((section) => {
            section.classList.remove("active");
          });
          navItems.forEach((item) => {
            item.classList.remove("active");
          });

          // Set current section and nav item as active
          entry.target.classList.add("active");
          if (correspondingNavItem) {
            correspondingNavItem.classList.add("active");
          }
          
          lastVisibleSection = entry.target;
        }
      } else {
        // If section is not intersecting at all, but was the last visible one
        if (entry.target === lastVisibleSection) {
          entry.target.classList.remove("active");
          if (correspondingNavItem) {
            correspondingNavItem.classList.remove("active");
          }
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Touch event handling for mobile swipe navigation
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    // Threshold for swipe detection (in pixels)
    const threshold = 50;
    
    // Swipe down - scroll to previous section
    if (touchStartY - touchEndY > threshold) {
      scrollToNextSection('down');
    }
    // Swipe up - scroll to next section
    else if (touchEndY - touchStartY > threshold) {
      scrollToNextSection('up');
    }
  }

  function scrollToNextSection(direction) {
    const currentSection = document.querySelector('.section.active');
    if (!currentSection) return;

    let targetSection;
    if (direction === 'up') {
      targetSection = currentSection.nextElementSibling;
    } else {
      targetSection = currentSection.previousElementSibling;
    }

    if (targetSection && targetSection.classList.contains('section')) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  }

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

  // Initialize the first section as active
  if (sections.length > 0) {
    sections[0].classList.add("active");
  }
});