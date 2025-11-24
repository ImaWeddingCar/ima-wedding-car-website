document.addEventListener("DOMContentLoaded", function() {
            const header = document.getElementById('main-header');
            
            // Function to add/remove a class on scroll
            window.onscroll = function() {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.boxShadow = 'none';
                }
            };

            // Basic Form Submission Alert (since this is a static site)
            const quoteForm = document.querySelector('.quote-form');
            if (quoteForm) {
                quoteForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert("Thank you for your inquiry! We will contact you shortly with your personalized quote.");
                    // In a real site, you would use a backend service (like FormSubmit or Netlify Forms) here
                    quoteForm.reset(); 
                });
            }
        });

        
    document.addEventListener("DOMContentLoaded", function() {
        // 1. Get all elements you want to animate on scroll
        const animatedBlocks = document.querySelectorAll('.animate-block');
        
        // Check if the Intersection Observer API is supported by the browser
        if ('IntersectionObserver' in window) {
            
            // 2. Define Observer Options
            // rootMargin: '0px 0px -100px 0px' means the animation triggers when the element is 100px from the bottom of the viewport.
            const options = {
                root: null, // relative to the viewport
                rootMargin: '0px 0px -100px 0px', 
                threshold: 0.1 // Triggers when 10% of the element is visible
            };

            // 3. Define the Callback function
            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element has entered the viewport (is visible)
                        entry.target.classList.add('is-visible');
                        // Stop observing once the animation has been triggered
                        observer.unobserve(entry.target); 
                    }
                });
            };

            // 4. Create and Start the Observer
            const observer = new IntersectionObserver(observerCallback, options);

            // Apply the observer to all elements with the class '.animate-block'
            animatedBlocks.forEach(block => {
                observer.observe(block);
            });
            
        } else {
            // Fallback for older browsers (optional: just make the elements visible immediately)
            animatedBlocks.forEach(block => {
                block.classList.add('is-visible');
            });
        }
    });

    
    document.addEventListener("DOMContentLoaded", function() {
        // 1. Get all elements with the animation class
        const animatedHeadings = document.querySelectorAll('h3.animate-text');
        
        if ('IntersectionObserver' in window) {
            
            // 2. Observer Options: Trigger when 50px from the viewport edge
            const options = {
                root: null, 
                rootMargin: '0px 0px -50px 0px', // Triggers slightly before reaching the bottom edge
                threshold: 0.1 
            };

            // 3. Callback function to add the 'is-visible' class
            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element is visible, start the animation
                        entry.target.classList.add('is-visible');
                        // Stop observing this element once it's animated
                        observer.unobserve(entry.target); 
                    }
                });
            };

            // 4. Create and Start the Observer
            const observer = new IntersectionObserver(observerCallback, options);

            animatedHeadings.forEach(heading => {
                observer.observe(heading);
            });
            
        } else {
            // Fallback: If Intersection Observer isn't supported, just show the headings
            animatedHeadings.forEach(heading => {
                heading.classList.add('is-visible');
            });
        }
    });


    document.addEventListener('DOMContentLoaded', function() {
        // --- 1. Decoration Toggle Functionality ---
        const decoButtons = document.querySelectorAll('.deco-btn');
        const hiddenInput = document.getElementById('decorationType');

        decoButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove 'active' class from all buttons
                decoButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add 'active' class to the clicked button
                this.classList.add('active');
                
                // Update the value of the hidden input field that gets sent in the email
                hiddenInput.value = this.dataset.value;
            });
        });
        
        // --- 2. Form Submission Feedback (Optional but Recommended) ---
        const form = document.getElementById('bookingForm');
        
        form.addEventListener('submit', function(e) {
            // Check if the FormSubmit action is correctly set
            if (this.action.includes('formsubmit.co')) {
                // If using FormSubmit, let the form submit normally.
                // FormSubmit will redirect to a Thank You page or display a success message.
            } else {
                 // If the action is NOT set, prevent submission and show alert.
                 e.preventDefault();
                 alert("Thank you for your detailed request! We will contact you shortly with your personalized quote.");
                 form.reset(); 
            }
        });
    });

   

 document.addEventListener('DOMContentLoaded', function() {
        // ... (Your existing JS code for other functionality) ...

        // --- New Function to Generate Time Slots ---
        function generateTimeSlots(selectId) {
            const selectElement = document.getElementById(selectId);
            if (!selectElement) return;

            // Start at 12:00 AM (midnight)
            let hour = 0;
            let minute = 0;

            // Loop 96 times (24 hours * 4 slots/hour)
            for (let i = 0; i < 96; i++) {
                
                // Determine AM/PM
                const suffix = (hour < 12) ? 'AM' : 'PM';
                
                // Convert 24-hour format (0-23) to 12-hour format (1-12)
                const displayHour = (hour === 0) ? 12 : (hour > 12) ? hour - 12 : hour;
                
                // Format minute (add leading zero if needed)
                const formattedMinute = minute.toString().padStart(2, '0');
                
                // Format hour (add leading zero to 24-hour value for the 'value' attribute)
                const formattedHour24 = hour.toString().padStart(2, '0');

                // Create the display text (e.g., 01:15 PM)
                const displayText = `${displayHour}:${formattedMinute} ${suffix}`;
                
                // Create the internal value (e.g., 13:15)
                const internalValue = `${formattedHour24}:${formattedMinute}`;

                // Create the new option element
                const option = document.createElement('option');
                option.value = internalValue;
                option.textContent = displayText;

                selectElement.appendChild(option);

                // Increment time by 15 minutes
                minute += 15;
                if (minute >= 60) {
                    minute = 0;
                    hour++;
                    if (hour >= 24) {
                        hour = 0; // Reset after 23:45
                    }
                }
            }
        }
        
        // Call the function to populate the start time dropdown
        generateTimeSlots('startTimeSelect');
        generateTimeSlots('endTimeSelect');
         
        // If you need the end-time dropdown to also have these slots, call it again:
        // generateTimeSlots('endTimeSelect'); 
    });


    
    document.addEventListener('DOMContentLoaded', function() {
        // ... (Keep all your existing JS code for other functionalities like time slots, form, etc.) ...

        // --- Carousel Functionality ---
        const carouselInner = document.querySelector('.showcase-carousel-inner');
        const slides = document.querySelectorAll('.showcase-slide');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        let currentIndex = 0; // Start at the first slide
        const totalSlides = slides.length;

        // Function to show a specific slide
        function showSlide(index) {
            // Calculate the transform needed to show the correct slide
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active class for potential future styling or indicators
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        // Event listener for the 'Next' arrow
        nextArrow.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalSlides; // Cycle to the next slide
            showSlide(currentIndex);
        });

        // Event listener for the 'Previous' arrow
        prevArrow.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Cycle to the previous slide
            showSlide(currentIndex);
        });

        // Initialize carousel to show the first slide
        showSlide(currentIndex);
    });



    document.addEventListener('DOMContentLoaded', function() {
        // ... (Your existing JS code) ...

        // --- New Menu Toggle Logic ---
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar-main');

        if (menuToggle && navbar) {
            menuToggle.addEventListener('click', function() {
                // Toggle the 'open' class on the navigation element
                navbar.classList.toggle('open');
                
                // Update ARIA attributes for accessibility
                const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
                this.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Optional: Close menu when a link is clicked (common mobile UX)
            const navLinks = navbar.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbar.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
        
        // ... (The rest of your existing JS code) ...
    });

    
    document.addEventListener("DOMContentLoaded", function() {
        // ... (Keep all your existing JS code) ...

        // --- Intersection Observer for Block Animation ---
        const animatedBlocks = document.querySelectorAll('.animate-block');
        
        if ('IntersectionObserver' in window) {
            
            const options = {
                root: null, // relative to the viewport
                rootMargin: '0px 0px -100px 0px', // Triggers when 100px from viewport bottom
                threshold: 0.1 
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // When visible, add the trigger class
                        entry.target.classList.add('is-visible');
                        // Stop observing the element
                        observer.unobserve(entry.target); 
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, options);

            animatedBlocks.forEach(block => {
                observer.observe(block);
            });
            
        } else {
            // Fallback: Just make the elements visible immediately
            animatedBlocks.forEach(block => {
                block.classList.add('is-visible');
            });
        }
    });


 
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('advancedContactForm');
        const statusMessage = document.getElementById('form-status');

        if (form) {
            form.addEventListener('submit', function(e) {
                
                // Simple front-end validation check
                if (!form.checkValidity()) {
                    // Browser will show default error messages
                    return; 
                }

                // If using FormSubmit, we handle the redirection logic.
                // You can modify this to use AJAX for a more seamless experience 
                // if you set up a custom backend endpoint.
                if (this.action.includes('formsubmit.co')) {
                    // Let the form submit, but show a loading status first
                    
                    statusMessage.classList.remove('error', 'success');
                    statusMessage.textContent = 'Sending message... Please wait.';
                    statusMessage.style.display = 'block';
                    
                    // You MUST check FormSubmit's documentation for the actual success URL 
                    // or implement a full AJAX submit to prevent redirection.
                    
                    // For now, we will use a simulated AJAX submission for advanced feel:
                    e.preventDefault(); 
                    
                    // Simulate API call delay
                    setTimeout(() => {
                        form.reset();
                        statusMessage.classList.add('success');
                        statusMessage.textContent = '✅ Thank you! Your message has been sent. We will reply within 24 hours.';
                        statusMessage.style.display = 'block';
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            statusMessage.style.display = 'none';
                        }, 5000);
                        
                    }, 2000); // 2-second delay simulation
                }
            });
        }
    });
   

    document.addEventListener('DOMContentLoaded', function() {
        // ... (Your existing code) ...

        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar-main');
        
        if (navbar) {
            // We only need to check clicks inside the navbar itself
            navbar.addEventListener('click', function(event) {
                // Check if the clicked element (or one of its parents) is an anchor tag
                // If it is an anchor, and the menu is open, close it.
                if (event.target.closest('a')) {
                    if (navbar.classList.contains('open')) {
                        navbar.classList.remove('open');
                        
                        if (menuToggle) {
                             menuToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });
        }
        
        // ... (Keep the toggle button logic as well) ...
    });
