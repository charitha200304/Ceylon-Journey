// User Login Page JavaScript - Ceylon Journeys

document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const authTabs = document.querySelectorAll(".auth-tab")
  const authForms = document.querySelectorAll(".auth-form-container")

  if (authTabs.length > 0 && authForms.length > 0) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        authTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Hide all form containers
        authForms.forEach((form) => {
          form.classList.remove("active")
        })

        // Show the corresponding form container
        const tabType = this.getAttribute("data-tab")
        const targetForm = document.getElementById(`${tabType}-form`)
        if (targetForm) {
          targetForm.classList.add("active")
        }
      })
    })
  }

  // Password visibility toggle
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", function () {
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
    })
  }

  // Form validation
  const signinForm = document.querySelector("#signin-form .auth-form")
  const signupForm = document.querySelector("#signup-form .auth-form")

  if (signinForm) {
    signinForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = document.getElementById("signin-email").value
      const password = document.getElementById("signin-password").value

      // Simple validation
      if (!email || !password) {
        showFormError(this, "Please fill in all fields")
        return
      }

      // Email validation
      if (!isValidEmail(email)) {
        showFormError(this, "Please enter a valid email address")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector("button[type='submit']")
      const originalText = submitButton.textContent
      submitButton.textContent = "Signing in..."
      submitButton.disabled = true

      setTimeout(() => {
        // Redirect to user dashboard or home page
        window.location.href = "user-dashboard.html"
      }, 1500)
    })
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const firstName = document.getElementById("signup-firstname").value
      const lastName = document.getElementById("signup-lastname").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirmPassword = document.getElementById("signup-confirm").value
      const termsChecked = document.getElementById("terms").checked

      // Simple validation
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showFormError(this, "Please fill in all fields")
        return
      }

      // Email validation
      if (!isValidEmail(email)) {
        showFormError(this, "Please enter a valid email address")
        return
      }

      // Password match validation
      if (password !== confirmPassword) {
        showFormError(this, "Passwords do not match")
        return
      }

      // Password strength validation
      if (password.length < 8) {
        showFormError(this, "Password must be at least 8 characters long")
        return
      }

      // Terms agreement validation
      if (!termsChecked) {
        showFormError(this, "You must agree to the Terms & Conditions")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector("button[type='submit']")
      const originalText = submitButton.textContent
      submitButton.textContent = "Creating account..."
      submitButton.disabled = true

      setTimeout(() => {
        // Show success message
        this.innerHTML = `
          <div class="success-message" style="text-align: center; padding: 30px 0;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
            <h2>Account Created Successfully!</h2>
            <p>Welcome to Ceylon Journeys. You can now sign in to your account.</p>
            <button type="button" class="btn btn-primary" style="margin-top: 20px;" id="go-to-signin">Sign In Now</button>
          </div>
        `

        // Add event listener to the new button
        document.getElementById("go-to-signin").addEventListener("click", () => {
          // Switch to sign in tab
          document.querySelector("[data-tab='signin']").click()
        })
      }, 1500)
    })
  }

  // Helper functions
  function showFormError(form, message) {
    // Remove any existing error message
    const existingError = form.querySelector(".form-error")
    if (existingError) {
      existingError.remove()
    }

    // Create and add error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-error"
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`

    // Insert before the submit button
    const submitButton = form.querySelector("button[type='submit']").parentNode
    form.insertBefore(errorDiv, submitButton)
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
        <h2>Reset Your Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        <form class="reset-form">
          <div class="form-group">
            <label for="reset-email">Email Address</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="reset-email" required>
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Send Reset Link</button>
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

        const email = document.getElementById("reset-email").value

        // Email validation
        if (!email || !isValidEmail(email)) {
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
              <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
              <h2>Password Reset Email Sent</h2>
              <p>We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.</p>
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

