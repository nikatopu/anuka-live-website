import React from 'react'
import ContactForm from '../../content/pages/home/contact/form/ContactForm'
import './Contact.scss'

function Contact() {
  return (
    <div className="section-contact-page">
      <div className="section-contact-page-left">
        <div className="section-contact-page-left-top">
          <h2>
            Let's Talk
          </h2>
          <a href='mailto:contact@anuka.live'>contact@anuka.live</a>
        </div>
        <div className="section-contact-page-left-bottom">
        <ContactForm />
        </div>
      </div>
      <div className="section-contact-page-right">
        <img src="/img/pages/contact/background.webp" alt="background decoration"/>
      </div>
    </div>
  )
}

export default Contact