const Footer = () => {
  return (
    <footer className="bg-[#111] text-white pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* Favicon Logo */}
            <img
              src="/favicon.svg"
              alt="CY Products Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold tracking-widest text-white">PRODUCTS</h1>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">Fashion and Safety Footwear Manufacturer</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <span className="bg-gray-800 p-2 rounded text-xs text-gray-300 font-semibold">VISA</span>
            <span className="bg-gray-800 p-2 rounded text-xs text-gray-300 font-semibold">Mastercard</span>
            <span className="bg-gray-800 p-2 rounded text-xs text-gray-300 font-semibold">RuPay</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-yellow-500">Home</a></li>
            <li><a href="#" className="hover:text-yellow-500">Shop</a></li>
            <li><a href="#" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-yellow-500">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-yellow-500">Return & Refund</a></li>
            <li><a href="#" className="hover:text-yellow-500">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-500">Track Order</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📞 +91 8808411508</li>
            <li>✉️ support@cyproducts.in</li>
          </ul>
        </div>

      </div>
      <div className="text-center text-xs text-gray-500 mt-6">
        © 2026 CY Products. All Rights Reserved. | Fashion and Safety Footwear Manufacturer
      </div>
    </footer>
  );
};

export default Footer;