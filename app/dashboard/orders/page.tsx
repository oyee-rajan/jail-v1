import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  StickyNote,
  Search,
  Bell,
  Menu,
} from "lucide-react";

// --- Type Definitions for Data ---

interface OrderItem {
  id: string;
  image: string; // Placeholder for image URL/icon
}

interface Order {
  id: number;
  customerName: string;
  address: string;
  orderNumber: number;
  status: "In Process" | "Delivered" | "Canceled";
  orderDate: string; // Format DD/MM/YY
  details: OrderItem[];
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

// --- Mock Data ---

const MOCK_ORDERS: Order[] = Array(10)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    customerName: "Arya Utkarsh",
    address: "Sec 4g, 23/243 Bokaro, Jharkhand, India",
    orderNumber: 5256 + index,
    status: "In Process",
    orderDate: `30/01/25`,
    details: [
      { id: "item1", image: "https://placehold.co/30x30/500/fff?text=P1" },
      { id: "item2", image: "https://placehold.co/30x30/700/fff?text=P2" },
      { id: "item3", image: "https://placehold.co/30x30/900/fff?text=P3" },
    ],
  }));

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  { id: "users", label: "Users", icon: Users, path: "/users" },
  { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
  { id: "products", label: "Products", icon: Package, path: "/products" },
  { id: "posts", label: "Posts", icon: StickyNote, path: "/posts" },
];

// --- Sub-Components ---

/**
 * Renders the top header bar.
 */
const Header: React.FC = () => (
  <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md">
    {/* Left Section - Profile and Quick Search */}
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        {/* Profile Image */}
        <img
          src="https://placehold.co/40x40/6366f1/ffffff/png?text=DC"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-gray-900 font-semibold hidden sm:block">
          Dominique Ch.
        </div>
      </div>
      {/* Quick Search */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Quick search"
          className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
        />
      </div>
    </div>

    {/* Right Section - Icons */}
    <div className="flex items-center space-x-4">
      <button className="p-2 text-gray-600 hover:text-indigo-600">
        <Search className="w-5 h-5 md:hidden" />
      </button>
      <button className="relative p-2 text-gray-600 hover:text-indigo-600">
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          2
        </span>
      </button>
      <button className="p-2 text-gray-600 hover:text-indigo-600 lg:hidden">
        <Menu className="w-5 h-5" />
      </button>
    </div>
  </header>
);

/**
 * Renders the sidebar navigation menu.
 * The 'Orders' item is set to active by default.
 */
const Sidebar: React.FC<{ activeId: string }> = ({ activeId }) => (
  <nav className="hidden lg:block w-60 h-full bg-white border-r border-gray-200 shadow-lg p-4">
    <div className="space-y-2 mt-4">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={item.path}
            className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
              isActive
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </div>
  </nav>
);

/**
 * Renders a single row in the Order List table.
 */
const OrderRow: React.FC<{ order: Order }> = ({ order }) => (
  <tr className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors">
    {/* Customer Name and Address */}
    <td className="px-4 py-3 text-sm">
      <div className="font-semibold text-gray-900">{order.customerName}</div>
      <div className="text-xs text-gray-500 w-64 whitespace-normal">
        {order.address}
      </div>
    </td>
    {/* Order No. */}
    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
      {order.orderNumber}
    </td>
    {/* Order Status */}
    <td className="px-4 py-3 text-sm">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          order.status === "In Process"
            ? "bg-yellow-100 text-yellow-800"
            : order.status === "Delivered"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {order.status}
      </span>
    </td>
    {/* Order Date */}
    <td className="px-4 py-3 text-sm text-gray-700">{order.orderDate}</td>
    {/* Details (Product Images) */}
    <td className="px-4 py-3">
      <div className="flex -space-x-2">
        {order.details.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={`Product ${index + 1}`}
            className="w-8 h-8 rounded-md border-2 border-white shadow-sm"
          />
        ))}
      </div>
    </td>
  </tr>
);

/**
 * Main component rendering the entire page layout and order list.
 */
const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const activeNavId = "orders";

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.orderNumber).includes(searchTerm)
  );

  return (
    <div className="flex h-screen bg-gray-100 antialiased">
      {/* Sidebar */}
      <Sidebar activeId={activeNavId} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Body */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-full mx-auto">
            {/* Orders Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              {/* Card Header and Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center mb-4 sm:mb-0">
                  Order List
                  <span className="ml-3 inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">
                    {MOCK_ORDERS.length} Users{" "}
                    {/* Placeholder count for design match */}
                  </span>
                </h1>
                <div className="relative flex items-center w-full sm:w-auto">
                  <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
              </div>

              {/* Order Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order no.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-4 text-center text-gray-500"
                        >
                          No orders found matching "{searchTerm}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination/Footer (Placeholder) */}
              <div className="mt-4 flex justify-center text-sm text-gray-500">
                Displaying {filteredOrders.length} orders
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
