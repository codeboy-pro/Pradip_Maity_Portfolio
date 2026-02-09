import { useState } from "react";
import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check honeypot field - if filled, it's likely a bot
    if (formData._gotcha) {
      console.warn("Honeypot filled. Bot detected.");
      setStatus("success"); // Silently "succeed" to not alert the bot
      setTimeout(() => setStatus("idle"), 1000);
      return;
    }
    
    setStatus("loading");
    
    try {
      // Using Formspree
      const response = await fetch("https://formspree.io/f/mykdyzlb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _gotcha: formData._gotcha, // Formspree recognizes this name
        }),
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "", _gotcha: "" });
        // Reset status after 1 second
        setTimeout(() => setStatus("idle"), 1000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again or email me directly.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>
      
      <div className="contact-content">
        {/* Left side - Form */}
        <div className="contact-form-section">
          <h3>Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                autoComplete="off"
                className={errors.subject ? "input-error" : ""}
              />
              {errors.subject && <span className="error-text">{errors.subject}</span>}
            </div>

            {/* Honeypot Field */}
            <div style={{ display: "none" }}>
              <label htmlFor="_gotcha">Don't fill this out if you're human</label>
              <input
                type="text"
                id="_gotcha"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={4}
                className={errors.message ? "input-error" : ""}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>
     
            <button 
              type="submit" 
              className={`submit-btn ${status === "success" ? "success-btn" : ""}`}
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle size={18} />
                  Submitted successfully!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="status-message success">
                <CheckCircle size={18} />
                {statusMessage}
              </div>
            )}
            {status === "error" && (
              <div className="status-message error">
                <XCircle size={18} />
                {statusMessage}
              </div>
            )}
          </form>
        </div>

        {/* Right side - Info & Socials */}
        <div className="contact-info-section">
          <img src="/public/images/1.jpg" alt="pradip" className="w-20 rounded-full" />
          <h3>Let's Connect</h3>
          <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
          
          <p className="email-text">
            <b>Email: </b>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pradipmaity9907@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              pradipmaity9907@gmail.com
            </a>
          </p>

          <ul className="social-links">
            {socials.map(({ id, bg, link, icon, text }) => (
              <li key={id} style={{ backgroundColor: bg }}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <img src={icon} alt={text} className="size-5" />
                  <p>{text}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
