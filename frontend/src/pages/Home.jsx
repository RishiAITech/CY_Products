import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import api from '../services/api';

const Home = () => {
  const scrollRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider Data
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      title: "CY EXCLUSIVE",
      subtitle: "Step into the future of footwear.",
      btnText: "Shop Now",
      btnLink: "/shop"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1920&auto=format&fit=crop",
      title: "MOON SHOE",
      subtitle: "Designed for life in orbit.",
      btnText: "Explore Collection",
      btnLink: "/shop"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1920&auto=format&fit=crop",
      title: "THE NEW ERA",
      subtitle: "Stronger Steps for a Better Tomorrow.",
      btnText: "Shop Men",
      btnLink: "/shop?gender=Men"
    }
  ];

  // Auto Slide Logic (2 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Manual Slide Functions
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  // Database se products fetch karein
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white w-full overflow-x-hidden">

      {/* 1. HERO SLIDER SECTION */}
      <div className="relative w-full h-[85vh] overflow-hidden group">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-end items-center pb-24 text-center text-white px-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase leading-none">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl font-medium mb-8 tracking-wide">
                {slide.subtitle}
              </p>
              <Link
                to={slide.btnLink}
                className="bg-white text-black px-10 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300"
              >
                {slide.btnText}
              </Link>
            </div>
          </div>
        ))}

        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100">
          <FiChevronLeft size={30} />
        </button>

        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100">
          <FiChevronRight size={30} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-500 w-8' : 'bg-white/50 hover:bg-white'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* 2. MEN, WOMEN, KIDS SECTIONS */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/shop?gender=Men" className="relative group overflow-hidden h-[400px]">
            <img src="https://images.unsplash.com/photo-1614252339460-8b2ec25d1b3c?q=80&w=800&auto=format&fit=crop" alt="Men" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">Men's Collection</h3>
            </div>
          </Link>

          <Link to="/shop?gender=Women" className="relative group overflow-hidden h-[400px]">
            <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop" alt="Women" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">Women's Collection</h3>
            </div>
          </Link>

          <Link to="/shop?gender=Kids" className="relative group overflow-hidden h-[400px]">
            <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop" alt="Kids" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">Kids' Collection</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. FRESH DROPS */}
      <div className="py-16 w-full bg-gray-50">
        <div className="pl-6 md:pl-12 mb-8 flex justify-between items-center pr-12">
          <h2 className="text-3xl font-bold">Fresh Drops</h2>
          <Link to="/shop" className="text-sm font-bold underline hover:text-yellow-600">View All</Link>
        </div>

        <div className="relative group w-full">
          <button onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <FiChevronLeft size={24} />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pl-6 md:pl-12 pr-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <div key={product._id} className="w-[280px] md:w-[320px] flex-shrink-0 snap-start cursor-pointer group/card">
                <div className="bg-[#f6f6f6] h-[350px] w-full overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-black hover:text-white">
                    <FiShoppingCart size={20} />
                  </button>
                </div>

                <div className="mt-4 h-[90px]">
                  <h3 className="font-bold text-lg text-black truncate">{product.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{product.category?.name || 'Footwear'}</p>
                  <p className="font-semibold text-black mt-1">₹{product.discountPrice ? product.discountPrice : product.price}</p>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 pl-12">No products found. Please add from Admin Panel.</p>
            )}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 4. SPOTLIGHT SECTION */}
      <div className="w-full py-24 text-center px-4 md:px-12">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">SPOTLIGHT</h2>
        <p className="text-gray-600 text-lg md:text-2xl max-w-4xl mx-auto mb-20 font-light">
          Classic silhouettes and cutting-edge innovation to build your game from the ground up.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-16 gap-x-6 w-full max-w-[1600px] mx-auto">
          {['Air Jordan 1', 'Air Force 1', 'Graphic Tees', 'Pegasus Premium', 'Vomero 18', 'Pegasus 42', 'Slides', 'Tiempo Elite'].map((spot, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer group">
              <div className="w-24 h-24 md:w-32 md:h-32 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-4xl">👟</span>
              </div>
              <p className="font-bold text-md text-black text-center">{spot}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;