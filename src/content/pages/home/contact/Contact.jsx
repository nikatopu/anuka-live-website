import React from "react";
import ContactForm from "./form/ContactForm";
import "./Contact.scss";

function Contact() {
  return (
    <div className="section-contact" id="section-contact">
      <img
        src="https://res.cloudinary.com/dvwkvoqss/image/upload/v1750414655/contact_decoration_fakhxa.png"
        alt="Background decoration"
      />
      <div className="section-contact-left">
        <h2>LET'S TALK</h2>
        <p>
          Looking to start a project or just need to collaborate? Feel Free to
          contact me.{" "}
        </p>
        <a href="mailto:contact@anuka.live">contact@anuka.live</a>
      </div>
      <div className="section-contact-right">
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
