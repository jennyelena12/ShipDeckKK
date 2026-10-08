document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Update URL without scrolling
        history.pushState(null, null, `#${targetId}`)
      }
    })
  })

  // Stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Intersection Observer for stats
  const observerOptions = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((stat) => {
    observer.observe(stat)
  })

  // Form validation
  const subscribeForm = document.getElementById("subscribeForm")
  const fullNameInput = document.getElementById("fullName")
  const emailInput = document.getElementById("email")
  const phoneInput = document.getElementById("phone")
  const interestSelect = document.getElementById("interest")
  const passwordInput = document.getElementById("password")
  const submitBtn = document.getElementById("submitBtn")
  const successMessage = document.getElementById("successMessage")

  // Error message elements
  const fullNameError = document.getElementById("fullNameError")
  const emailError = document.getElementById("emailError")
  const phoneError = document.getElementById("phoneError")
  const interestError = document.getElementById("interestError")
  const passwordError = document.getElementById("passwordError")

  // Validation functions 
  function validateFullName(value) {
    if (value.length < 3) {
      return "Full name must be at least 3 characters"
    }
    return ""
  }

  function validateEmail(value) {
    // Email validation
    if (!value.includes("@")) {
      return "Email must contain @ symbol"
    }

    const parts = value.split("@")
    if (parts.length !== 2) {
      return "Please enter a valid email address"
    }

    const [localPart, domainPart] = parts

    if (localPart.length === 0) {
      return "Email username cannot be empty"
    }

    if (!domainPart.includes(".")) {
      return "Email domain must contain a dot"
    }

    const domainParts = domainPart.split(".")
    if (domainParts[domainParts.length - 1].length === 0) {
      return "Email domain extension cannot be empty"
    }

    return ""
  }

  function validatePhone(value) {
    // Remove any non-digit characters 
    let digitsOnly = ""
    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i)
      if (char >= "0" && char <= "9") {
        digitsOnly += char
      }
    }

    if (digitsOnly.length < 10) {
      return "Phone number must be at least 10 digits"
    }
    return ""
  }

  function validateInterest(value) {
    if (!value) {
      return "Please select an interest"
    }
    return ""
  }

  function validatePassword(value) {
    const errors = []

    if (value.length < 8) {
      errors.push("Password must be at least 8 characters")
    }


    let hasUppercase = false
    let hasLowercase = false
    let hasNumber = false
    let hasSpecial = false

    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i)
      const code = value.charCodeAt(i)

      // Uppercase: A-Z (65-90)
      if (code >= 65 && code <= 90) {
        hasUppercase = true
      }
      // Lowercase: a-z (97-122)
      else if (code >= 97 && code <= 122) {
        hasLowercase = true
      }
      // Numbers: 0-9 (48-57)
      else if (code >= 48 && code <= 57) {
        hasNumber = true
      }
      // Special characters (anything else)
      else {
        hasSpecial = true
      }
    }

    if (!hasUppercase) {
      errors.push("Password must contain at least one uppercase letter")
    }

    if (!hasLowercase) {
      errors.push("Password must contain at least one lowercase letter")
    }

    if (!hasNumber) {
      errors.push("Password must contain at least one number")
    }

    if (!hasSpecial) {
      errors.push("Password must contain at least one special character")
    }

    return errors.length > 0 ? errors[0] : ""
  }


  fullNameInput.addEventListener("blur", function () {
    const error = validateFullName(this.value)
    fullNameError.textContent = error
  })

  emailInput.addEventListener("blur", function () {
    const error = validateEmail(this.value)
    emailError.textContent = error
  })

  phoneInput.addEventListener("blur", function () {
    const error = validatePhone(this.value)
    phoneError.textContent = error
  })

  interestSelect.addEventListener("blur", function () {
    const error = validateInterest(this.value)
    interestError.textContent = error
  })

  passwordInput.addEventListener("blur", function () {
    const error = validatePassword(this.value)
    passwordError.textContent = error
  })


  fullNameInput.addEventListener("input", () => {
    fullNameError.textContent = ""
  })

  emailInput.addEventListener("input", () => {
    emailError.textContent = ""
  })

  phoneInput.addEventListener("input", () => {
    phoneError.textContent = ""
  })

  interestSelect.addEventListener("input", () => {
    interestError.textContent = ""
  })

  passwordInput.addEventListener("input", () => {
    passwordError.textContent = ""
  })

  // Form submission
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate all fields
    const fullNameError = validateFullName(fullNameInput.value)
    const emailError = validateEmail(emailInput.value)
    const phoneError = validatePhone(phoneInput.value)
    const interestError = validateInterest(interestSelect.value)
    const passwordError = validatePassword(passwordInput.value)

    document.getElementById("fullNameError").textContent = fullNameError
    document.getElementById("emailError").textContent = emailError
    document.getElementById("phoneError").textContent = phoneError
    document.getElementById("interestError").textContent = interestError
    document.getElementById("passwordError").textContent = passwordError

    // Check if there are any errors
    if (!fullNameError && !emailError && !phoneError && !interestError && !passwordError) {
      submitBtn.disabled = true
      submitBtn.textContent = "Subscribing..."

      setTimeout(() => {
        subscribeForm.style.display = "none"
        successMessage.classList.remove("hidden")

        setTimeout(() => {
          subscribeForm.reset()
          subscribeForm.style.display = "grid"
          successMessage.classList.add("hidden")
          submitBtn.disabled = false
          submitBtn.textContent = "Subscribe"
        }, 3000)
      }, 1500)
    }
  })
})
