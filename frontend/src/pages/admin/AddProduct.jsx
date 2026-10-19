import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [gender, setGender] = useState('Men');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Category States
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const navigate = useNavigate();

  // Page load hote hi Categories fetch karein
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Image upload (Base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalCategoryId = selectedCategory;

      // Agar admin nayi category bana raha hai
      if (isNewCategory && newCategoryName.trim() !== '') {
        const { data } = await api.post('/categories', { 
          name: newCategoryName,
          description: "New Category created via product form"
        });
        finalCategoryId = data._id; // Nayi category ki ID mil gayi
      }

      if (!finalCategoryId) {
        alert("Please select or create a category");
        setLoading(false);
        return;
      }

      // Product create karein
      await api.post('/products', {
        name, 
        price: Number(price), 
        description, 
        images: [imageBase64], 
        gender, 
        stock: Number(stock), 
        category: finalCategoryId
      });

      alert('Product Added Successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg mt-10 rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload New Product</h2>
      
      <form onSubmit={submitHandler} className="space-y-4">
        <input type="text" placeholder="Product Name" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none" onChange={(e) => setName(e.target.value)} required />
        
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Price (₹)" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none" onChange={(e) => setPrice(e.target.value)} required />
          <input type="number" placeholder="Stock Quantity" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none" onChange={(e) => setStock(e.target.value)} required />
        </div>

        <textarea placeholder="Product Description" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none" rows="3" onChange={(e) => setDescription(e.target.value)} required />
        
        {/* Image Upload */}
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center bg-gray-50">
          <label className="block text-sm font-bold mb-2 text-gray-600">Upload Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" required />
          {imageBase64 && <img src={imageBase64} alt="Preview" className="mt-3 h-24 mx-auto object-contain rounded border" />}
        </div>

        {/* SMART CATEGORY DROPDOWN */}
        <div className="bg-gray-50 p-4 rounded border">
          <label className="block text-sm font-bold mb-2 text-gray-700">Category</label>
          
          {!isNewCategory ? (
            <div className="flex gap-2">
              <select 
                className="w-full border p-2 rounded outline-none focus:border-yellow-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => setIsNewCategory(true)} className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-black whitespace-nowrap">
                + New
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter new category name..." 
                className="w-full border p-2 rounded outline-none focus:border-yellow-500"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
              <button type="button" onClick={() => { setIsNewCategory(false); setNewCategoryName(''); }} className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">
                Cancel
              </button>
            </div>
          )}
        </div>

        <select className="w-full border p-2 rounded outline-none focus:border-yellow-500" onChange={(e) => setGender(e.target.value)}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        
        <button type="submit" disabled={loading} className="w-full bg-[#1a1a1a] text-white py-3 rounded font-bold hover:bg-yellow-500 hover:text-black transition disabled:opacity-50">
          {loading ? 'Uploading Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;