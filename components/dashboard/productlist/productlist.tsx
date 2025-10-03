"use client";
import React, { useState, useEffect, useMemo } from 'react';

// Define the type for a single product for type safety with TypeScript
type Product = {
  id: string;
  name: string;
  sku: string; // Stock Keeping Unit or a product identifier
  price: number;
  stock: number;
  imageUrl: string;
};

// --- Mock Data ---
const mockProducts: Product[] = [
  { id: '1', name: 'Leather Duffle Bag', sku: '45265', price: 6123, stock: 21, imageUrl: 'https://placehold.co/40x40/EFEFEF/333?text=Bag' },
  { id: '2', name: 'Vintage Canvas Backpack', sku: '45266', price: 4999, stock: 35, imageUrl: 'https://placehold.co/40x40/EFEFEF/333?text=Pack' },
  { id: '3', name: 'Classic Leather Wallet', sku: '45267', price: 1599, stock: 102, imageUrl: 'https://placehold.co/40x40/EFEFEF/333?text=Wallet' },
  { id: '4', name: 'Traveler\'s Notebook', sku: '45268', price: 899, stock: 50, imageUrl: 'https://placehold.co/40x40/EFEFEF/333?text=Book' },
  { id: '5', name: 'Stainless Steel Watch', sku: '45269', price: 12500, stock: 15, imageUrl: 'https://placehold.co/40x40/EFEFEF/333?text=Watch' },
];
// --- End Mock Data ---


// --- Reusable Components ---

// SVG Icon Components
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MoreOptionsIcon = () => (
  <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

// Confirmation Modal Component for Deleting Products
const ConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button type="button" onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
    );
};


// Add/Edit Product Modal Component
const ProductModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, 'id' | 'imageUrl'> & { id?: string }) => void;
    productToEdit: Product | null;
}> = ({ isOpen, onClose, onSave, productToEdit }) => {
    const [productData, setProductData] = useState({ name: '', sku: '', price: 0, stock: 0 });

    useEffect(() => {
        if (productToEdit) {
            setProductData(productToEdit);
        } else {
            setProductData({ name: '', sku: '', price: 0, stock: 0 });
        }
    }, [productToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setProductData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...productData, id: productToEdit?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
                    <input type="text" name="sku" value={productData.sku} onChange={handleChange} placeholder="SKU" className="w-full p-2 border rounded" required />
                    <input type="number" name="price" value={productData.price} onFocus={e => e.target.select()} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                    <input type="number" name="stock" value={productData.stock} onFocus={e => e.target.select()} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// Product Row Component
const ProductRow: React.FC<{
    product: Product;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
}> = ({ product, isSelected, onSelect, onDelete, onEdit }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="grid grid-cols-12 items-center text-sm text-gray-800 border-b border-gray-200 py-3 px-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="col-span-1 flex items-center"><input type="checkbox" checked={isSelected} onChange={() => onSelect(product.id)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /></div>
            <div className="col-span-5 flex items-center">
                <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md mr-4" />
                <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                </div>
            </div>
            <div className="col-span-2"><p>₹ {product.price.toLocaleString('en-IN')}</p></div>
            <div className="col-span-2"><p>{product.stock}</p></div>
            <div className="col-span-2 flex justify-center relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-1 rounded-full hover:bg-gray-200"><MoreOptionsIcon /></button>
                {dropdownOpen && (
                    <div className="absolute right-0 top-8 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border">
                        <a href="#" onClick={(e) => { e.preventDefault(); onEdit(product); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onDelete(product.id); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                    </div>
                )}
            </div>
        </div>
    );
};


// Main Page Component
const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    useEffect(() => {
        // Simulating API call
        setIsLoading(true);
        console.log("Fetching products...");
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    // --- Product Actions ---
    const handleSaveProduct = (productData: Omit<Product, 'id' | 'imageUrl'> & { id?: string }) => {
        if (productData.id) { // Editing existing product
            setProducts(products.map(p => p.id === productData.id ? { ...p, ...productData } as Product : p));
        } else { // Adding new product
            const newProduct: Product = {
                ...productData,
                id: (Math.random() * 10000).toString(), // Simulate a new ID
                imageUrl: `https://placehold.co/40x40/EFEFEF/333?text=${productData.name.charAt(0)}`
            };
            setProducts([newProduct, ...products]);
        }
        setIsModalOpen(false);
        setProductToEdit(null);
    };

    const handleAddNewClick = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setProductToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            setProducts(products.filter(p => p.id !== productToDelete));
        }
        setIsConfirmModalOpen(false);
        setProductToDelete(null);
    };
    
    // --- Selection Logic ---
    const handleSelect = (id: string) => {
        setSelectedProducts(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedProducts(filteredProducts.map(p => p.id));
        } else {
            setSelectedProducts([]);
        }
    };

    // --- Filtering Logic ---
    const filteredProducts = useMemo(() => products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]);
    
    const isAllSelected = selectedProducts.length === filteredProducts.length && filteredProducts.length > 0;

    return (
        <>
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveProduct} productToEdit={productToEdit} />
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
            />
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
                <div className="flex justify-end mb-4"><button onClick={handleAddNewClick} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">New Product +</button></div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-semibold text-gray-800">Product List</h1>
                                <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{products.length} Products</span>
                            </div>
                            <div className="relative w-full max-w-xs">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                                <input type="text" placeholder="Search Product..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                        <div className="col-span-1 flex items-center"><input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /></div>
                        <div className="col-span-5">Product Name</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-2">Stock</div>
                        <div className="col-span-2 text-center">Details</div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {isLoading ? (
                            <p className="text-center p-8 text-gray-500">Loading products...</p>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map(product => <ProductRow key={product.id} product={product} isSelected={selectedProducts.includes(product.id)} onSelect={handleSelect} onDelete={handleDeleteClick} onEdit={handleEditClick} />)
                        ) : (
                            <p className="text-center p-8 text-gray-500">No products found for "{searchTerm}".</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductListPage;

