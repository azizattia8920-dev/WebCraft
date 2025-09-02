// Import Convex client
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

// Initialize Convex client
const convex = new ConvexHttpClient("https://energized-duck-553.convex.cloud");

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        description: document.getElementById('description').value,
        timestamp: new Date().toISOString(),
        type: 'contact_form'
    };
    
    try {
        // Send data to Convex
        const contactId = await convex.mutation(api.contacts.submitContact, formData);
        console.log('Contact submitted successfully with ID:', contactId);
        
        showSuccessMessage('Thank you! We\'ll call you within 24 hours to discuss your project.');
        
        // Reset form
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        showErrorMessage('Something went wrong. Please try again or contact us directly.');
    }
});

// Zoom call scheduling
window.scheduleZoomCall = function() {
    // Open Google Calendar Appointment Slots directly
    const appointmentUrl = 'https://calendar.app.google/8ZHwFBvrMjCY1zkq8';
    
    // Open in new tab
    window.open(appointmentUrl, '_blank');
    
    // Log the interaction for analytics
    try {
        const zoomData = {
            type: 'zoom_request',
            timestamp: new Date().toISOString(),
            status: 'appointment_slots_opened'
        };
        convex.mutation(api.contacts.submitZoomRequest, zoomData);
    } catch (error) {
        console.log('Analytics logging failed:', error);
    }
}

// Success/Error message functions
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.status-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
    }`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    section {
        opacity: 0;
    }
    
    section.animate-fade-in {
        opacity: 1;
    }
`;
document.head.appendChild(style);