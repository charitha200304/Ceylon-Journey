// Reviews Page JavaScript - Ceylon Journeys

document.addEventListener("DOMContentLoaded", () => {
  // Rating input functionality
  const ratingStars = document.querySelectorAll(".rating-input i")

  if (ratingStars.length > 0) {
    ratingStars.forEach((star) => {
      star.addEventListener("click", function () {
        const rating = Number.parseInt(this.getAttribute("data-rating"))

        // Reset all stars
        ratingStars.forEach((s) => (s.className = "far fa-star"))

        // Fill stars up to selected rating
        ratingStars.forEach((s, index) => {
          if (index < rating) {
            s.className = "fas fa-star active"
          }
        })

        // Store the rating value
        document.querySelector('input[name="rating"]')
          ? (document.querySelector('input[name="rating"]').value = rating)
          : null
      })
    })
  }

  // Review filter functionality
  const filterBtn = document.querySelector(".filter-btn")
  const reviewCards = document.querySelectorAll(".review-card")

  if (filterBtn && reviewCards.length > 0) {
    filterBtn.addEventListener("click", () => {
      const packageType = document.getElementById("package-type").value
      const rating = document.getElementById("rating").value
      const sortBy = document.getElementById("sort-by").value

      // Filter logic would go here
      // This is a simplified example - in a real implementation,
      // you would likely fetch filtered results from a server

      console.log(`Filtering by: Package Type: ${packageType}, Rating: ${rating}, Sort: ${sortBy}`)

      // Show a loading state
      document.querySelector(".reviews-list").style.opacity = "0.5"

      // Simulate loading time
      setTimeout(() => {
        document.querySelector(".reviews-list").style.opacity = "1"

        // Example of filtering (simplified)
        reviewCards.forEach((card) => {
          // In a real implementation, you would check actual data attributes
          card.style.display = "block"
        })

        // Example of showing "no results" if needed
        if (packageType === "none-existing-type") {
          document.querySelector(".reviews-list").innerHTML =
            '<p class="no-results">No reviews match your filter criteria.</p>'
        }
      }, 500)
    })
  }

  // Review form submission
  const reviewForm = document.querySelector(".review-form")

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("review-name").value
      const email = document.getElementById("review-email").value
      const title = document.getElementById("review-title").value
      const content = document.getElementById("review-content").value

      // Validate form (simple validation)
      if (!name || !email || !title || !content) {
        alert("Please fill in all required fields")
        return
      }

      // In a real implementation, you would send this data to a server
      console.log("Review submitted:", { name, email, title, content })

      // Show success message
      reviewForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          <h3>Thank you for your review!</h3>
          <p>Your review has been submitted and will be published after moderation.</p>
        </div>
      `
    })
  }

  // Image preview functionality
  const reviewPhotos = document.querySelectorAll(".review-photo")

  if (reviewPhotos.length > 0) {
    reviewPhotos.forEach((photo) => {
      photo.addEventListener("click", function () {
        // Create modal for image preview
        const modal = document.createElement("div")
        modal.classList.add("image-preview-modal")

        const modalContent = document.createElement("div")
        modalContent.classList.add("modal-content")

        const closeBtn = document.createElement("span")
        closeBtn.classList.add("close-modal")
        closeBtn.innerHTML = "&times;"

        const img = document.createElement("img")
        img.src = this.src

        modalContent.appendChild(closeBtn)
        modalContent.appendChild(img)
        modal.appendChild(modalContent)
        document.body.appendChild(modal)

        // Add modal styles
        modal.style.display = "flex"
        modal.style.position = "fixed"
        modal.style.top = "0"
        modal.style.left = "0"
        modal.style.width = "100%"
        modal.style.height = "100%"
        modal.style.backgroundColor = "rgba(0,0,0,0.9)"
        modal.style.zIndex = "1000"
        modal.style.justifyContent = "center"
        modal.style.alignItems = "center"

        modalContent.style.maxWidth = "90%"
        modalContent.style.maxHeight = "90%"
        modalContent.style.position = "relative"

        img.style.maxWidth = "100%"
        img.style.maxHeight = "90vh"
        img.style.display = "block"

        closeBtn.style.position = "absolute"
        closeBtn.style.top = "-40px"
        closeBtn.style.right = "0"
        closeBtn.style.color = "white"
        closeBtn.style.fontSize = "30px"
        closeBtn.style.cursor = "pointer"

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
    })
  }
})

