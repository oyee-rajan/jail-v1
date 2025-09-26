import React from 'react';
import Image from 'next/image';

// Define the structure for the collection data
interface CollectionItem {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
}

// Updated data with the specified image paths and order
const collections: CollectionItem[] = [
  {
    id: 1,
    title: 'TRAVEL ESSENTIALS',
   
    imageUrl: '/assets/Hero/travel-essentials.png', 
    imageAlt: 'Black cylindrical travel bag on stone steps',
  },
  {
    id: 2,
    title: 'HYDRO COLLECTION',
 
    imageUrl: '/assets/Hero/suitcaseboys.png', 
    imageAlt: 'Two men standing on a rocky outcrop',
  },
  {
    id: 3,
    title: 'NEW ARRIVAL',
 
    imageUrl: '/assets/Hero/knife.png', 
    imageAlt: 'A multi-tool knife and leather pouch on a wooden surface',
  },
];

const CollectionDisplay: React.FC = () => {
  return (
  
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-3 p-4">
      {collections.map((collection) => (
       
        <div 
          key={collection.id} 
          className="flex-1 relative min-h-[400px] cursor-pointer overflow-hidden group"
        >
          
       
          <div className="absolute inset-0">
            <Image
              src={collection.imageUrl}
              alt={collection.imageAlt}
              layout="fill"
              objectFit="cover"
              
              className="brightness-75 group-hover:brightness-90 transition duration-300"
              priority={true}
            />
          </div>
          
       
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
         
            <h2 className="text-2xl font-bold mb-3 uppercase drop-shadow-lg">
              {collection.title}
            </h2>
            
            <button 
              className="
                bg-transparent 
                text-white 
                border 
                border-white 
                px-4 
                py-2 
                text-sm 
                uppercase 
                w-fit 
                hover:bg-white 
                hover:text-black 
                transition 
                duration-300
              "
              onClick={() => {  }}
            >
              VIEW COLLECTION
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionDisplay;