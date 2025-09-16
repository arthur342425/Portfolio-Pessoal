// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navigation active state
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animated")
    }
  })
}

// Skills progress animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    const barTop = bar.getBoundingClientRect().top

    if (barTop < window.innerHeight - 100 && !bar.classList.contains("animated")) {
      bar.style.width = progress + "%"
      bar.classList.add("animated")
    }
  })
}

// Parallax effect for hero background
function parallaxEffect() {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".dots-pattern")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
}

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

const contactForm = document.querySelector("#contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    const button = this.querySelector(".form-button")
    const originalText = button.innerHTML

    // Validate form
    if (!name || !email || !message) {
      button.innerHTML = "<span>Preencha todos os campos!</span>"
      button.style.background = "#ff4757"

      setTimeout(() => {
        button.innerHTML = originalText
        button.style.background = ""
      }, 2000)
      return
    }

    // Show loading state
    button.innerHTML = "<span>Enviando...</span>"
    button.disabled = true

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      button.innerHTML = "<span>Mensagem Enviada!</span> ✓"
      button.style.background = "#00ff88"

      setTimeout(() => {
        button.innerHTML = originalText
        button.disabled = false
        button.style.background = ""
        this.reset()
      }, 2000)
    }, 1500)
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements
  const animateElements = document.querySelectorAll(".timeline-item, .skill-category, .stat-item, .contact-link")
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })

  // Initialize typing animation for hero
  const heroName = document.querySelector(".name-first")
  if (heroName) {
    const originalText = heroName.textContent
    setTimeout(() => {
      typeWriter(heroName, originalText, 150)
    }, 1000)
  }

  const photoPlaceholders = document.querySelectorAll(".photo-frame, .photo-frame-about, .photo-frame-contact")
  photoPlaceholders.forEach((placeholder) => {
    placeholder.addEventListener("click", () => {
      // Simula upload de foto
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            placeholder.style.backgroundImage = `url(${e.target.result})`
            placeholder.style.backgroundSize = "cover"
            placeholder.style.backgroundPosition = "center"
            placeholder.innerHTML = ""
          }
          reader.readAsDataURL(file)
        }
      }
      input.click()
    })

    placeholder.addEventListener("mouseenter", () => {
      placeholder.style.cursor = "pointer"
      const text = placeholder.querySelector(".photo-text")
      if (text) {
        text.textContent = "Clique para adicionar foto"
      }
    })

    placeholder.addEventListener("mouseleave", () => {
      const text = placeholder.querySelector(".photo-text")
      if (text && !placeholder.style.backgroundImage) {
        if (placeholder.classList.contains("photo-frame")) {
          text.textContent = "Sua Foto Aqui"
        } else if (placeholder.classList.contains("photo-frame-about")) {
          text.textContent = "Foto Pessoal"
        } else if (placeholder.classList.contains("photo-frame-contact")) {
          text.textContent = "Foto de Contato"
        }
      }
    })
  })
})

// Event listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink()
  animateOnScroll()
  animateSkillBars()
  parallaxEffect()
})

// Smooth reveal animation for sections
const revealSections = () => {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (sectionTop < windowHeight * 0.8) {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }
  })
}

// Initialize sections with hidden state
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "all 0.8s ease-out"
  })

  // Show first section immediately
  const firstSection = document.querySelector("#home")
  if (firstSection) {
    firstSection.style.opacity = "1"
    firstSection.style.transform = "translateY(0)"
  }

  revealSections()
})

window.addEventListener("scroll", revealSections)

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Tech tags hover effect
  const techTags = document.querySelectorAll(".tech-tag")
  techTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "translateY(-3px) scale(1.05)"
    })

    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "translateY(0) scale(1)"
    })
  })

  // Timeline items hover effect
  const timelineItems = document.querySelectorAll(".timeline-content")
  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(10px)"
      item.style.borderColor = "var(--accent-primary)"
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0)"
      item.style.borderColor = "var(--border-color)"
    })
  })

  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const percentage = item.querySelector(".skill-percentage")
      const progress = item.querySelector(".skill-progress")
      if (percentage && progress) {
        percentage.style.transform = "scale(1.1)"
        percentage.style.color = "var(--accent-secondary)"
        progress.style.boxShadow = "0 0 10px rgba(255, 107, 157, 0.5)"
      }
    })

    item.addEventListener("mouseleave", () => {
      const percentage = item.querySelector(".skill-percentage")
      const progress = item.querySelector(".skill-progress")
      if (percentage && progress) {
        percentage.style.transform = "scale(1)"
        percentage.style.color = "var(--accent-primary)"
        progress.style.boxShadow = "none"
      }
    })
  })
})

// Cursor trail effect (optional enhancement)
let mouseX = 0
let mouseY = 0
const trail = []

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function createTrail() {
  trail.push({ x: mouseX, y: mouseY })

  if (trail.length > 20) {
    trail.shift()
  }

  requestAnimationFrame(createTrail)
}

// Initialize trail effect on desktop only
if (window.innerWidth > 768) {
  createTrail()
}
