 document.addEventListener("DOMContentLoaded", function () {
        // Set current year in footer
        document.getElementById("year").textContent = new Date().getFullYear();

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
        const navLinks = document.querySelector(".nav-links");

        mobileMenuToggle.addEventListener("click", function () {
          this.classList.toggle("active");
          navLinks.classList.toggle("active");
          document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
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
        const animateOnScroll = function() {
          const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in');
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('active');
              }
            });
          }, {
            threshold: 0.1
          });

          elements.forEach(element => {
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
          
          sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
              currentSection = section.getAttribute("id");
            }
          });

          navItems.forEach(item => {
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
      });