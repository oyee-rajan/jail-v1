"use client";

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { FiX, FiMinus, FiPlus, FiShoppingCart, FiHeart } from 'react-icons/fi';

const CartSidebar: React.FC = () => {
  const { state, toggleCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Shopping Cart ({state.totalItems})
            </h2>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <FiShoppingCart size={48} className="mb-4" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm">Add some items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor || 'default'}`} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      {item.selectedColor && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Color: {item.selectedColor}</p>
                      )}
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Rs. {item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        if (isInWishlist(item.id)) {
                          removeFromWishlist(item.id);
                        } else {
                          addToWishlist({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            imageUrl: item.imageUrl,
                            selectedColor: item.selectedColor
                          });
                        }
                      }}
                      className={`p-1 transition-colors ${
                        isInWishlist(item.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                      title={isInWishlist(item.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <FiHeart size={16} className={isInWishlist(item.id) ? 'fill-current' : ''} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-400 hover:text-red-600"
                      title="Remove from cart"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rs. {state.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="space-y-2">
                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  Checkout
                </button>
                <button
                  onClick={() => {
                    state.items.forEach(item => {
                      if (!isInWishlist(item.id)) {
                        addToWishlist({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          imageUrl: item.imageUrl,
                          selectedColor: item.selectedColor
                        });
                      }
                    });
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-600"
                >
                  <FiHeart size={16} />
                  <span>Move All to Wishlist</span>
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-gray-600 dark:text-gray-400 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;

