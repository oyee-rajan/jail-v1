"use client";
import React, { useState } from 'react';

// --- Type Definitions for Structured Data ---
// This ensures our data is consistent and predictable, perfect for a database.
type ColorOption = {
  name: string;
  hex: string;
};

type PersonalizationOption = {
  id: string;
  label: string;
  price: number;
};

type Specification = {
  id: string;
  key: string;
  value: string;
};

type ProductData = {
  name: string;
  price: number;
  delivery: {
    startDate: string;
    endDate: string;
  };
  colors: ColorOption[];
  images: string[]; // URLs or data URIs for product images
  features: string[];
  specifications: Specification[];
  personalizations: PersonalizationOption[];
  description: string;
  warrantyInfo: string;
  moreInfo: string;
};

// --- Helper & Icon Components ---
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 hover:text-red-700" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


// --- Main Admin Page Component ---
const AdminProductPage: React.FC = () => {
    
    // State to hold all product data, initialized with sensible defaults.
    const [productData, setProductData] = useState<ProductData>({
        name: 'Premium Leather Wallet',
        price: 6123,
        delivery: { startDate: 'Sat, 2 Aug', endDate: 'Tue, 5 Aug' },
        colors: [{ name: 'Black', hex: '#000000' }, { name: 'Brown', hex: '#A52A2A' }, { name: 'Forest Green', hex: '#228B22' }],
        images: [
            'https://placehold.co/600x400/EFEFEF/333?text=Upload+Image',
            'https://placehold.co/100x100/EFEFEF/333?text=+',
            'https://placehold.co/100x100/EFEFEF/333?text=+',
            'https://placehold.co/100x100/EFEFEF/333?text=+',
        ],
        features: [
            'Durable - Made to last for years.',
            'Stylish - Classic look that ages beautifully.',
            'Functional - Holds essentials with easy access.',
            'Compact - Slim design fits any pocket.',
            'Well-crafted - Expert stitching and fine finish.'
        ],
        specifications: [
            { id: 'spec1', key: 'Material', value: 'Genuine Leather' },
            { id: 'spec2', key: 'Dimensions', value: '4.5" x 3.5"' },
            { id: 'spec3', key: 'Origin', value: 'Made in India' }
        ],
        personalizations: [
            { id: 'p1', label: 'Add Personalised Engraving on Moko Pin - Crypto(Black)', price: 899 },
            { id: 'p2', label: 'Add Personalised Engraving on Moko Pin - Crypto(Black)', price: 899 },
        ],
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
        warrantyInfo: 'This product comes with a 1-year limited warranty.',
        moreInfo: 'Material: Genuine Leather. Dimensions: 4.5" x 3.5". Made in India.'
    });

    // --- Input Handlers ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...productData.images];
                newImages[index] = reader.result as string;
                setProductData(prev => ({ ...prev, images: newImages }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addGalleryImageSlot = () => {
         setProductData(prev => ({ ...prev, images: [...prev.images, 'https://placehold.co/100x100/EFEFEF/333?text=+'] }));
    }
    
    const removeGalleryImage = (index: number) => {
        // We add 1 to index because we are skipping the main image (index 0) in our map
        setProductData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index + 1) }));
    }

    // --- Dynamic List Handlers ---
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...productData.features];
        newFeatures[index] = value;
        setProductData(prev => ({ ...prev, features: newFeatures }));
    };
    const addFeature = () => setProductData(prev => ({ ...prev, features: [...prev.features, ''] }));
    const removeFeature = (index: number) => setProductData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));

    const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecifications = [...productData.specifications];
        newSpecifications[index] = { ...newSpecifications[index], [field]: value };
        setProductData(prev => ({ ...prev, specifications: newSpecifications }));
    };

    const addSpecification = () => {
        setProductData(prev => ({
            ...prev,
            specifications: [
                ...prev.specifications,
                { id: `spec${Date.now()}`, key: '', value: '' }
            ]
        }));
    };

    const removeSpecification = (index: number) => {
        setProductData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };


    // --- Main Save Function ---
    const handleSaveProduct = () => {
        // In a real app, you would first upload the base64 images to a storage service (like S3 or Firebase Storage),
        // get back the URLs, and then save those URLs in your database along with the rest of the productData.
        console.log("Saving Product Data:", JSON.stringify(productData, null, 2));
        alert('Product data has been logged to the console! Ready to be sent to a database.');
    };
    
    // --- Render Logic ---
    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Create New Product Post</h1>
                    <button onClick={handleSaveProduct} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 font-semibold">
                        Save Product
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md space-y-6">
                         <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">Product Images</h2>
                         <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Main Image</label>
                            <label htmlFor="main-image-upload" className="cursor-pointer">
                                <div className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-gray-500 hover:bg-gray-50 hover:border-gray-400">
                                   {productData.images[0] && !productData.images[0].startsWith('https://placehold') ? (
                                        <img src={productData.images[0]} alt="Main product preview" className="w-full h-full object-cover rounded-lg"/>
                                   ) : (
                                       <>
                                        <UploadIcon />
                                        <span>Click to upload</span>
                                       </>
                                   )}
                                </div>
                            </label>
                            <input id="main-image-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 0)} />
                         </div>
                         <div>
                            <div className="flex justify-between items-center">
                               <label className="block text-sm font-medium text-gray-600 mb-2">Image Gallery</label>
                               <button onClick={addGalleryImageSlot} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">Add Slot</button>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                {productData.images.slice(1).map((imgSrc, index) => (
                                    <div key={index} className="relative">
                                        <label htmlFor={`gallery-upload-${index}`} className="cursor-pointer">
                                            <img src={imgSrc} alt={`Gallery thumbnail ${index+1}`} className="w-full h-24 object-cover rounded-md border" />
                                        </label>
                                        <input id={`gallery-upload-${index}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, index + 1)} />
                                        <button onClick={() => removeGalleryImage(index)} className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-6">
                        <div className="border-b pb-6">
                             <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Product Name</label>
                                    <input type="text" name="name" value={productData.name} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Price (₹)</label>
                                    <input type="number" name="price" value={productData.price} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" />
                                </div>
                             </div>
                        </div>
                        
                        <div className="border-b pb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-gray-700">Features</h2>
                                <button onClick={addFeature} className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"><PlusIcon /> Add Feature</button>
                            </div>
                            <div className="space-y-2">
                                {productData.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="w-full p-2 border rounded-md" />
                                        <button onClick={() => removeFeature(index)}><TrashIcon /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-b pb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-gray-700">Product Specifications</h2>
                                <button onClick={addSpecification} className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"><PlusIcon /> Add Spec</button>
                            </div>
                            <div className="space-y-2">
                                {productData.specifications.map((spec, index) => (
                                    <div key={spec.id} className="grid grid-cols-12 items-center gap-2">
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                                            className="col-span-5 w-full p-2 border rounded-md"
                                            placeholder="Specification Name"
                                        />
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                                            className="col-span-6 w-full p-2 border rounded-md"
                                            placeholder="Specification Value"
                                        />
                                        <div className="col-span-1 flex justify-center">
                                            <button onClick={() => removeSpecification(index)}><TrashIcon /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                         <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Detailed Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Description</label>
                                    <textarea name="description" value={productData.description} onChange={handleInputChange} rows={4} className="mt-1 w-full p-2 border rounded-md"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Warranty & Return</label>
                                    <textarea name="warrantyInfo" value={productData.warrantyInfo} onChange={handleInputChange} rows={3} className="mt-1 w-full p-2 border rounded-md"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">More Information</label>
                                    <textarea name="moreInfo" value={productData.moreInfo} onChange={handleInputChange} rows={3} className="mt-1 w-full p-2 border rounded-md"></textarea>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductPage;

