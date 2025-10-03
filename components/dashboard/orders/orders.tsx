"use client"
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, FileText, Package, Megaphone, Search } from 'lucide-react';

// --- Type Definitions ---
// Defining types for our data structures makes the code more robust and easier to understand.
type Order = {
  customerName: string;
  address: string;
  orderNo: number;
  status: 'In Process' | 'Shipped' | 'Delivered' | 'Cancelled'; // Example statuses
  date: string;
  images: string[];
};

type NavItem = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
};


// --- Mock Data ---
// This data simulates what you would fetch from an API.
const initialOrderData: Order[] = [
  {
    customerName: "Arya Utkarsh",
    address: "Sec 4g, 23/243 Bokaro, Jharkhand...",
    orderNo: 5256,
    status: "In Process",
    date: "30/01/25",
    images: ["6c4747/ffffff", "a58d78/ffffff", "c0a08d/ffffff"]
  },
  {
    customerName: "Jane Doe",
    address: "123 Main St, Anytown, USA...",
    orderNo: 5257,
    status: "Shipped",
    date: "29/01/25",
    images: ["8d6e63/ffffff", "b08968/ffffff", "e6ccb2/ffffff"]
  },
  {
    customerName: "John Smith",
    address: "456 Oak Ave, Sometown, USA...",
    orderNo: 5258,
    status: "Delivered",
    date: "28/01/25",
    images: ["7f5539/ffffff", "a2674e/ffffff", "c97b5f/ffffff"]
  },
    // Adding more unique data for a more realistic list
  {
    customerName: "Emily White",
    address: "789 Pine Ln, Yourtown, USA...",
    orderNo: 5259,
    status: "In Process",
    date: "30/01/25",
    images: ["6c4747/ffffff", "a58d78/ffffff", "c0a08d/ffffff"]
  },
  {
    customerName: "Michael Brown",
    address: "101 Maple Dr, Theirtown, USA...",
    orderNo: 5260,
    status: "Cancelled",
    date: "27/01/25",
    images: ["d62828/ffffff", "ef476f/ffffff", "ffd166/ffffff"]
  },
];


// --- Components ---

const Sidebar = () => {
  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { icon: <Users size={20} />, label: "Users" },
    { icon: <FileText size={20} />, label: "Orders", active: true },
    { icon: <Package size={20} />, label: "Products" },
    { icon: <Megaphone size={20} />, label: "Posts" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white rounded-lg p-4 self-start">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              item.active
                ? "bg-purple-100 text-purple-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const OrderTable = ({ orders }: { orders: Order[] }) => {
    // A mapping for status colors to make the UI more informative
    const statusColors: { [key in Order['status']]: string } = {
        "In Process": "bg-blue-100 text-blue-800",
        "Shipped": "bg-yellow-100 text-yellow-800",
        "Delivered": "bg-green-100 text-green-800",
        "Cancelled": "bg-red-100 text-red-800"
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Customer Name</th>
                        <th scope="col" className="px-6 py-3">Order no.</th>
                        <th scope="col" className="px-6 py-3">Order Status</th>
                        <th scope="col" className="px-6 py-3">Order Date</th>
                        <th scope="col" className="px-6 py-3">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {orders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="font-semibold text-gray-900">{order.customerName}</div>
                                <div className="text-xs text-gray-500">{order.address}</div>
                            </td>
                            <td className="px-6 py-4">{order.orderNo}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">{order.date}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {order.images.map((imgColor, i) => (
                                       <img
                                            key={i}
                                            src={`https://placehold.co/40x40/${imgColor}?text=`}
                                            alt="Order item placeholder"
                                            className="w-10 h-10 rounded-md object-cover"
                                        />
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const MainContent = ({ orders }: { orders: Order[] }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex-1">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Order List</h1>
                    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {orders.length} Users
                    </span>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Search size={20} />
                    </div>
                    <input
                        type="search"
                        placeholder="Search by Customer"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block pl-10 p-2.5"
                    />
                </div>
            </header>
            <OrderTable orders={filteredOrders} />
        </main>
    );
}

// --- Main App Component ---
// This would be your page file in a Next.js project, e.g., pages/orders.tsx
const UserOrders = () => {
  // State to hold the orders. In a real app, this would be managed by a state
  // management library like Redux or React Query.
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect is used here to simulate fetching data from an API when the component mounts.
  useEffect(() => {
    // --- API CALL SIMULATION ---
    // In a real application, you would fetch data here.
    // For example:
    // fetch('/api/orders')
    //   .then(res => res.json())
    //   .then(data => {
    //     setOrders(data);
    //     setLoading(false);
    //   });
    
    // --- REDUX INTEGRATION POINT ---
    // If using Redux, you would dispatch an action here to fetch the orders.
    // The 'orders' state would come from the Redux store via a selector.
    // Example:
    // const dispatch = useDispatch();
    // const { orders, loading } = useSelector((state) => state.orders);
    // useEffect(() => {
    //   dispatch(fetchOrders());
    // }, [dispatch]);

    setLoading(true);
    setTimeout(() => {
        setOrders(initialOrderData);
        setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  if (loading) {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <p>Loading orders...</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-screen-2xl mx-auto flex gap-6">
        
        <MainContent orders={orders} />
      </div>
    </div>
  );
};

export default UserOrders;

