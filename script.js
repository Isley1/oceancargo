// Initialize the database immediately
console.log('Initializing database...');
let initialData = localStorage.getItem('quoteRequests');
console.log('Initial data in localStorage:', initialData);

if (!initialData) {
    localStorage.setItem('quoteRequests', JSON.stringify([]));
    console.log('Database initialized with empty array');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuButton.setAttribute('aria-expanded', 
                mobileMenu.classList.contains('active'));
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !event.target.closest('#mobile-menu') &&
            !event.target.closest('#mobile-menu-button')) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Quote Form Submission Handler
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        console.log('Quote form found');
        
        // Add visual feedback for form
        const submitButton = quoteForm.querySelector('button[type="submit"]');
        submitButton.addEventListener('click', function() {
            console.log('Submit button clicked');
        });

        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submission started');

            // Basic form validation
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    console.log('Validation failed for field:', field.id);
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }

            try {
                // Get existing requests
                let existingRequests = [];
                const stored = localStorage.getItem('quoteRequests');
                console.log('Current stored data:', stored);

                if (stored) {
                    existingRequests = JSON.parse(stored);
                    if (!Array.isArray(existingRequests)) {
                        console.log('Stored data is not an array, resetting to empty array');
                        existingRequests = [];
                    }
                }
                console.log('Current requests:', existingRequests);

                // Create new request
                const formData = {
                    id: Date.now(), // Unique ID based on timestamp
                    date: new Date().toISOString(),
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    company: document.getElementById('company').value || 'N/A',
                    phone: document.getElementById('phone').value,
                    origin: document.getElementById('origin').value,
                    destination: document.getElementById('destination').value,
                    containerType: document.getElementById('container-type').value,
                    cargoType: document.getElementById('cargo-type').value,
                    message: document.getElementById('message').value || '',
                    status: 'New'
                };

                console.log('New form data:', formData);

                // Add new request
                existingRequests.push(formData);
                
                // Save back to localStorage
                const dataToSave = JSON.stringify(existingRequests);
                console.log('Saving data:', dataToSave);
                localStorage.setItem('quoteRequests', dataToSave);

                // Verify the save
                const savedData = localStorage.getItem('quoteRequests');
                console.log('Verified saved data:', savedData);
                console.log('Data saved successfully. Total requests:', existingRequests.length);

                // Show success message
                alert('Quote request submitted successfully! Our team will contact you shortly.');
                
                // Reset form
                quoteForm.reset();

            } catch (error) {
                console.error('Error saving quote request:', error);
                alert('There was an error submitting your request. Please try again.');
            }
        });
    } else {
        console.log('Quote form not found on this page');
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }

                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Handle video loading
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.play().catch(function(error) {
                console.log("Video autoplay failed:", error);
            });
        });
    }

    // Add sticky header behavior
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Review System
    let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];
    const testimonialGrid = document.querySelector('.testimonials-grid');
    const reviewForm = document.getElementById('reviewForm');
    const starRating = document.querySelector('.star-rating');
    const ratingInput = document.getElementById('reviewRating');

    // Handle star rating selection
    starRating.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-star') || e.target.classList.contains('far')) {
            const rating = e.target.dataset.rating;
            ratingInput.value = rating;
            
            // Update star display
            const stars = starRating.querySelectorAll('i');
            stars.forEach(star => {
                const starValue = star.dataset.rating;
                if (starValue <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            });
        }
    });

    // Handle star rating hover effects
    starRating.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('fa-star')) {
            const rating = e.target.dataset.rating;
            const stars = starRating.querySelectorAll('i');
            stars.forEach(star => {
                const starValue = star.dataset.rating;
                if (starValue <= rating) {
                    star.classList.add('hover');
                }
            });
        }
    });

    starRating.addEventListener('mouseout', function() {
        const stars = starRating.querySelectorAll('i');
        stars.forEach(star => star.classList.remove('hover'));
    });

    // Handle form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newReview = {
            name: document.getElementById('reviewName').value,
            company: document.getElementById('reviewCompany').value,
            rating: parseInt(ratingInput.value),
            text: document.getElementById('reviewText').value,
            date: new Date().toISOString()
        };

        // Add new review to array
        reviews.unshift(newReview);
        
        // Save to localStorage
        localStorage.setItem('customerReviews', JSON.stringify(reviews));

        // Add new review to display
        addReviewToDisplay(newReview);

        // Reset form
        reviewForm.reset();
        const stars = starRating.querySelectorAll('i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        ratingInput.value = '';

        // Show success message
        alert('Thank you for your review!');
    });

    // Function to create and add review card
    function addReviewToDisplay(review) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'testimonial-card fade-in';
        
        const ratingHtml = Array(5).fill('').map((_, index) => 
            `<i class="fas fa-star${index < review.rating ? '' : '-half-alt'}"></i>`
        ).join('');

        reviewCard.innerHTML = `
            <div class="testimonial-rating">
                ${ratingHtml}
            </div>
            <p class="testimonial-text">"${review.text}"</p>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random" alt="${review.name}">
                </div>
                <div class="author-info">
                    <p>${review.name}</p>
                    ${review.company ? `<p>${review.company}</p>` : ''}
                </div>
            </div>
        `;

        // Add to beginning of grid
        testimonialGrid.insertBefore(reviewCard, testimonialGrid.firstChild);
    }

    // Display existing reviews on page load
    reviews.forEach(review => addReviewToDisplay(review));

    // Newsletter Subscription Handler
    document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const messageDiv = document.getElementById('newsletter-message');
        const email = emailInput.value;

        // Validate email
        if (!email || !email.includes('@')) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Get existing subscribers
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];

        // Check if email already exists
        if (subscribers.some(sub => sub.email === email)) {
            showMessage('This email is already subscribed!', 'error');
            return;
        }

        // Add new subscriber
        subscribers.push({
            email: email,
            date: new Date().toISOString(),
            status: 'active'
        });

        // Save to localStorage
        localStorage.setItem('subscribers', JSON.stringify(subscribers));

        // Show success message
        showMessage('Thank you for subscribing!', 'success');
        emailInput.value = '';
    });

    function showMessage(message, type) {
        const messageDiv = document.getElementById('newsletter-message');
        messageDiv.textContent = message;
        messageDiv.className = `newsletter-message ${type}`;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'newsletter-message';
        }, 3000);
    }
}); 