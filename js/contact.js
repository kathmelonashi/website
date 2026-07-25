// Contact Form Handler
// Delivers via FormSubmit (https://formsubmit.co) — works on static hosting,
// no backend needed. Emails go to the address in FORM_ENDPOINT.

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm.querySelector('.submit-button');

    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/katmelonashi@gmail.com';

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            _subject: 'KATHCERAMICS WEBSITE MESSAGE',
            _template: 'table',
            _captcha: 'false'
        };

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success !== 'false') {
                // Success
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
                contactForm.reset();
            } else {
                // Error from FormSubmit
                formStatus.className = 'form-status error';
                formStatus.textContent = result.message || 'Something went wrong. Please try again or message me on Instagram @kathceramics';
            }
        } catch (error) {
            // Network or other error
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Unable to send message. Please message me on Instagram @kathceramics';
            console.error('Error:', error);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});
