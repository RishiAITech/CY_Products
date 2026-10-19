import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aap backend API call laga sakte hain message save karne ke liye
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-[#1a1a1a] text-white py-16 px-4 text-center border-b-4 border-yellow-500">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Have a question about our products, bulk orders, or shipping? Our team is here to help you.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. CONTACT INFORMATION (Left Side) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Phone */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                <FiPhone />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Call Us</h3>
                <p className="text-gray-500 text-sm mb-1">Mon-Sat from 9am to 6pm.</p>
                <p className="font-semibold text-gray-800">+91 8808411508</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                <FiMail />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Email Us</h3>
                <p className="text-gray-500 text-sm mb-1">We reply within 24 hours.</p>
                <p className="font-semibold text-gray-800">support@cyproducts.in</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                <FiMapPin />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Visit Us</h3>
                <p className="text-gray-500 text-sm mb-1">Factory & Head Office</p>
                <p className="font-semibold text-gray-800">Yehduda Nagar, Kanpur<br/>Uttar Pradesh - 208011, India</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                <FiClock />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Business Hours</h3>
                <p className="text-gray-500 text-sm">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-500 text-sm">Sunday: Closed</p>
              </div>
            </div>

          </div>

          {/* 3. CONTACT FORM (Right Side) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {status && (
              <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {status}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition" 
                  placeholder="Bulk Order Inquiry / Product Question"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                <textarea 
                  required 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-black text-white font-bold py-4 px-8 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors duration-300 w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 4. GOOGLE MAP SECTION */}
      <div className="w-full h-[400px] bg-gray-300">
        <iframe 
          title="CY Products Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114312.10873351878!2d80.27429365000001!3d26.447234399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47eebc6a5bcf%3A0x6b12b6f6b02e5b0!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default Contact;