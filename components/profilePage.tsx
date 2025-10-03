"use client";

import React, { useState, useMemo, ReactNode } from 'react';

// --- Type Definitions ---
interface User {
    id: string;
    name: string;
    email: string;
    memberSince: string;
    avatarUrl: string;
    address: string[]; // ADDED: Address field for profile info
}

interface Order {
    id: string;
    date: string;
    status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
    total: number;
    items: number;
}

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    inStock: boolean;
}

type CurrentView = 'profile' | 'orders' | 'wishlist' | 'settings';

// --- Mock Data ---

const mockUser: User = {
    id: 'user-7890',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: 'October 2023',
    avatarUrl: 'https://placehold.co/100x100/A3A3A3/FFFFFF?text=JD',
    address: [ // ADDED MOCK ADDRESS
        '456 Elm Street',
        'Apt 12B',
        'Springfield, IL 62704',
        'United States'
    ],
};

const mockOrders: Order[] = [
    { id: 'ORD-54321', date: '2024-08-01', status: 'Delivered', total: 12500, items: 3 },
    { id: 'ORD-98765', date: '2024-07-15', status: 'Shipped', total: 4500, items: 1 },
    { id: 'ORD-10112', date: '2024-06-22', status: 'Processing', total: 21990, items: 5 },
    { id: 'ORD-23456', date: '2024-05-10', status: 'Cancelled', total: 7000, items: 2 },
];

const initialWishlist: WishlistItem[] = [
    { id: 101, name: 'Minimalist Leather Bag', price: 12000, imageUrl: 'https://placehold.co/100x100/D4D4D4/333333?text=BAG', inStock: true },
    { id: 102, name: 'Wireless Noise Cancelling Headphones', price: 8500, imageUrl: 'https://placehold.co/100x100/F5F5F5/333333?text=HPR', inStock: true },
    { id: 103, name: 'Smart Watch Series 9', price: 29999, imageUrl: 'https://placehold.co/100x100/E5E5E5/333333?text=WCH', inStock: false },
    { id: 104, name: 'Ergonomic Desk Chair', price: 15500, imageUrl: 'https://placehold.co/100x100/CFCFCF/333333?text=CHR', inStock: true },
];


/** Renders a minimal button for the sidebar navigation. */
const NavItem: React.FC<{ view: CurrentView, activeView: CurrentView, setView: (v: CurrentView) => void, children: React.ReactNode }> = ({ view, activeView, setView, children }) => {
    const isActive = view === activeView;
    return (
        <button
            onClick={() => setView(view)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 focus:outline-none 
                ${isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            {children}
        </button>
    );
};

/** Renders the Wishlist Content View */
const WishlistContent: React.FC<{ wishlist: WishlistItem[], handleRemove: (id: number) => void }> = ({ wishlist, handleRemove }) => {
    if (wishlist.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-500">Start browsing products to save your favorites!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {wishlist.map(item => (
                <div key={item.id} className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4 flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xl font-bold text-red-600 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <div className="flex flex-col items-end space-y-2 ml-4">
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="text-gray-500 hover:text-red-600 transition-colors duration-200 text-sm"
                        >
                            Remove
                        </button>
                        {item.inStock && (
                            <button className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors duration-200">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

/** Renders the Orders Content View */
const OrdersContent: React.FC = () => (
    <div className="space-y-4">
        {mockOrders.map(order => (
            <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition-shadow hover:shadow-md">
                <div>
                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                    <p className="text-sm text-gray-500">{order.items} item(s)</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">₹{order.total.toLocaleString('en-IN')}</p>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full mt-1 inline-block 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {order.status}
                    </span>
                    <button className="block text-blue-600 hover:text-blue-800 text-sm mt-2">View Details</button>
                </div>
            </div>
        ))}
    </div>
);

/** Renders the Profile Info Content View */
const ProfileInfoContent: React.FC<{ user: User }> = ({ user }) => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
            {/* Row 1: Full Name */}
            <div>
                <p className="font-medium text-gray-800">Full Name</p>
                <p className="text-gray-700 p-2 bg-gray-50 rounded-md border border-gray-200">{user.name}</p>
            </div>
            {/* Row 1: Email Address */}
            <div>
                <p className="font-medium text-gray-800">Email Address</p>
                <p className="text-gray-700 p-2 bg-gray-50 rounded-md border border-gray-200">{user.email}</p>
            </div>

            {/* Row 2: Primary Address (Spans full width) */}
            <div className="sm:col-span-2">
                <p className="font-medium text-gray-800">Primary Address</p>
                <div className="text-gray-700 p-2 bg-gray-50 rounded-md border border-gray-200 space-y-0.5">
                    {user.address.map((line, index) => (
                        <p key={index} className="text-sm">{line}</p>
                    ))}
                </div>
            </div>

            {/* Row 3: Member Since */}
            <div>
                <p className="font-medium text-gray-800">Member Since</p>
                <p className="text-gray-700 p-2 bg-gray-50 rounded-md border border-gray-200">{user.memberSince}</p>
            </div>
            {/* Row 3: User ID */}
            <div>
                <p className="font-medium text-gray-800">User ID</p>
                <p className="text-gray-700 p-2 bg-gray-50 rounded-md border border-gray-200">{user.id}</p>
            </div>
        </div>
        <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
            Edit Profile
        </button>
    </div>
);


// --- Main Component ---
export default function UserProfilePage() {
    const [currentView, setCurrentView] = useState<CurrentView>('profile');
    const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

    const handleRemoveFromWishlist = (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const ContentArea = useMemo(() => {
        switch (currentView) {
            case 'profile':
                return <ProfileInfoContent user={mockUser} />;
            case 'orders':
                return <OrdersContent />;
            case 'wishlist':
                return <WishlistContent wishlist={wishlist} handleRemove={handleRemoveFromWishlist} />;
            case 'settings':
                return <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-gray-700">Settings coming soon...</div>;
            default:
                return null;
        }
    }, [currentView, wishlist]); // Re-render when view or wishlist changes

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            {/* The Navbar component is added here at the very top */}
       
            
            <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Account</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 sticky top-4">
                            {/* User Info Card in Sidebar */}
                            <div className="flex flex-col items-center border-b pb-4 mb-4">
                                <img
                                    src={mockUser.avatarUrl}
                                    alt={mockUser.name}
                                    className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-gray-300"
                                />
                                <p className="font-bold text-lg text-gray-800">{mockUser.name}</p>
                                <p className="text-sm text-gray-500">{mockUser.email}</p>
                            </div>

                            <nav className="space-y-1">
                                <NavItem view="profile" activeView={currentView} setView={setCurrentView}>
                                    Profile Info
                                </NavItem>
                                <NavItem view="orders" activeView={currentView} setView={setCurrentView}>
                                    My Orders
                                </NavItem>
                                <NavItem view="wishlist" activeView={currentView} setView={setCurrentView}>
                                    Wishlist ({wishlist.length})
                                </NavItem>
                                <NavItem view="settings" activeView={currentView} setView={setCurrentView}>
                                    Settings
                                </NavItem>
                            </nav>
                            
                            <button className="w-full mt-4 text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm">
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 capitalize">
                            {currentView === 'profile' ? 'Profile Information' : currentView}
                        </h2>
                        {ContentArea}
                    </div>
                </div>
            </div>
        </div>
    );
}
