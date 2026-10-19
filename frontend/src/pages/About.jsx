import { Link } from 'react-router-dom';
import { FiShield, FiGlobe, FiTruck, FiAward } from 'react-icons/fi';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1920&auto=format&fit=crop" 
          alt="About CY Products" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Our Story
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Building stronger steps for a better tomorrow.
          </p>
        </div>
      </div>

      {/* 2. COMPANY INTRO */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-sm font-bold text-yellow-600 uppercase tracking-widest mb-2">About CY Products</h2>
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
          Manufacturer • Exporter • Supplier
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
          CY Products is a leading footwear manufacturer dedicated to crafting high-quality fashion and safety footwear for domestic and international markets. We believe that the right pair of shoes doesn't just complete an outfit—it empowers you to take on the world. From rugged safety boots for the toughest job sites to elegant formal shoes for special occasions, we blend innovation, durability, and style in every stitch.
        </p>
      </div>

      {/* 3. STATS STRIP */}
      <div className="bg-[#1a1a1a] text-white py-12 border-y-4 border-yellow-500">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-black text-yellow-500 mb-2">10+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-black text-yellow-500 mb-2">50K+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-black text-yellow-500 mb-2">15+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Countries Exported</p>
          </div>
          <div>
            <p className="text-4xl font-black text-yellow-500 mb-2">100%</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Quality Assured</p>
          </div>
        </div>
      </div>

      {/* 4. OUR VALUES */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 uppercase">Why Choose Us?</h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Value 1 */}
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition bg-gray-50">
            <div className="w-16 h-16 bg-black text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FiShield />
            </div>
            <h4 className="font-bold text-lg mb-2">Premium Quality</h4>
            <p className="text-gray-500 text-sm">We use top-grade materials and strict quality checks to ensure durability and comfort.</p>
          </div>

          {/* Value 2 */}
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition bg-gray-50">
            <div className="w-16 h-16 bg-black text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FiGlobe />
            </div>
            <h4 className="font-bold text-lg mb-2">Global Reach</h4>
            <p className="text-gray-500 text-sm">Exporting to UAE, Europe, USA, and the Middle East with reliable shipping partners.</p>
          </div>

          {/* Value 3 */}
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition bg-gray-50">
            <div className="w-16 h-16 bg-black text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FiTruck />
            </div>
            <h4 className="font-bold text-lg mb-2">Fast Delivery</h4>
            <p className="text-gray-500 text-sm">Partnered with DHL, DTDC, and BlueDart to deliver your orders safely and on time.</p>
          </div>

          {/* Value 4 */}
          <div className="text-center p-6 border rounded-xl hover:shadow-lg transition bg-gray-50">
            <div className="w-16 h-16 bg-black text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FiAward />
            </div>
            <h4 className="font-bold text-lg mb-2">Bulk Orders</h4>
            <p className="text-gray-500 text-sm">Special pricing and custom manufacturing for businesses, schools, and factories.</p>
          </div>
        </div>
      </div>

      {/* 5. CALL TO ACTION */}
      <div className="bg-gray-100 py-16 text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Step Up?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Explore our latest collection of fashion and safety footwear. Quality you can trust, style you will love.
        </p>
        <Link to="/shop" className="bg-yellow-500 text-black px-10 py-4 font-bold text-lg rounded hover:bg-yellow-400 transition">
          Shop The Collection
        </Link>
      </div>

    </div>
  );
};

export default About;