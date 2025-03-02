import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./ContactForm.scss"

const ContactForm = () => {
  const [params, setParams] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });

    // Clear errors when the user starts typing
    if (name === 'email' || name === 'message') {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate email
    if (!validateEmail(params.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address.' });
      return;
    }

    // Validate message
    if (!params.message.trim()) {
      setErrors({ ...errors, message: 'Message cannot be empty.' });
      return;
    }

    // Clear errors if validation passes
    setErrors({ email: '', message: '' });

    // Send the email using EmailJS
    emailjs
      .send(
        'service_3obwf8x', // Your service ID
        'template_pbqbxhy', // Your template ID
        params,
        'FW0uzHeuIz6w0d_C7' // Your public key
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          // Clear the form after successful submission
          setParams({
            name: '',
            email: '',
            message: '',
          });
          alert('Message sent successfully!'); // You can replace this with a better UI notification
        },
        (error) => {
          console.log('FAILED...', error);
          alert('Failed to send the message. Please try again.'); // You can replace this with a better UI notification
        }
      );
  };

  return (
    <div>
      <form id="contact-form" onSubmit={() => handleSubmit()}>
        <input type="hidden" name="contact_number" value="697483" />
        <input
          type="text"
          name="name"
          value={params.name}
          onChange={(e) => handleChange(e)}
          placeholder='Full Name'
          required
        />
        <input
          type="email"
          name="email"
          value={params.email}
          onChange={(e) =>handleChange(e)}
          placeholder='Email Adress'
          required
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <textarea
          name="message"
          value={params.message}
          onChange={(e) =>handleChange(e)}
          placeholder='Your Message'
          required
        />
        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        <input type="submit" value="Send Message" id='submit-button' onClick={(e) => handleSubmit(e)}/>
      </form>
    </div>
  );
};

export default ContactForm;