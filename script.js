document.addEventListener("DOMContentLoaded", () => {
  // Sample videos data - portrait orientation
  const birthdayVideos = [
    {
      id: 1,
      title: "",
      date: "",
      thumbnail: "pic1.jfif", // Portrait placeholder
      videoUrl: "./vid1.mp4", // Replace with actual video URL
      description: "Ang saya ko dito love kase 1st time na masundo ka sa school mo and makita ka naka uniform ng personal",
    },
    {
      id: 2,
      title: "",
      date: "",
      thumbnail: "pic2.jfif",
      videoUrl: "vid2.mp4",
      description:
        "Birthday mo ito then kumain tayo ng halo halo and ng ihaw. Super kabado ko dito di ko alam paano ko bibigay ang gift sayo",
    },
    {
      id: 3,
      title: "",
      date: "",
      thumbnail: "pic3.jpg",
      videoUrl: "vid3.mp4",
      description:
        "hehe cute mo dito love sobra kaya nilagay ko ang vid nato",
    },
    {
      id: 4,
      title: "",
      date: "",
      thumbnail: "pic4.jfif",
      videoUrl: "vid4.mp4",
      description: "Isa pa to super cute talaga eh huhu",
    },
    {
      id: 5,
      title: "",
      date: "",
      thumbnail: "pic5.jfif",
      videoUrl: "vid5.mp4",
      description: "video pala to huhuh akala ko picture eh pero cute natin dito hehe kilig ako",
    },
    {
      id: 6,
      title: "",
      date: "",
      thumbnail: "pic6.jfif",
      videoUrl: "vid6.mp4",
      description: "ay ito fav outfit eh heheh ganda po sobra",
    },
  ]

  // Get DOM elements
  const videoGrid = document.querySelector(".video-grid")
  const modal = document.getElementById("videoModal")
  const videoPlayer = document.getElementById("videoPlayer")
  const videoTitle = document.getElementById("videoTitle")
  const videoDescription = document.getElementById("videoDescription")
  const closeButton = document.querySelector(".close-button")
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  // Create video items and add to grid
  birthdayVideos.forEach((video) => {
    const videoItem = document.createElement("div")
    videoItem.className = "video-item"
    videoItem.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
      <div class="video-overlay">
        <div class="play-button">
          <div class="play-icon"></div>
        </div>
      </div>
      <div class="video-info">
        <h3>${video.title}</h3>
        <div class="video-date">${video.date}</div>
      </div>
    `

    // Add click event to open modal
    videoItem.addEventListener("click", () => {
      openVideoModal(video)
    })

    videoGrid.appendChild(videoItem)
  })

  // Function to open video modal
  function openVideoModal(video) {
    videoPlayer.src = video.videoUrl
    videoTitle.textContent = video.title
    videoDescription.textContent = video.description
    modal.style.display = "flex"

    // Add active class after a small delay for animation
    setTimeout(() => {
      modal.classList.add("active")
    }, 10)

    // For demonstration purposes - in a real implementation, you would load the actual video
    console.log(`Playing video: ${video.title} from ${video.videoUrl}`)
  }

  // Close modal when clicking the close button
  closeButton.addEventListener("click", () => {
    closeVideoModal()
  })

  // Close modal when clicking outside the content
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeVideoModal()
    }
  })

  // Function to close video modal
  function closeVideoModal() {
    modal.classList.remove("active")

    // Wait for animation to complete before hiding
    setTimeout(() => {
      modal.style.display = "none"
      videoPlayer.pause()
      videoPlayer.src = ""
    }, 300)
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") {
      closeVideoModal()
    }
  })

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active")
    document.body.classList.toggle("menu-open")

    // Toggle menu icon
    const spans = menuToggle.querySelectorAll("span")
    if (mainNav.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active")
        document.body.classList.remove("menu-open")

        // Reset menu icon
        const spans = menuToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  })

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".section-header, .video-grid, .wishes-container")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })

  // Add in-view class style
  const style = document.createElement("style")
  style.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `
  document.head.appendChild(style)
})

