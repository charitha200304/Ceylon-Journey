document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const authButtons = document.querySelector(".auth-buttons")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")

      // Create mobile menu if it doesn't exist
      if (!document.querySelector(".mobile-menu")) {
        const mobileMenu = document.createElement("div")
        mobileMenu.classList.add("mobile-menu")

        // Clone navigation links
        const navClone = navLinks.cloneNode(true)
        mobileMenu.appendChild(navClone)

        // Clone auth buttons
        const authClone = authButtons.cloneNode(true)
        mobileMenu.appendChild(authClone)

        // Insert after header
        const header = document.querySelector("header")
        header.parentNode.insertBefore(mobileMenu, header.nextSibling)

        // Add styles to mobile menu
        mobileMenu.style.display = "none"
        mobileMenu.style.flexDirection = "column"
        mobileMenu.style.padding = "20px"
        mobileMenu.style.backgroundColor = "white"
        mobileMenu.style.boxShadow = "0 5px 10px rgba(0,0,0,0.1)"

        // Style nav links in mobile menu
        const mobileNavLinks = mobileMenu.querySelector(".nav-links")
        mobileNavLinks.style.display = "flex"
        mobileNavLinks.style.flexDirection = "column"
        mobileNavLinks.style.gap = "15px"
        mobileNavLinks.style.marginBottom = "20px"

        // Style auth buttons in mobile menu
        const mobileAuthButtons = mobileMenu.querySelector(".auth-buttons")
        mobileAuthButtons.style.display = "flex"
        mobileAuthButtons.style.flexDirection = "column"
        mobileAuthButtons.style.gap = "10px"
      }

      // Toggle mobile menu visibility
      const mobileMenu = document.querySelector(".mobile-menu")
      if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
        mobileMenu.style.display = "flex"
      } else {
        mobileMenu.style.display = "none"
      }
    })
  }

  // Testimonial Slider
  const testimonialSlider = document.querySelector(".testimonial-slider")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (testimonialSlider && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      testimonialSlider.scrollBy({
        left: 350,
        behavior: "smooth",
      })
    })

    prevBtn.addEventListener("click", () => {
      testimonialSlider.scrollBy({
        left: -350,
        behavior: "smooth",
      })
    })
  }

  // Destination Category Filtering
  const categoryTabs = document.querySelectorAll(".category-tab")
  const destinationItems = document.querySelectorAll(".destination-item")

  if (categoryTabs.length > 0 && destinationItems.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Get category to filter
        const category = this.getAttribute("data-category")

        // Filter destinations
        destinationItems.forEach((item) => {
          if (category === "all" || item.getAttribute("data-category") === category) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Destination Search
  const searchInput = document.getElementById("destination-search")

  if (searchInput && destinationItems.length > 0) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      destinationItems.forEach((item) => {
        const destinationName = item.querySelector("h3").textContent.toLowerCase()

        if (destinationName.includes(searchTerm)) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  }

  // Smooth scrolling for guide page navigation
  const guideLinks = document.querySelectorAll(".guide-tab")

  if (guideLinks.length > 0) {
    guideLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all links
        guideLinks.forEach((l) => l.classList.remove("active"))

        // Add active class to clicked link
        this.classList.add("active")

        // Get target section
        const targetId = this.getAttribute("href").substring(1)
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
          // Calculate position to scroll to (accounting for sticky header)
          const headerHeight = document.querySelector("header").offsetHeight
          const navHeight = document.querySelector(".guide-navigation").offsetHeight
          const targetPosition = targetSection.offsetTop - headerHeight - navHeight

          // Scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Interactive map functionality
  const regionLinks = document.querySelectorAll(".region-list a")

  if (regionLinks.length > 0) {
    regionLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Get region
        const region = this.getAttribute("data-region")

        // Here you would implement the map highlighting functionality
        // This would typically involve SVG manipulation or an external mapping library
        console.log(`Region selected: ${region}`)

        // For demonstration, we'll just add an active class to the clicked link
        regionLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      })
    })
  }

  // Form validation for newsletter
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      // Simple email validation
      if (email === "" || !email.includes("@") || !email.includes(".")) {
        // Show error
        if (!document.querySelector(".newsletter-error")) {
          const errorMsg = document.createElement("p")
          errorMsg.classList.add("newsletter-error")
          errorMsg.textContent = "Please enter a valid email address"
          errorMsg.style.color = "#ff6b6b"
          errorMsg.style.marginTop = "10px"
          this.appendChild(errorMsg)
        }
      } else {
        // Remove error if exists
        const errorMsg = document.querySelector(".newsletter-error")
        if (errorMsg) {
          errorMsg.remove()
        }

        // Show success message
        const successMsg = document.createElement("p")
        successMsg.classList.add("newsletter-success")
        successMsg.textContent = "Thank you for subscribing!"
        successMsg.style.color = "#2ecc71"
        successMsg.style.marginTop = "10px"

        // Replace form with success message
        this.innerHTML = ""
        this.appendChild(successMsg)
      }
    })
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".destination-card, .package-card, .guide-card, .accommodation-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  const elementsToAnimate = document.querySelectorAll(
    ".destination-card, .package-card, .guide-card, .accommodation-card",
  )

  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})

