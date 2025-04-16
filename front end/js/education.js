// Education Page JavaScript - Ceylon Journeys

document.addEventListener("DOMContentLoaded", () => {
  // Program tabs functionality
  const programTabs = document.querySelectorAll(".program-tab")
  const programContents = document.querySelectorAll(".program-content")

  if (programTabs.length > 0 && programContents.length > 0) {
    programTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        programTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Hide all content sections
        programContents.forEach((content) => {
          content.classList.remove("active")
        })

        // Show the corresponding content
        const programType = this.getAttribute("data-program")
        const targetContent = document.getElementById(programType)
        if (targetContent) {
          targetContent.classList.add("active")
        }
      })
    })
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", function () {
        // Toggle active class on the clicked item
        item.classList.toggle("active")

        // Update the icon
        const icon = this.querySelector(".faq-toggle i")
        if (item.classList.contains("active")) {
          icon.className = "fas fa-minus"
        } else {
          icon.className = "fas fa-plus"
        }
      })
    })
  }

  // University card hover effects
  const universityCards = document.querySelectorAll(".university-card")

  if (universityCards.length > 0) {
    universityCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)"
        this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "var(--shadow)"
      })
    })
  }

  // Private university comparison card hover effects
  const comparisonCards = document.querySelectorAll(".comparison-card")

  if (comparisonCards.length > 0) {
    comparisonCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)"
        this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "var(--shadow)"
      })
    })
  }

  // Testimonial slider functionality
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

  // Smooth scrolling for admission process
  const processSteps = document.querySelectorAll(".process-step")

  if (processSteps.length > 0) {
    // Add animation on scroll
    const animateProcessSteps = () => {
      processSteps.forEach((step) => {
        const stepPosition = step.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2

        if (stepPosition < screenPosition) {
          step.style.opacity = "1"
          step.style.transform = "translateX(0)"
        }
      })
    }

    // Set initial styles
    processSteps.forEach((step, index) => {
      step.style.opacity = "0"
      step.style.transform = "translateX(-20px)"
      step.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`
    })

    // Run animation on load and scroll
    window.addEventListener("load", animateProcessSteps)
    window.addEventListener("scroll", animateProcessSteps)
  }

  // Consultation form popup
  const consultationBtn = document.querySelector(".service-cta .btn")

  if (consultationBtn) {
    consultationBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Create modal for consultation form
      const modal = document.createElement("div")
      modal.classList.add("consultation-modal")

      const modalContent = document.createElement("div")
      modalContent.classList.add("modal-content")

      const closeBtn = document.createElement("span")
      closeBtn.classList.add("close-modal")
      closeBtn.innerHTML = "&times;"

      const formHTML = `
        <h2>Book a Free Consultation</h2>
        <p>Fill out the form below and our education consultant will get in touch with you.</p>
        <form class="consultation-form">
          <div class="form-row">
            <div class="form-group">
              <label for="consult-name">Full Name</label>
              <input type="text" id="consult-name" required>
            </div>
            <div class="form-group">
              <label for="consult-email">Email Address</label>
              <input type="email" id="consult-email" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="consult-phone">Phone Number</label>
              <input type="tel" id="consult-phone">
            </div>
            <div class="form-group">
              <label for="consult-program">Program of Interest</label>
              <select id="consult-program">
                <option value="">Select a program</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="research">Research</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="consult-message">Message</label>
            <textarea id="consult-message" rows="4"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit Request</button>
          </div>
        </form>
      `

      modalContent.innerHTML = formHTML
      modalContent.prepend(closeBtn)
      modal.appendChild(modalContent)
      document.body.appendChild(modal)

      // Add modal styles
      modal.style.display = "flex"
      modal.style.position = "fixed"
      modal.style.top = "0"
      modal.style.left = "0"
      modal.style.width = "100%"
      modal.style.height = "100%"
      modal.style.backgroundColor = "rgba(0,0,0,0.7)"
      modal.style.zIndex = "1000"
      modal.style.justifyContent = "center"
      modal.style.alignItems = "center"

      modalContent.style.backgroundColor = "white"
      modalContent.style.padding = "30px"
      modalContent.style.borderRadius = "8px"
      modalContent.style.maxWidth = "600px"
      modalContent.style.width = "90%"
      modalContent.style.position = "relative"

      closeBtn.style.position = "absolute"
      closeBtn.style.top = "10px"
      closeBtn.style.right = "15px"
      closeBtn.style.fontSize = "24px"
      closeBtn.style.cursor = "pointer"

      // Form submission
      const consultForm = modal.querySelector(".consultation-form")
      consultForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // In a real implementation, you would send this data to a server
        console.log("Consultation request submitted")

        // Show success message
        modalContent.innerHTML = `
          <span class="close-modal">&times;</span>
          <div class="success-message" style="text-align: center; padding: 30px 0;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
            <h2>Thank You!</h2>
            <p>Your consultation request has been submitted successfully. One of our education consultants will contact you within 24 hours.</p>
          </div>
        `

        // Update close button event listener
        modal.querySelector(".close-modal").addEventListener("click", () => {
          document.body.removeChild(modal)
        })
      })

      // Close modal functionality
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(modal)
      })

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal)
        }
      })
    })
  }
})

