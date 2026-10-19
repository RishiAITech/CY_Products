import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  // Redux se user ki info nikaalein
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="w-full">
      {/* Top Black Bar */}
      <div className="bg-[#111] text-gray-300 text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span> All India Shipping</span>
          <span className="hidden md:inline">📞 +91 9696008704</span>
          <span className="hidden md:inline">✉️ support@cyproducts.in</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/track" className="hover:text-white">Track Order</Link>
          {userInfo ? (
            <span className="text-yellow-500 font-semibold">Hi, {userInfo.name}</span>
          ) : (
            <Link to="/login" className="hover:text-white">My Account</Link>
          )}
          <span>EN ⌄</span>
        </div>
      </div>

      {/* Main White Navbar */}
      <div className="bg-white py-4 px-4 md:px-8 flex justify-between items-center border-b border-gray-200 shadow-sm sticky top-0 z-50">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Favicon Logo */}
          <img
            src="/favicon.svg"
            alt="CY Products Logo"
            className="w-11 h-11 object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Text Area */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-black tracking-[0.15em] text-black leading-none">PRODUCTS</h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">Fashion and Safety Footwear</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-800">
          <Link to="/" className="hover:text-yellow-500 transition">Home</Link>
          <Link to="/shop" className="hover:text-yellow-500 transition">Shop</Link>
          <Link to="/about" className="hover:text-yellow-500 transition">About Us</Link>
          {/* <Link to="/bulk" className="hover:text-yellow-500 transition">Bulk Orders</Link>
          <Link to="/international" className="hover:text-yellow-500 transition">International</Link> */}
          <Link to="/contact" className="hover:text-yellow-500 transition">Contact</Link>
        </nav>

        {/* Search Bar & Icons */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-md px-3 py-2 w-64">
            <input
              type="text"
              placeholder="Search for shoes, boots, etc..."
              className="bg-transparent outline-none text-sm w-full text-gray-700"
            />
            <FiSearch className="text-gray-500 text-lg" />
          </div>

          <div className="flex items-center gap-4 text-gray-700 text-xl">

            {/* Agar user logged in hai */}
            {userInfo ? (
              <>
                {userInfo.isAdmin && (
                  <Link to="/admin/dashboard" className="text-sm font-bold text-yellow-600 hover:text-yellow-700 mr-2 border border-yellow-600 px-2 py-1 rounded">
                    Admin Panel
                  </Link>
                )}
                <button onClick={logoutHandler} title="Logout" className="hover:text-red-500 transition">
                  <FiLogOut />
                </button>
              </>
            ) : (
              // Agar user logged out hai
              <Link to="/login" className="hover:text-yellow-600"><FiUser /></Link>
            )}

            <Link to="/cart" className="relative hover:text-yellow-600">
              <FiShoppingCart />
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;