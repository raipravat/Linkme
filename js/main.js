document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  mobileMenuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.classList.toggle("menu-open");

    // Change icon between bars and times
    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuToggle
          .querySelector("i")
          .classList.replace("fa-times", "fa-bars");
      }
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

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Sanitize inputs
  function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Usage:
  const cleanMessage = sanitizeInput(messageInput.value);

  // Get form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = contactForm.querySelector("button[type='submit']");

  // Original button text
  const originalBtnText = submitBtn.textContent;

  // Validate form
  if (
    !nameInput.value.trim() ||
    !emailInput.value.trim() ||
    !messageInput.value.trim()
  ) {
    showAlert("Please fill in all required fields", "error");
    return;
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showAlert("Please enter a valid email address", "error");
    return;
  }

  // Prepare data
  const formData = new FormData();
  formData.append("name", nameInput.value.trim());
  formData.append("email", emailInput.value.trim());
  formData.append("subject", subjectInput.value.trim());
  formData.append("message", messageInput.value.trim());
  formData.append("timestamp", new Date().toISOString());

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    // Use a more reliable endpoint
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw08OWQeKnUrHfbDTUcNQy6BjTehwJ9SJnMRTCsI7OLuv_62P5wdInG02LSoGIc3htN4Q/exec",
      {
        method: "POST",
        body: formData,
        mode: "no-cors", // Important for Google Apps Script
      }
    );

    showAlert("Thank you! Your message has been sent successfully.", "success");
    contactForm.reset();
  } catch (error) {
    console.error("Error:", error);
    showAlert(
      `Failed to send message. Please try again later or contact me directly at mr.raipravat@gmail.com`,
      "error"
    );
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

// Helper function to show alerts
function showAlert(message, type) {
  // Remove any existing alerts
  const existingAlert = document.querySelector(".form-alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement("div");
  alertDiv.className = `form-alert ${type}`;
  alertDiv.textContent = message;

  // Insert before the form
  contactForm.parentNode.insertBefore(alertDiv, contactForm);

  // Remove after 5 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Fetch and display blog posts from Blogger
const BLOG_URL = "https://blog.prabhat.info.np";
const POSTS_TO_SHOW = 4; // Number of posts to display
const EXCERPT_LENGTH = 120; // Character length for excerpts

async function fetchBlogPosts() {
  try {
    // Using JSONP approach to avoid CORS issues
    const callbackName = "handleBloggerResponse" + Date.now();
    window[callbackName] = function (data) {
      displayPosts(data.feed.entry);
      delete window[callbackName];
    };

    const script = document.createElement("script");
    script.src = `${BLOG_URL}/feeds/posts/default?alt=json-in-script&callback=${callbackName}`;
    script.onerror = () => {
      document.getElementById("blog-posts").innerHTML = `
    <div class="error" style="
      text-align: center;
      padding: 40px;
      color: #e74c3c;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    ">
      Some reason we can't load Blog posts. Please wait a little longer or 
      <a href="${BLOG_URL}" style="color:#3498db;">visit the blog directly</a>.
    </div>`;

      // Also style the container to allow proper centering
      document.getElementById("blog-posts").style.position = "relative";
      document.getElementById("blog-posts").style.minHeight = "10vh";
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  const container = document.getElementById("blog-posts");

  if (!posts || posts.length === 0) {
    container.innerHTML =
      '<div style="text-align:center; padding:40px;">No posts found.</div>';
    return;
  }

  let html = "";
  posts.slice(0, POSTS_TO_SHOW).forEach((post) => {
    const title = post.title.$t;
    const fullContent = post.content.$t;
    const excerpt = stripHtml(fullContent).substring(0, EXCERPT_LENGTH) + "...";
    const url = post.link.find((link) => link.rel === "alternate").href;
    const date = new Date(post.published.$t).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Try to find the first image in the post
    const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
    const imageUrl = imgMatch ? imgMatch[1] : null;

    html += `
                <div class="project-card">
                    ${
                      imageUrl
                        ? `
                    <div class="project-image">
                        <img src="${imageUrl}" alt="${title}" loading="lazy">
                    </div>
                    `
                        : ""
                    }
                    <div class="project-content">
                        <h3>${title}</h3>
                        <p class="post-excerpt">${excerpt}</p>
                        <div class="project-tech">
                            <span>${date}</span>
                        </div>
                        <a href="${url}" class="project-link" target="_blank" rel="noopener">Read Post</a>
                    </div>
                </div>
            `;
  });

  container.innerHTML = html;
}

// Helper function to remove HTML tags
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// Load posts when page is ready
fetchBlogPosts();
