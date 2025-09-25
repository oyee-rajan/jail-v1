import Image from 'next/image';
import React from 'react';

const HomePageContent: React.FC = () => {
    return (
        <div className="bg-neutral-800 text-white min-h-screen">

            {/* Hero Section - ALIBI Banner */}
            {/* Hero Section - ALIBI Banner */}
            <div className="relative w-full h-[500px]">

                {/* CORRECTED SRC PATH: /assets/Hero/herobanner.png */}

                <Image
                    src="/assets/Hero/herobanner.png"
                    alt="Quality Leather Goods Hero Banner"
                    fill
                    priority
                    className=" z-1 object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 100vw"
                />

                <div>

                </div>
                <button className=' absolute bg-gray-400 w-[245px] h-11 top-[452px] bottom-4 left-1/2 rounded-md z-2 -translate-x-1/2'>View Collecton</button>
                <h2 className=' absolute top-[500px] left-145  font-light text-[20px] leading-[120%] tracking-[0.14em] w-[203px] h-[24px] opacity-100 z-2 text-white'>From our gallery</h2>

            </div>


            <img src="/assets/Hero/image.png" alt="" className='gap-1 top-[510px]' />

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">


                <div className=' flex gap-1 mb-16 justify-between'>
                    <div className="  w-[630px] h-[455px] bg-[url('/assets/Hero/Component%2024.png')] bg-cover bg-no-repeat opacity-100">
                        <div className=' relative flex flex-col  items-center  justify-center gap-1  '>
                            <h1 className=' w-[156px] h-[48px] font-normal text-[40px] leading-[120%] tracking-[0.14em] opacity-100 font-archivo '>DUFFLE</h1>
                            <p className='w-[360px] h-[22px]  text-[20px] leading-[120%] tracking-[0em] opacity-100 font-poppins font-[200] pl-4 '>Crafted for every on the go moment </p>
                        </div>
                        <div className=' flex pl-50 pt-75 '>

<button className=' bg-black h-[36px] w-[130px] relative '>Shop</button>

                        </div>

                        
                    </div>
                    <div className="w-[630px] h-[455px] bg-[url('/assets/Hero/Wallet.png')] bg-cover bg-no-repeat opacity-100">
                        {/* <h1 className='w-[156px] h-[48px] font-normal text-[40px] leading-[120%] tracking-[0.14em] opacity-100'>WALLET</h1>
        <h3>Made to feel the worth</h3>
        <button>Shop</button>*/}</div>
                </div>

                {/* another section */}

                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>





                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Featured Product Image (Bag)
                    </div>
                    <div className="w-full md:w-1/3 text-left">
                        <h2 className="text-4xl font-light mb-4">ALIBI BAGS</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            EXPLORE
                        </button>
                    </div>
                </div>

                {/* Grid of Medium Product Images (Middle Grid) */}
                {/* This section has 3 images side by side */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-full h-72 bg-neutral-700 flex items-center justify-center text-gray-400 text-base">
                            Product Category Image {i + 1}
                        </div>
                    ))}
                </div>

                {/* Featured Product Section 2 (Images with models) */}
                {/* Two large images, likely showing models wearing/using products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                    <div className="w-full h-[600px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Model Image 1
                    </div>
                    <div className="w-full h-[600px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Model Image 2
                    </div>
                </div>

                {/* Section: SLING BAGS */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Sling Bag Image
                    </div>
                    <div className="w-full md:w-1/3 text-right"> {/* Text aligned right */}
                        <h2 className="text-4xl font-light mb-4">SLING BAGS</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            VIEW ALL
                        </button>
                    </div>
                </div>

                {/* Section: TRAVEL BAG */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Travel Bag Image
                    </div>
                    <div className="w-full md:w-1/3 text-left">
                        <h2 className="text-4xl font-light mb-4">TRAVEL BAG</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            SHOP NOW
                        </button>
                    </div>
                </div>

                {/* Section: PREMIUM WALLETS */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Wallets Image
                    </div>
                    <div className="w-full md:w-1/3 text-right">
                        <h2 className="text-4xl font-light mb-4">PREMIUM WALLETS</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            DISCOVER MORE
                        </button>
                    </div>
                </div>

                {/* Section: TIMELESS */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Timeless Product Image
                    </div>
                    <div className="w-full md:w-1/3 text-left">
                        <h2 className="text-4xl font-light mb-4">TIMELESS</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            EXPLORE
                        </button>
                    </div>
                </div>

                {/* Section: JACKETS */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Jackets Image
                    </div>
                    <div className="w-full md:w-1/3 text-right">
                        <h2 className="text-4xl font-light mb-4">JACKETS</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            BROWSE
                        </button>
                    </div>
                </div>

                {/* Section: GLOVES */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Gloves Image
                    </div>
                    <div className="w-full md:w-1/3 text-left">
                        <h2 className="text-4xl font-light mb-4">GLOVES</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            FIND YOURS
                        </button>
                    </div>
                </div>

                {/* Section: SHOES */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
                    <div className="w-full md:w-2/3 h-[500px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Shoes Image
                    </div>
                    <div className="w-full md:w-1/3 text-right">
                        <h2 className="text-4xl font-light mb-4">SHOES</h2>
                        <p className="text-gray-300 leading-relaxed">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-neutral-900 transition-colors duration-300">
                            VIEW COLLECTION
                        </button>
                    </div>
                </div>

                {/* Two Large Lifestyle Images (Bottom Section) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                    <div className="w-full h-[600px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Lifestyle Image 1
                    </div>
                    <div className="w-full h-[600px] bg-neutral-700 flex items-center justify-center text-gray-400 text-xl">
                        Lifestyle Image 2
                    </div>
                </div>

                {/* About Us Section (White Box with Text and Image) */}
                <div className="bg-white text-neutral-900 p-8 md:p-12 flex flex-col md:flex-row gap-8 mb-16">
                    <div className="w-full md:w-1/3 h-80 bg-neutral-300 flex items-center justify-center text-gray-600 text-base">
                        About Us Image (Model)
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-3xl font-light mb-4">ABOUT ALIBI</h2>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br /><br />
                            Curabitur pretium tincidunt lacus. Nulla facilisi. Nullam faucibus mi quis velit. Curabitur convallis arcu.
                        </p>
                        <button className="mt-6 px-6 py-2 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors duration-300">
                            READ MORE
                        </button>
                    </div>
                </div>

            </div> {/* End max-w-7xl div */}

            {/* Footer Section */}
            <footer className="bg-neutral-900 text-gray-400 p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg mb-4">ALIBI</h3>
                        <p className="text-sm">Quality Leather Goods since 1990.</p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg mb-4">CATEGORIES</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/bags" className="hover:text-white transition-colors">Bags</a></li>
                            <li><a href="/wallets" className="hover:text-white transition-colors">Wallets</a></li>
                            <li><a href="/apparel" className="hover:text-white transition-colors">Apparel</a></li>
                            <li><a href="/accessories" className="hover:text-white transition-colors">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg mb-4">SUPPORT</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg mb-4">FOLLOW US</h3>
                        <div className="flex space-x-4 text-xl">
                            <a href="#" className="hover:text-white transition-colors"> {/* FiFacebook */} 📘 </a>
                            <a href="#" className="hover:text-white transition-colors"> {/* FiInstagram */} 📸 </a>
                            <a href="#" className="hover:text-white transition-colors"> {/* FiTwitter */} 🐦 </a>
                        </div>
                        <p className="mt-4 text-sm">&copy; 2023 ALIBI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePageContent;