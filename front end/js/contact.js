// Contact Page JavaScript - Ceylon Journeys

document.addEventListener("DOMContentLoaded", () => {
  // Contact form validation and submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("contact-name").value
      const email = document.getElementById("contact-email").value
      const phone = document.getElementById("contact-phone").value
      const subject = document.getElementById("contact-subject").value
      const message = document.getElementById("contact-message").value

      // Validate form (simple validation)
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // In a real implementation, you would send this data to a server
      console.log("Contact form submitted:", { name, email, phone, subject, message })

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        contactForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We have received your message and will get back to you within 24 hours.</p>
          </div>
        `
      }, 1500)
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

  // Department card hover effects
  const departmentCards = document.querySelectorAll(".department-card")

  if (departmentCards.length > 0) {
    departmentCards.forEach((card) => {
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

  // Social media card hover effects
  const socialCards = document.querySelectorAll(".social-media-card")

  if (socialCards.length > 0) {
    socialCards.forEach((card) => {
      const originalColor = window.getComputedStyle(card).color
      const platform = card.classList[1] // facebook, twitter, etc.

      card.addEventListener("mouseenter", function () {
        this.style.color = "white"

        // Set background color based on platform
        switch (platform) {
          case "facebook":
            this.style.backgroundColor = "#3b5998"
            break
          case "instagram":
            this.style.backgroundColor = "#e1306c"
            break
          case "twitter":
            this.style.backgroundColor = "#1da1f2"
            break
          case "youtube":
            this.style.backgroundColor = "#ff0000"
            break
          case "linkedin":
            this.style.backgroundColor = "#0077b5"
            break
          case "pinterest":
            this.style.backgroundColor = "#bd081c"
            break
        }
      })

      card.addEventListener("mouseleave", function () {
        this.style.color = originalColor
        this.style.backgroundColor = "white"
      })
    })
  }

  // Google Map interaction
  const mapContainer = document.querySelector(".map-container iframe")

  if (mapContainer) {
    // Add a loading state
    mapContainer.style.opacity = "0.7"

    mapContainer.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Add a message when map is clicked
    mapContainer.addEventListener("click", () => {
      const mapInfo = document.querySelector(".map-info")
      if (mapInfo) {
        mapInfo.innerHTML += '<p class="map-interaction-msg">You can zoom in/out and drag to explore the map.</p>'

        // Style the message
        const msg = document.querySelector(".map-interaction-msg")
        if (msg) {
          msg.style.color = "var(--primary-color)"
          msg.style.fontStyle = "italic"
          msg.style.marginTop = "10px"

          // Remove the message after 5 seconds
          setTimeout(() => {
            msg.remove()
          }, 5000)
        }
      }
    })
  }

  // Copy contact information to clipboard
  const contactInfoItems = document.querySelectorAll(".contact-info-card p, .department-contact p")

  if (contactInfoItems.length > 0) {
    contactInfoItems.forEach((item) => {
      item.style.cursor = "pointer"
      item.setAttribute("title", "Click to copy")

      item.addEventListener("click", function () {
        const text = this.textContent.trim()

        // Create a temporary input element
        const tempInput = document.createElement("input")
        tempInput.value = text
        document.body.appendChild(tempInput)

        // Select and copy the text
        tempInput.select()
        document.execCommand("copy")

        // Remove the temporary element
        document.body.removeChild(tempInput)

        // Show a tooltip
        const tooltip = document.createElement("div")
        tooltip.textContent = "Copied!"
        tooltip.style.position = "absolute"
        tooltip.style.backgroundColor = "var(--secondary-color)"
        tooltip.style.color = "white"
        tooltip.style.padding = "5px 10px"
        tooltip.style.borderRadius = "4px"
        tooltip.style.fontSize = "0.8rem"
        tooltip.style.zIndex = "100"

        // Position the tooltip near the clicked element
        const rect = this.getBoundingClientRect()
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`
        tooltip.style.left = `${rect.left + window.scrollX}px`

        document.body.appendChild(tooltip)

        // Remove the tooltip after 2 seconds
        setTimeout(() => {
          document.body.removeChild(tooltip)
        }, 2000)
      })
    })
  }
})

