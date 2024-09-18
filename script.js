document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        try {
            // Replace 'your-api-endpoint' with your actual API endpoint
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            if (response.ok) {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again later.');
        }
    });

    // Resume download
    const downloadResumeBtn = document.getElementById('download-resume');
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace 'path-to-your-resume.pdf' with the actual path to your resume file
        window.open('kushank resume.pdf', '_blank');
    });

    // Add a simple animation to project items when they come into view
    const projectItems = document.querySelectorAll('.project-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(item);
    });

    // Typing effect for tagline
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
});
