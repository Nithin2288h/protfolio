document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================================================
    // TYPEWRITER ANIMATION
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Web Developer",
        "UI/UX Designer",
        "Problem Solver",
        "Responsive Specialist"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing pace
        }

        // Word completed typing
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        }
        // Word completed deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typewriter loop if element exists
    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // STICKY HEADER & SCROLL BEHAVIORS
    // ==========================================================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('menu-open');
            // Toggle body scroll when menu is open
            if (header.classList.contains('menu-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('menu-open')) {
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        });
    });

    // ==========================================================================
    // INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
    // ==========================================================================
    const sections = document.querySelectorAll('section');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-50% 0px -50% 0px' // Trigger when section occupies center of viewport
    });

    sections.forEach(section => {
        activeNavObserver.observe(section);
    });

    // ==========================================================================
    // SCROLL-REVEAL ANIMATIONS
    // ==========================================================================
    // Add CSS reveal classes dynamically to key elements
    const elementsToReveal = [
        ...document.querySelectorAll('.stat-box'),
        ...document.querySelectorAll('.skill-pill'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.about-card'),
        ...document.querySelectorAll('.contact-card')
    ].filter(el => el !== null); // Filter out any missing elements

    // Set initial reveal styles class
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-element');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add minor stagger delay for elements intersecting together
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================================================
    // CONTACT FORM VALIDATION & HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'name-error');
                isValid = false;
            } else {
                hideError(nameInput, 'name-error');
            }

            // Email validation
            if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
                showError(emailInput, 'email-error');
                isValid = false;
            } else {
                hideError(emailInput, 'email-error');
            }

            // Message validation
            if (!messageInput.value.trim()) {
                showError(messageInput, 'message-error');
                isValid = false;
            } else {
                hideError(messageInput, 'message-error');
            }

            if (isValid) {
                const submitBtn = document.getElementById('submit-form-btn');
                const errorAlert = document.getElementById('form-error');

                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span><i data-lucide="loader" class="animate-spin"></i>';
                lucide.createIcons();

                // Hide any previous alert banners
                successAlert.style.display = 'none';
                if (errorAlert) {
                    errorAlert.style.display = 'none';
                }

                // Honeypot spam check
                const honeyInput = contactForm.querySelector('input[name="_honey"]');
                if (honeyInput && honeyInput.value.trim() !== '') {
                    // Fail silently to deceive spam bots
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
                    lucide.createIcons();
                    successAlert.style.display = 'flex';
                    return;
                }

                // --- WEB3FORMS CONFIG ---
                // Enter your Web3Forms Access Key here. Get one for free at https://web3forms.com
                const WEB3FORMS_ACCESS_KEY = "ba4540a4-7502-41c3-b832-0c1d864eafee";

                if (WEB3FORMS_ACCESS_KEY === "" || WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
                    lucide.createIcons();

                    if (errorAlert) {
                        const span = errorAlert.querySelector('span');
                        if (span) {
                            span.textContent = 'Please configure your Web3Forms Access Key in script.js first.';
                        }
                        errorAlert.style.display = 'flex';
                    } else {
                        alert('Please configure your Web3Forms Access Key in script.js first.');
                    }
                    return;
                }

                const payload = {
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                    subject: `New Message from ${nameInput.value}`
                };

                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(async response => {
                        const data = await response.json().catch(() => null);
                        if (response.ok) {
                            return data;
                        }
                        const errorMsg = data && data.message ? data.message : 'Network response was not ok';
                        throw new Error(errorMsg);
                    })
                    .then(data => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
                        lucide.createIcons();

                        // Show success banner
                        successAlert.style.display = 'flex';

                        // Reset labels positioning by forcing placeholder check
                        document.querySelectorAll('.form-input').forEach(input => {
                            input.dispatchEvent(new Event('input'));
                        });

                        // Hide success banner after 5 seconds
                        setTimeout(() => {
                            successAlert.style.display = 'none';
                        }, 5000);
                    })
                    .catch(error => {
                        console.error('Error during form submission:', error);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
                        lucide.createIcons();

                        // Show error banner
                        if (errorAlert) {
                            const span = errorAlert.querySelector('span');
                            if (span) {
                                if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
                                    span.textContent = 'Connection blocked. Please check your network or disable ad blockers.';
                                } else {
                                    span.textContent = error.message;
                                }
                            }
                            errorAlert.style.display = 'flex';
                            // Hide error banner after 10 seconds
                            setTimeout(() => {
                                errorAlert.style.display = 'none';
                                if (span) {
                                    span.textContent = 'Something went wrong. Please try again or email directly.';
                                }
                            }, 10000);
                        } else {
                            alert(error.message || 'Something went wrong. Please try again.');
                        }
                    });
            }
        });

        // Add change listeners to clear error messages while typing
        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const group = input.parentElement;
                if (group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });
        });
    }

    function showError(input, errorId) {
        const group = input.parentElement;
        group.classList.add('invalid');
    }

    function hideError(input, errorId) {
        const group = input.parentElement;
        group.classList.remove('invalid');
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
