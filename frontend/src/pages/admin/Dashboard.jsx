import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return <div className="text-center mt-20 text-red-600 font-bold">Access Denied. Admin only.</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/add-product" className="bg-white p-6 rounded-lg shadow border hover:border-yellow-500">
          <h2 className="text-xl font-bold mb-2">Add Product</h2>
          <p className="text-gray-500">Upload new shoes to the catalog.</p>
        </Link>
        <Link to="/admin/orders" className="bg-white p-6 rounded-lg shadow border hover:border-yellow-500">
          <h2 className="text-xl font-bold mb-2">Manage Orders</h2>
          <p className="text-gray-500">View and update customer orders.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;