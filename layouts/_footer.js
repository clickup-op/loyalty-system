// footer.js  

// Function to display the current year in the footer  
function displayCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Function to toggle the visibility of additional footer content  
function toggleFooterContent() {
    const toggleButton = document.getElementById('toggle-footer');
    const additionalContent = document.getElementById('additional-content');

    if (toggleButton && additionalContent) {
        toggleButton.addEventListener('click', () => {
            const isVisible = additionalContent.style.display === 'block';
            additionalContent.style.display = isVisible ? 'none' : 'block';
            toggleButton.textContent = isVisible ? 'Show More' : 'Show Less';
        });
    }
}

// Function to handle subscription form submission (placeholder)  
function handleSubscription() {
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevents the default form submission  
            const emailField = document.getElementById('email');
            alert(`Thank you for subscribing with email: ${emailField.value}`);
            emailField.value = ''; // Clear the input field after submission  
        });
    }
}

// Initialize footer functionalitie 
function initFooter() {
    displayCurrentYear();
    toggleFooterContent();
    handleSubscription();
}

// Wait for the DOM to be fully loaded before initializing  
document.addEventListener('DOMContentLoaded', initFooter);
