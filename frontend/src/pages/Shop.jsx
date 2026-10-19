import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiFilter, FiShoppingCart, FiX } from 'react-icons/fi';
import api from '../services/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const importantCategories = ['Safety Shoes', 'Formal Shoes', 'Leather Boots', 'Sports Shoes', 'Ladies Footwear'];

  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const currentGender = queryParams.get('gender') || 'All';
  const currentCategory = queryParams.get('category') || 'All';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products?';
        if (currentGender !== 'All') url += `gender=${currentGender}&`;
        
        const { data } = await api.get(url);
        
        let filteredData = data;
        if (currentCategory !== 'All') {
          filteredData = data.filter(p => p.category?.name === currentCategory);
        }
        setProducts(filteredData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentGender, currentCategory]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value === 'All') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    navigate(`/shop?${params.toString()}`);
    // Filter popup ko band nahi karenge taaki user ek saath multiple filters laga sake
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. CLEAN HEADER (No big text covering the page) */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {currentGender !== 'All' ? `${currentGender}'s Collection` : 'All Products'}
            </h1>
            <span className="hidden md:inline text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {products.length} items
            </span>
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm font-semibold hover:border-black transition-colors bg-white"
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      {/* 2. MAIN PRODUCT GRID (Proper Cards with Button Below Image) */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading Products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">No products found for these filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                
                {/* Image Area (Fixed Ratio) */}
                <div className="relative w-full aspect-square bg-[#f5f5f5] overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Details Area (Below Image) */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{product.category?.name || 'Footwear'}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <p className="font-bold text-black text-lg">
                      ₹{product.discountPrice ? product.discountPrice : product.price}
                    </p>
                    {/* Add to Cart Button (Below image, proper placement) */}
                    <button className="bg-black text-white p-2.5 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-medium px-4">
                      <FiShoppingCart /> Add
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. FILTER POPUP (Clean & User Friendly) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)}></div>
          
          {/* Filter Panel (Slides from Left) */}
          <div className="relative w-full max-w-[300px] bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-gray-200 rounded">
                <FiX size={22} />
              </button>
            </div>

            {/* Options */}
            <div className="flex-grow overflow-y-auto p-4">
              
              {/* Gender */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 text-sm">Gender</h3>
                <div className="space-y-2">
                  {['All', 'Men', 'Women', 'Kids'].map((g) => (
                    <label key={g} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={currentGender === g}
                        onChange={() => updateFilter('gender', g)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className={`text-sm ${currentGender === g ? 'font-bold' : 'text-gray-600'}`}>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={currentCategory === 'All'}
                      onChange={() => updateFilter('category', 'All')}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className={`text-sm ${currentCategory === 'All' ? 'font-bold' : 'text-gray-600'}`}>All</span>
                  </label>
                  {importantCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={currentCategory === cat}
                        onChange={() => updateFilter('category', cat)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className={`text-sm ${currentCategory === cat ? 'font-bold' : 'text-gray-600'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-black text-white py-3 rounded-md font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;