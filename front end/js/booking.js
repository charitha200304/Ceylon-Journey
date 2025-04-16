// Booking Page JavaScript - Ceylon Journeys

document.addEventListener("DOMContentLoaded", () => {
  // Step navigation
  const nextButtons = document.querySelectorAll(".next-step")
  const prevButtons = document.querySelectorAll(".prev-step")
  const progressSteps = document.querySelectorAll(".progress-step")
  const bookingForms = document.querySelectorAll(".booking-form")

  // Next step buttons
  if (nextButtons.length > 0) {
    nextButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const currentStep = Number.parseInt(this.getAttribute("data-next")) - 1
        const nextStep = Number.parseInt(this.getAttribute("data-next"))

        // Validate current step before proceeding
        if (validateStep(currentStep)) {
          // Update progress steps
          progressSteps.forEach((step) => {
            const stepNum = Number.parseInt(step.getAttribute("data-step"))

            if (stepNum < nextStep) {
              step.classList.add("completed")
            }

            if (stepNum === nextStep) {
              step.classList.add("active")
            } else {
              step.classList.remove("active")
            }
          })

          // Hide current form and show next form
          bookingForms.forEach((form) => {
            form.classList.remove("active")
          })

          document.getElementById(`step-${nextStep}`).classList.add("active")

          // Update booking summary if moving to payment step
          if (nextStep === 3) {
            updateBookingSummary()
          }

          // Scroll to top of form
          document.querySelector(".booking-forms").scrollIntoView({ behavior: "smooth" })
        }
      })
    })
  }

  // Previous step buttons
  if (prevButtons.length > 0) {
    prevButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const prevStep = Number.parseInt(this.getAttribute("data-prev"))

        // Update progress steps
        progressSteps.forEach((step) => {
          const stepNum = Number.parseInt(step.getAttribute("data-step"))

          if (stepNum === prevStep) {
            step.classList.add("active")
          } else {
            step.classList.remove("active")
          }
        })

        // Hide current form and show previous form
        bookingForms.forEach((form) => {
          form.classList.remove("active")
        })

        document.getElementById(`step-${prevStep}`).classList.add("active")

        // Scroll to top of form
        document.querySelector(".booking-forms").scrollIntoView({ behavior: "smooth" })
      })
    })
  }

  // Number input functionality
  const numberInputs = document.querySelectorAll(".number-input")

  if (numberInputs.length > 0) {
    numberInputs.forEach((container) => {
      const minusBtn = container.querySelector(".minus")
      const plusBtn = container.querySelector(".plus")
      const input = container.querySelector("input")

      minusBtn.addEventListener("click", () => {
        const currentValue = Number.parseInt(input.value)
        const minValue = Number.parseInt(input.getAttribute("min"))

        if (currentValue > minValue) {
          input.value = currentValue - 1
        }
      })

      plusBtn.addEventListener("click", () => {
        const currentValue = Number.parseInt(input.value)
        const maxValue = Number.parseInt(input.getAttribute("max"))

        if (currentValue < maxValue) {
          input.value = currentValue + 1
        }
      })
    })
  }

  // Payment method selection
  const paymentMethods = document.querySelectorAll(".payment-method")

  if (paymentMethods.length > 0) {
    paymentMethods.forEach((method) => {
      method.addEventListener("click", function () {
        // Remove active class from all methods
        paymentMethods.forEach((m) => m.classList.remove("active"))

        // Add active class to clicked method
        this.classList.add("active")

        // Check the radio button
        const radio = this.querySelector("input[type='radio']")
        radio.checked = true

        // Show/hide credit card form based on selection
        const creditCardForm = document.querySelector(".credit-card-form")

        if (radio.value === "credit-card") {
          creditCardForm.style.display = "block"
        } else {
          creditCardForm.style.display = "none"
        }
      })
    })
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        // Toggle active class on the clicked item
        item.classList.toggle("active")
      })
    })
  }

  // Live chat button
  const openChatBtn = document.getElementById("open-chat")

  if (openChatBtn) {
    openChatBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Create chat widget
      const chatWidget = document.createElement("div")
      chatWidget.classList.add("chat-widget")

      const chatHeader = document.createElement("div")
      chatHeader.classList.add("chat-header")

      const chatBody = document.createElement("div")
      chatBody.classList.add("chat-body")

      const chatFooter = document.createElement("div")
      chatFooter.classList.add("chat-footer")

      // Chat header content
      chatHeader.innerHTML = `
        <h3>Ceylon Journeys Support</h3>
        <span class="close-chat">&times;</span>
      `

      // Chat body content
      chatBody.innerHTML = `
        <div class="chat-messages">
          <div class="message agent">
            <div class="message-content">
              <p>Hello! Welcome to Ceylon Journeys. How can I help you with your booking today?</p>
              <span class="message-time">Just now</span>
            </div>
          </div>
        </div>
      `

      // Chat footer content
      chatFooter.innerHTML = `
        <input type="text" placeholder="Type your message...">
        <button type="button"><i class="fas fa-paper-plane"></i></button>
      `

      // Assemble chat widget
      chatWidget.appendChild(chatHeader)
      chatWidget.appendChild(chatBody)
      chatWidget.appendChild(chatFooter)

      // Add to document
      document.body.appendChild(chatWidget)

      // Add styles
      chatWidget.style.position = "fixed"
      chatWidget.style.bottom = "20px"
      chatWidget.style.right = "20px"
      chatWidget.style.width = "300px"
      chatWidget.style.height = "400px"
      chatWidget.style.backgroundColor = "white"
      chatWidget.style.borderRadius = "8px"
      chatWidget.style.boxShadow = "0 5px 25px rgba(0, 0, 0, 0.2)"
      chatWidget.style.display = "flex"
      chatWidget.style.flexDirection = "column"
      chatWidget.style.zIndex = "1000"

      chatHeader.style.padding = "15px"
      chatHeader.style.backgroundColor = "var(--primary-color)"
      chatHeader.style.color = "white"
      chatHeader.style.borderTopLeftRadius = "8px"
      chatHeader.style.borderTopRightRadius = "8px"
      chatHeader.style.display = "flex"
      chatHeader.style.justifyContent = "space-between"
      chatHeader.style.alignItems = "center"

      chatBody.style.flex = "1"
      chatBody.style.padding = "15px"
      chatBody.style.overflowY = "auto"

      chatFooter.style.padding = "10px"
      chatFooter.style.borderTop = "1px solid #eee"
      chatFooter.style.display = "flex"
      chatFooter.style.gap = "10px"

      chatFooter.querySelector("input").style.flex = "1"
      chatFooter.querySelector("input").style.padding = "8px"
      chatFooter.querySelector("input").style.border = "1px solid #ddd"
      chatFooter.querySelector("input").style.borderRadius = "4px"

      chatFooter.querySelector("button").style.backgroundColor = "var(--primary-color)"
      chatFooter.querySelector("button").style.color = "white"
      chatFooter.querySelector("button").style.border = "none"
      chatFooter.querySelector("button").style.borderRadius = "4px"
      chatFooter.querySelector("button").style.padding = "8px 12px"
      chatFooter.querySelector("button").style.cursor = "pointer"

      // Close chat functionality
      const closeChat = chatHeader.querySelector(".close-chat")
      closeChat.style.cursor = "pointer"
      closeChat.style.fontSize = "20px"

      closeChat.addEventListener("click", () => {
        document.body.removeChild(chatWidget)
      })

      // Send message functionality
      const sendButton = chatFooter.querySelector("button")
      const messageInput = chatFooter.querySelector("input")

      sendButton.addEventListener("click", () => {
        sendMessage()
      })

      messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage()
        }
      })

      function sendMessage() {
        const message = messageInput.value.trim()

        if (message) {
          // Add user message
          const messagesContainer = chatBody.querySelector(".chat-messages")

          const userMessageDiv = document.createElement("div")
          userMessageDiv.classList.add("message", "user")

          userMessageDiv.innerHTML = `
            <div class="message-content">
              <p>${message}</p>
              <span class="message-time">Just now</span>
            </div>
          `

          messagesContainer.appendChild(userMessageDiv)

          // Clear input
          messageInput.value = ""

          // Scroll to bottom
          chatBody.scrollTop = chatBody.scrollHeight

          // Simulate agent response after a delay
          setTimeout(() => {
            const agentMessageDiv = document.createElement("div")
            agentMessageDiv.classList.add("message", "agent")

            agentMessageDiv.innerHTML = `
              <div class="message-content">
                <p>Thank you for your message. One of our travel consultants will assist you shortly. In the meantime, is there anything specific about your booking that you'd like to know?</p>
                <span class="message-time">Just now</span>
              </div>
            `

            messagesContainer.appendChild(agentMessageDiv)

            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight
          }, 1000)
        }
      }

      // Style messages
      const styleSheet = document.createElement("style")
      styleSheet.textContent = `
        .chat-messages {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .message {
          display: flex;
          max-width: 80%;
        }
        
        .message.user {
          align-self: flex-end;
        }
        
        .message.agent {
          align-self: flex-start;
        }
        
        .message-content {
          padding: 10px;
          border-radius: 8px;
        }
        
        .message.user .message-content {
          background-color: var(--primary-color);
          color: white;
        }
        
        .message.agent .message-content {
          background-color: #f0f0f0;
        }
        
        .message-time {
          display: block;
          font-size: 0.8rem;
          margin-top: 5px;
          opacity: 0.7;
        }
      `

      document.head.appendChild(styleSheet)

      // Focus input
      messageInput.focus()
    })
  }

  // CVV info tooltip
  const cvvInfo = document.querySelector(".cvv-info")

  if (cvvInfo) {
    cvvInfo.addEventListener("mouseover", function () {
      // Create tooltip
      const tooltip = document.createElement("div")
      tooltip.classList.add("cvv-tooltip")
      tooltip.textContent = "The 3-digit security code on the back of your card"

      // Position tooltip
      const rect = this.getBoundingClientRect()
      tooltip.style.position = "absolute"
      tooltip.style.top = `${rect.top - 40}px`
      tooltip.style.left = `${rect.left - 100}px`
      tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
      tooltip.style.color = "white"
      tooltip.style.padding = "5px 10px"
      tooltip.style.borderRadius = "4px"
      tooltip.style.fontSize = "0.8rem"
      tooltip.style.zIndex = "1000"

      document.body.appendChild(tooltip)

      // Remove tooltip on mouseout
      this.addEventListener("mouseout", () => {
        document.body.removeChild(tooltip)
      })
    })
  }

  // Form validation functions
  function validateStep(stepNumber) {
    const currentForm = document.getElementById(`step-${stepNumber + 1}`)

    switch (stepNumber + 1) {
      case 1:
        // Validate Trip Details
        const packageType = document.getElementById("package-type").value
        const startDate = document.getElementById("start-date").value
        const endDate = document.getElementById("end-date").value
        const accommodation = document.getElementById("accommodation").value

        if (!packageType || !startDate || !endDate || !accommodation) {
          alert("Please fill in all required fields")
          return false
        }

        // Validate dates
        const start = new Date(startDate)
        const end = new Date(endDate)
        const today = new Date()

        if (start < today) {
          alert("Start date cannot be in the past")
          return false
        }

        if (end <= start) {
          alert("End date must be after start date")
          return false
        }

        return true

      case 2:
        // Validate Personal Information
        const firstName = document.getElementById("first-name").value
        const lastName = document.getElementById("last-name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const nationality = document.getElementById("nationality").value

        if (!firstName || !lastName || !email || !phone || !nationality) {
          alert("Please fill in all required fields")
          return false
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address")
          return false
        }

        // Validate phone format (simple validation)
        const phoneRegex = /^\+?[0-9\s\-$$$$]{8,20}$/
        if (!phoneRegex.test(phone)) {
          alert("Please enter a valid phone number")
          return false
        }

        return true

      case 3:
        // Validate Payment Information
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value

        if (paymentMethod === "credit-card") {
          const cardName = document.getElementById("card-name").value
          const cardNumber = document.getElementById("card-number").value
          const expiryDate = document.getElementById("expiry-date").value
          const cvv = document.getElementById("cvv").value
          const termsChecked = document.getElementById("terms-payment").checked

          if (!cardName || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all card details")
            return false
          }

          // Validate card number format (simple validation)
          const cardNumberRegex = /^[0-9\s]{13,19}$/
          if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ""))) {
            alert("Please enter a valid card number")
            return false
          }

          // Validate expiry date format (MM/YY)
          const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
          if (!expiryRegex.test(expiryDate)) {
            alert("Please enter a valid expiry date (MM/YY)")
            return false
          }

          // Validate CVV format
          const cvvRegex = /^[0-9]{3,4}$/
          if (!cvvRegex.test(cvv)) {
            alert("Please enter a valid CVV")
            return false
          }

          if (!termsChecked) {
            alert("You must agree to the Terms & Conditions")
            return false
          }
        }

        return true

      default:
        return true
    }
  }

  // Update booking summary
  function updateBookingSummary() {
    // Get values from form
    const packageType = document.getElementById("package-type")
    const startDate = new Date(document.getElementById("start-date").value)
    const endDate = new Date(document.getElementById("end-date").value)
    const adults = document.getElementById("adults").value
    const children = document.getElementById("children").value
    const accommodation = document.getElementById("accommodation")
    const insurance = document.querySelector('input[name="insurance"]:checked').value

    // Format dates
    const options = { year: "numeric", month: "long", day: "numeric" }
    const formattedStartDate = startDate.toLocaleDateString("en-US", options)
    const formattedEndDate = endDate.toLocaleDateString("en-US", options)

    // Update summary elements
    document.getElementById("summary-package").textContent = packageType.options[packageType.selectedIndex].text
    document.getElementById("summary-dates").textContent = `${formattedStartDate} - ${formattedEndDate}`
    document.getElementById("summary-travelers").textContent =
      `${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${children > 1 || children === "0" ? "ren" : ""}`
    document.getElementById("summary-accommodation").textContent =
      accommodation.options[accommodation.selectedIndex].text

    // Calculate package price (simplified)
    let basePrice = 0
    switch (packageType.value) {
      case "cultural":
        basePrice = 899
        break
      case "beach":
        basePrice = 699
        break
      case "adventure":
        basePrice = 1099
        break
      case "family":
        basePrice = 999
        break
      case "honeymoon":
        basePrice = 1299
        break
      case "education":
        basePrice = 1199
        break
      case "custom":
        basePrice = 1499
        break
      default:
        basePrice = 899
    }

    // Calculate total price
    const adultPrice = basePrice * Number.parseInt(adults)
    const childPrice = basePrice * 0.5 * Number.parseInt(children)
    const packagePrice = adultPrice + childPrice

    // Calculate insurance price
    const insurancePrice = insurance === "yes" ? packagePrice * 0.05 : 0

    // Calculate visa assistance price
    const visaAssistance = document.querySelector('input[name="visa"]:checked').value
    const visaPrice = visaAssistance === "yes" ? adults * 50 + children * 25 : 0

    // Update visa price element
    document.getElementById("summary-visa").textContent = `$${visaPrice.toFixed(2)}`

    // Update total with visa price
    document.getElementById("summary-total").textContent = `$${(packagePrice + insurancePrice + visaPrice).toFixed(2)}`

    // Update price elements
    document.getElementById("summary-package-price").textContent = `$${packagePrice.toFixed(2)}`
    document.getElementById("summary-insurance").textContent = `$${insurancePrice.toFixed(2)}`
    document.getElementById("summary-total").textContent = `$${(packagePrice + insurancePrice).toFixed(2)}`
  }

  // Format credit card input
  const cardNumberInput = document.getElementById("card-number")

  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      // Remove non-digit characters
      let value = this.value.replace(/\D/g, "")

      // Add space after every 4 digits
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ")

      // Update input value
      this.value = value
    })
  }

  // Format expiry date input
  const expiryDateInput = document.getElementById("expiry-date")

  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", function (e) {
      // Remove non-digit characters
      let value = this.value.replace(/\D/g, "")

      // Add slash after month
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }

      // Update input value
      this.value = value
    })
  }
})

