"use client";

import Image from 'next/image';
import React from 'react';

interface Product {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    colors?: Array<{ name: string; hex: string }>;
    inStock?: boolean;
}

interface SimpleProductMainProps {
    product: Product;
}

const SimpleProductMain: React.FC<SimpleProductMainProps> = ({ product }) => {
    return (
        <div className="font-sans bg-white dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-600 rounded-2xl overflow-hidden">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">Rs. {product.price.toLocaleString('en-IN')}</p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {product.description || 'Premium quality product crafted with attention to detail.'}
                    </p>

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Available Colors</h3>
                            <div className="flex space-x-3">
                                {product.colors.map((color) => (
                                    <div
                                        key={color.name}
                                        className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 p-1"
                                    >
                                        <div
                                            className="w-full h-full rounded-full"
                                            style={{ backgroundColor: color.hex }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        Add to Cart - Rs. {product.price.toLocaleString('en-IN')}
                    </button>

                    {/* Delivery Information */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-semibold text-gray-900 dark:text-white">Free Delivery</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Free delivery on orders over Rs. 1000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleProductMain;
