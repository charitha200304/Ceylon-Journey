// Admin Login Page JavaScript - Ceylon Journeys

document.addEventListener("DOMContentLoaded", () => {
  // Password visibility toggle
  const togglePasswordButton = document.querySelector(".toggle-password")

  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling

      // Toggle password visibility
      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        this.classList.remove("fa-eye")
        this.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        this.classList.remove("fa-eye-slash")
        this.classList.add("fa-eye")
      }
    })
  }

  // Form validation
  const adminLoginForm = document.querySelector(".admin-login-form")

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const username = document.getElementById("admin-username").value
      const password = document.getElementById("admin-password").value

      // Simple validation
      if (!username || !password) {
        showFormError(this, "Please enter both username and password")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector("button[type='submit']")
      const originalText = submitButton.textContent
      submitButton.textContent = "Logging in..."
      submitButton.disabled = true

      setTimeout(() => {
        // In a real application, you would verify credentials on the server
        // For demo purposes, we'll use a simple check
        if (username === "admin" && password === "admin123") {
          // Redirect to admin dashboard
          window.location.href = "admin-dashboard.html"
        } else {
          // Show error message
          showFormError(this, "Invalid username or password")
          submitButton.textContent = originalText
          submitButton.disabled = false
        }
      }, 1500)
    })
  }

  // Helper function to show form errors
  function showFormError(form, message) {
    // Remove any existing error message
    const existingError = form.querySelector(".form-error")
    if (existingError) {
      existingError.remove()
    }

    // Create and add error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-error"
    errorDiv.style.color = "#ff3b30"
    errorDiv.style.marginBottom = "15px"
    errorDiv.style.fontSize = "0.9rem"
    errorDiv.style.backgroundColor = "rgba(255, 59, 48, 0.1)"
    errorDiv.style.padding = "10px"
    errorDiv.style.borderRadius = "4px"
    errorDiv.style.textAlign = "center"
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

    // Insert before the submit button
    const submitButton = form.querySelector("button[type='submit']").parentNode
    form.insertBefore(errorDiv, submitButton)
  }

  // Forgot password functionality
  const forgotPasswordLink = document.querySelector(".forgot-password")

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault()

      // Create modal for password reset
      const modal = document.createElement("div")
      modal.classList.add("password-reset-modal")

      const modalContent = document.createElement("div")
      modalContent.classList.add("modal-content")

      const closeBtn = document.createElement("span")
      closeBtn.classList.add("close-modal")
      closeBtn.innerHTML = "&times;"

      const formHTML = `
        <h2>Reset Admin Password</h2>
        <p>Please enter your username and the email address associated with your admin account. We'll send you instructions to reset your password.</p>
        <form class="reset-form">
          <div class="form-group">
            <label for="reset-username">Username</label>
            <div class="input-with-icon">
              <i class="fas fa-user"></i>
              <input type="text" id="reset-username" required>
            </div>
          </div>
          <div class="form-group">
            <label for="reset-email">Email Address</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="reset-email" required>
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Send Reset Instructions</button>
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
      modalContent.style.maxWidth = "400px"
      modalContent.style.width = "90%"
      modalContent.style.position = "relative"

      closeBtn.style.position = "absolute"
      closeBtn.style.top = "10px"
      closeBtn.style.right = "15px"
      closeBtn.style.fontSize = "24px"
      closeBtn.style.cursor = "pointer"

      // Form submission
      const resetForm = modal.querySelector(".reset-form")
      resetForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const username = document.getElementById("reset-username").value
        const email = document.getElementById("reset-email").value

        // Simple validation
        if (!username || !email) {
          alert("Please fill in all fields")
          return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address")
          return
        }

        // Simulate form submission
        const submitButton = resetForm.querySelector("button[type='submit']")
        submitButton.textContent = "Sending..."
        submitButton.disabled = true

        setTimeout(() => {
          // Show success message
          modalContent.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 30px 0;">
              <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 20px;"></i>
              <h2>Reset Instructions Sent</h2>
              <p>If the username and email match our records, you will receive password reset instructions shortly. Please check your email inbox.</p>
              <button type="button" class="btn btn-primary" style="margin-top: 20px;" id="close-modal">Close</button>
            </div>
          `

          // Add event listener to the new button
          document.getElementById("close-modal").addEventListener("click", () => {
            document.body.removeChild(modal)
          })
        }, 1500)
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

