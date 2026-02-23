
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Website() {
  const [estimate, setEstimate] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCTA, setShowCTA] = useState(true);

  const calendly = "https://calendly.com/sg-zigglobal/30min";

  const calculate = (type) => {
    const pricing = {
      solo: "Starting AED 5,500",
      mid: "Starting AED 9,000",
      visa1: "Package AED 12,555",
      visa2: "Package AED 19,535"
    };
    setEstimate(pricing[type]);
  };

  const services = [
    "Company Formation",
    "Visa Processing",
    "Corporate Bank Account",
    "Accounting & VAT",
    "Office Space",
    "Business Consulting"
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    await fetch("https://formsubmit.co/ajax/sg@zigglobal.com", {
      method: "POST",
      body: data
    });

    setSubmitted(true);
    e.target.reset();
  }

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowCTA(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-16 font-light bg-[#f4f7fb] text-[#0B1F3A]">

      <div className="fixed top-0 w-full bg-[#0B1F3A] text-white text-center py-2 text-sm z-50 pointer-events-none">
        Limited Free Consultation Slots Available This Week
      </div>

      <header className="flex justify-between items-center px-10 py-6 border-b bg-white">
        <h1 className="text-2xl font-bold tracking-wide">Zig Global</h1>

        <nav className="hidden md:flex gap-10 font-medium">
          <a href="#services">Services</a>
          <a href="#calculator">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href={calendly} target="_blank" rel="noopener noreferrer" className="rounded-full px-6 py-2 bg-[#0B1F3A] text-white font-semibold">
          Book Call
        </a>
      </header>

      <section className="text-center py-32 px-6">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold mb-8">
          Start Your UAE Company With Experts
        </motion.h2>

        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600">
          Launch, manage and scale your business globally with end-to-end support.
        </p>

        <a href={calendly} target="_blank" rel="noopener noreferrer" className="rounded-full px-10 py-4 bg-[#0B1F3A] text-white text-lg font-semibold hover:scale-105 transition inline-block">
          Book Your Free Strategy Call
        </a>
      </section>

      <section id="services" className="py-24 px-10 max-w-7xl mx-auto text-center">
        <h3 className="text-5xl font-bold mb-16">Everything You Need To Launch</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-10 shadow-md hover:shadow-2xl transition">
              <h4 className="text-2xl font-bold">{s}</h4>
            </div>
          ))}
        </div>
      </section>

      <section id="calculator" className="py-24 bg-white text-center">
        <h3 className="text-4xl font-bold mb-6">Estimate Your Setup Cost</h3>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <button onClick={() => calculate("solo")} className="px-6 py-3 border rounded-full font-semibold">Solo / Freelancer</button>
          <button onClick={() => calculate("mid")} className="px-6 py-3 border rounded-full font-semibold">Mid Size Business</button>
          <button onClick={() => calculate("visa1")} className="px-6 py-3 border rounded-full font-semibold">1 Visa Package</button>
          <button onClick={() => calculate("visa2")} className="px-6 py-3 border rounded-full font-semibold">2 Visa Package</button>
        </div>

        {estimate && (
          <div className="text-3xl font-bold text-[#0FA958]">{estimate}</div>
        )}
      </section>

      <section id="contact" className="py-24 bg-[#f4f7fb]">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-6 px-6">
            <input type="hidden" name="_captcha" value="false" />
            <input className="border p-4 rounded-xl" name="name" placeholder="Full Name" required />
            <input className="border p-4 rounded-xl" name="email" placeholder="Email Address" required />

            <textarea className="border p-4 rounded-xl h-40" name="message" placeholder="Tell us about your business"></textarea>

            <button className="rounded-full py-4 bg-[#0FA958] text-white text-lg font-semibold hover:scale-105 transition">
              Submit Inquiry
            </button>
          </form>
        ) : (
          <div className="text-center mt-10 space-y-6">
            <div className="text-2xl font-semibold text-green-600">
              ✓ Thank you! Our advisor will contact you shortly.
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href={calendly} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-[#0B1F3A] text-white font-semibold">
                Book Your Call Now
              </a>

              <a href="https://wa.me/971521250169" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </section>

      {showCTA && (
        <a href={calendly} target="_blank" rel="noopener noreferrer" className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-40 bg-[#0B1F3A] text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:scale-105 transition">
          Book Free Consultation
        </a>
      )}

      <a href="https://wa.me/971521250169" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50">
        <motion.img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-16 h-16 drop-shadow-xl" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
      </a>

      <footer className="text-center py-10 border-t text-sm text-gray-600">
        <p className="font-semibold">Zig Global FZE</p>
        <p>Business Centre, SPC, Sharjah, UAE</p>
        <p>Phone: +971 521250169</p>
        <p>Email: sg@zigglobal.com</p>
      </footer>

    </div>
  );
}
