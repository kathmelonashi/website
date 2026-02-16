// Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm.querySelector('.submit-button');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';

        try {
            // Send form data to server
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Success
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
                contactForm.reset();
            } else {
                // Error from server
                formStatus.className = 'form-status error';
                formStatus.textContent = result.error || 'Something went wrong. Please try again or email me directly at katmelonashi@gmail.com';
            }
        } catch (error) {
            // Network or other error
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Unable to send message. Please email me directly at katmelonashi@gmail.com';
            console.error('Error:', error);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});
