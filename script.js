// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeShowroomsMap();
});

// Navigation functionality
function initializeNavigation() {
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    
                    // Reset hamburger animation
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Header background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroImage && scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Animations on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('products-grid') ||
                    entry.target.parentElement.classList.contains('advantages-grid') ||
                    entry.target.parentElement.classList.contains('bestsellers-grid')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-category, .advantage-item, .product-card, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form functionality (if needed in the future)
function initializeContactForm() {
    // This can be expanded when a contact form is added
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Statistics counter animation
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 50);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Product category hover effects
const productCategories = document.querySelectorAll('.product-category');
productCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.querySelector('.category-image img').style.transform = 'scale(1.1)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.querySelector('.category-image img').style.transform = 'scale(1)';
    });
});

// Smooth reveal animation for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Utility function for smooth animations
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 1rem 0;
    }
    
    .nav-menu a {
        font-size: 1.2rem;
        padding: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}

.loaded {
    opacity: 1;
}

.revealed {
    animation: slideInUp 0.8s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Add the mobile styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // This would integrate with analytics services like Google Analytics
    console.log(`Clicked: ${action} on ${element}`);
}

// Track important clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .category-link, .product-link').forEach(element => {
    element.addEventListener('click', function() {
        trackClick(this.tagName, this.textContent.trim());
    });
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #c0392b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Lazy loading for images (basic implementation)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Initialize SOTUFAB Showrooms Map
function initializeShowroomsMap() {
    const mapContainer = document.getElementById('sotufab-map');
    if (!mapContainer) return;

    // Initialize map centered on Tunisia
    const map = L.map('sotufab-map').setView([36.8065, 10.1815], 8);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // SOTUFAB Showrooms data
    const showrooms = [
        {
            name: 'Showroom LA SOUKRA',
            address: 'Rue du métal, zone industrielle - La Soukra',
            phone: '(+216) 70 747 260 / (+216) 27 296 000',
            email: 'distribution.soukra@sotufab.tn',
            hours: 'Lundi - Dimanche : 09h à 20h',
            lat: 36.8421,
            lng: 10.2267
        },
        {
            name: 'Showroom SOUSSE - SAHLOUL',
            address: 'Route Ceinture Sahloul, Kalaa Sguira',
            phone: '(+216) 73 814 544 / (+216) 27 255 455',
            email: 'distribution.sahloul@sotufab.tn',
            hours: 'Lundi - Dimanche : 09h à 20h',
            lat: 35.8276,
            lng: 10.6400
        },
        {
            name: 'Showroom L\'AOUINA',
            address: 'Avenue de l\'environnement, Dar Fadhal - La Soukra',
            phone: '(+216) 71 868 462 / (+216) 29 434 508',
            email: 'distribution.aouina@sotufab.tn',
            hours: 'Lundi - Dimanche : 09h à 20h',
            lat: 36.8580,
            lng: 10.2050
        },
        {
            name: 'Showroom NABEUL',
            address: 'Avenue Habib Bourguiba - 8000 Nabeul',
            phone: '(+216) 72 233 695 / (+216) 29 734 493 / (+216) 36 251 297',
            email: 'distribution.nabeul@sotufab.tn',
            hours: 'Lundi - Dimanche : 09h à 20h',
            lat: 36.4561,
            lng: 10.7376
        }
    ];

    // Add markers for each showroom
    showrooms.forEach(showroom => {
        const marker = L.marker([showroom.lat, showroom.lng]).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div style="font-family: 'Poppins', sans-serif; max-width: 250px;">
                <h4 style="color: #8B4513; margin: 0 0 10px 0; font-size: 16px;">${showroom.name}</h4>
                <p style="margin: 5px 0; font-size: 14px;"><strong>📍 Adresse:</strong><br>${showroom.address}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>📞 Téléphone:</strong><br>${showroom.phone}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>📧 Email:</strong><br><a href="mailto:${showroom.email}" style="color: #8B4513;">${showroom.email}</a></p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>🕒 Horaires:</strong><br>${showroom.hours}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });

    // Fit map to show all markers
    const group = new L.featureGroup(showrooms.map(s => L.marker([s.lat, s.lng])));
    map.fitBounds(group.getBounds().pad(0.1));
}
