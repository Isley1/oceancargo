const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Form submission handling
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your quote request! Our team will contact you within 24 hours.');
        quoteForm.reset();
    });
}

// Tracking form submission
const trackingForm = document.querySelector('#tracking');
if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById('tracking-number').value;
        if (trackingNumber) {
            alert(`Tracking information for ${trackingNumber} would be displayed here.`);
        } else {
            alert('Please enter a valid tracking number.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});