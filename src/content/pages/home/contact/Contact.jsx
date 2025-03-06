import React from 'react'
import ContactForm from './form/ContactForm'
import "./Contact.scss"

function Contact() {
    

  return (
    <div className='section-contact' id='section-contact'>
        <img src='/img/pages/home/contact/contact_decoration.png' alt='Background decoration'/>
        <div className='section-contact-left'>
            <h2>LET'S TALK</h2>
            <p>Looking to start a project or just need to collaborate? Feel Free to contact me. </p>
            <a href='mailto:contact@anuka.live'>contact@anuka.live</a>
        </div>
        <div className='section-contact-right'>
            <ContactForm />
        </div>
    </div>
  )
}

export default Contact