document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-three__form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const phone = form.querySelector('[name="Phone"]').value;
        const service = form.querySelector('.selectmenu').value;
        const message = form.querySelector('[name="message"]').value;
        
        // Basic validation (optional)
        if (!name || !phone) {
            alert("Please fill in your name and phone number.");
            return;
        }
       
        const whatsappNumber = "94712124500"; 
        
        
        // Format WhatsApp message
        const whatsappMessage = 
            `New Appointment Request:%0A%0A` +
            `*Name:* ${name}%0A` +
            `*Email:* ${email}%0A` +
            `*Phone:* ${phone}%0A` +
            `*Service Needed:* ${service}%0A` +
            `*Message:* ${message}`;
        
        // Open WhatsApp with the number and pre-filled message
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        
        // Show success message
        const resultDiv = document.querySelector('.result');
        resultDiv.innerHTML = `
            <div class="alert alert-success">
                ✔ Your appointment request has been prepared. Please send it via WhatsApp.
            </div>
        `;
        
        // Clear form (optional)
        form.reset();
        
        // Scroll to success message
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});