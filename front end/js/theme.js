// // Theme Switcher JavaScript - Ceylon Journeys
//
// document.addEventListener("DOMContentLoaded", () => {
//   // Check for saved theme preference or use device preference
//   const savedTheme = localStorage.getItem("theme")
//   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//
//   // Set initial theme based on saved preference or device preference
//   if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
//     document.body.classList.add("dark")
//     updateThemeIcons(true)
//   } else {
//     document.body.classList.remove("dark")
//     updateThemeIcons(false)
//   }
//
//   // Theme toggle functionality
//   const themeToggle = document.querySelector(".theme-toggle")
//   if (themeToggle) {
//     themeToggle.addEventListener("click", () => {
//       // Toggle dark class on body
//       document.body.classList.toggle("dark")
//
//       // Determine if dark mode is now active
//       const isDarkMode = document.body.classList.contains("dark")
//
//       // Update icons
//       updateThemeIcons(isDarkMode)
//
//       // Save preference to localStorage
//       localStorage.setItem("theme", isDarkMode ? "dark" : "light")
//     })
//   }
//
//   // Function to update theme icons
//   function updateThemeIcons(isDarkMode) {
//     const sunIcon = document.querySelector(".theme-toggle-icon.sun")
//     const moonIcon = document.querySelector(".theme-toggle-icon.moon")
//
//     if (sunIcon && moonIcon) {
//       if (isDarkMode) {
//         sunIcon.style.display = "block"
//         moonIcon.style.display = "none"
//       } else {
//         sunIcon.style.display = "none"
//         moonIcon.style.display = "block"
//       }
//     }
//   }
//
//   // Listen for changes in device color scheme preference
//   window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
//     // Only auto-switch if user hasn't manually set a preference
//     if (!localStorage.getItem("theme")) {
//       if (e.matches) {
//         document.body.classList.add("dark")
//         updateThemeIcons(true)
//       } else {
//         document.body.classList.remove("dark")
//         updateThemeIcons(false)
//       }
//     }
//   })
// })
//
