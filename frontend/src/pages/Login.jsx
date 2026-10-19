import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import api from '../services/api'; // Make sure yeh file bani hui hai

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend API call
      const { data } = await api.post('/users/login', { email, password });
      
      // Redux mein save karein
      dispatch(setCredentials(data)); 
      
      alert('Login Successful!');
      
      // Agar admin hai toh dashboard par bhejein, warna home par
      if (data.isAdmin) {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh] bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-yellow-500">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="admin@cyproducts.com"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 transition-colors" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 transition-colors" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;