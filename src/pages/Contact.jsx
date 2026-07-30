import React, { useState } from "react";
import "../styles/contact.css";
import { submitContact } from "../services/contactService";

const Contact = () => {

    const [form, setForm] = useState({

        name: "",

        email: "",

        subject: "",

        message: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            !form.name ||

            !form.email ||

            !form.subject ||

            !form.message

        ) {

            alert("Please fill all fields.");

            return;

        }

        try {

            await submitContact(form);

            alert("Message sent successfully.");

            setForm({

                name: "",

                email: "",

                subject: "",

                message: ""

            });

        }

        catch (error) {

            console.log(error);

            alert("Something went wrong.");

        }

    };

    return (

        <section className="contact-page">

            <div className="container">

                <h2 className="contact-title">

                    Contact Us

                </h2>

                <p className="contact-subtitle">

                    We'd love to hear from you.

                </p>

                <div className="contact-wrapper">

                    {/* Left */}

                    <div className="contact-info">

                        <h3>Get In Touch</h3>

                        <p>

                            📍 Hyderabad, Telangana, India

                        </p>

                        <p>

                            📞 +91 9876543210

                        </p>

                        <p>

                            📧 support@craftcorner.com

                        </p>

                        <p>

                            🕒 Mon - Sat : 9 AM - 7 PM

                        </p>

                    </div>

                    {/* Right */}

                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={handleChange}
                        />

                        <textarea
                            rows="6"
                            name="message"
                            placeholder="Write your message..."
                            value={form.message}
                            onChange={handleChange}
                        />

                        <button type="submit">

                            Send Message

                        </button>

                    </form>

                </div>

            </div>

        </section>

    );

};

export default Contact;