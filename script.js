document.addEventListener('DOMContentLoaded', function() {
    // Animation de la barre de navigation
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const navIndicator = document.querySelector('.nav-indicator');
    
    // Gestion du scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Bouton retour en haut
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Menu mobile
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Animation de l'indicateur de navigation
    function updateNavIndicator(el) {
        navIndicator.style.width = `${el.offsetWidth}px`;
        navIndicator.style.left = `${el.offsetLeft}px`;
    }
    
    // Initialiser l'indicateur sur le premier élément actif
    const activeLink = document.querySelector('.nav-links a[href="#accueil"]');
    if (activeLink) {
        updateNavIndicator(activeLink);
    }
    
    // Mettre à jour l'indicateur au survol
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            updateNavIndicator(this);
        });
        
        // Revenir à l'élément actif après le survol
        item.addEventListener('mouseleave', function() {
            const activeNav = document.querySelector('.nav-links a.active');
            if (activeNav) {
                updateNavIndicator(activeNav);
            }
        });
    });
    
    // Mettre à jour l'indicateur lors du clic
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            updateNavIndicator(this);
        });
    });
    
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Observer pour déclencher l'animation lorsque la section est visible
    const aboutSection = document.querySelector('#apropos');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Animation au défilement
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .info-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
            // Par exemple, avec fetch() vers un serveur ou un service comme Formspree
            
            // Animation de succès
            this.reset();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Message envoyé !';
            submitButton.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = 'var(--primary-color)';
            }, 3000);
        });
    }
    
    // Gestion du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            const originalHtml = button.innerHTML;
            
            input.value = '';
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalHtml;
                button.style.backgroundColor = 'var(--primary-color)';
            }, 3000);
        });
    }
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation du titre hero
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach(word => {
        word.style.display = 'inline-block';
    });
    
    // Animation des éléments hero
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-text, .hero-buttons');
    heroElements.forEach(el => {
        el.style.opacity = '0';
    });
});

// Initialisation des animations après le chargement complet de la page
window.addEventListener('load', function() {
    // Animation des éléments hero
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-text, .hero-buttons');
    heroElements.forEach(el => {
        el.style.animation = 'fadeIn 1s forwards';
    });
    
    // Délais d'animation pour les mots du titre
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        word.style.animation = `slideUp 0.5s forwards ${index * 0.2 + 0.3}s`;
    });
});

function logAndSend(action) {
    const data = {
      time: new Date().toLocaleString(),
      action: action,
      userAgent: navigator.userAgent
    };
  
    fetch("logger.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.text()).then(console.log);
  }
  
  // Vérifie si l'utilisateur a donné son consentement
  function startLoggingIfConsented() {
    if (localStorage.getItem("userConsent") === "true") {
      enableLogging();
    } else {
      document.getElementById("cookie-consent-banner").style.display = "block";
    }
  }
  
  // Quand l'utilisateur accepte
  document.getElementById("accept-consent").addEventListener("click", () => {
    localStorage.setItem("userConsent", "true");
    document.getElementById("cookie-consent-banner").style.display = "none";
    enableLogging();
  });
  
  // Active la capture des interactions
  function enableLogging() {
    document.addEventListener('click', (e) => {
      logAndSend(`Clic à la position (${e.clientX}, ${e.clientY})`);
    });
  
    document.addEventListener('mousemove', (e) => {
      logAndSend(`Souris à (${e.clientX}, ${e.clientY})`);
    });
  
    window.addEventListener('scroll', () => {
      logAndSend(`Scroll vertical : ${window.scrollY}px`);
    });
  }
  
  // Lancement
  startLoggingIfConsented();