import { useContact } from "../hooks/contact.js";

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    try {
        const response = await useContact(name, email, message);
        alert(response.message);
        contactForm.reset();
    }
    catch (err) {
        alert(err.message);
    }
})
