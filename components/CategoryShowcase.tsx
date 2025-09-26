import React from 'react';
import Image from 'next/image';

interface CategorySection {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
  layout: 'imageLeft' | 'imageRight';
}

const sectionsData: CategorySection[] = [

  {
    id: 1,
    title: 'DUFFLE BAGS',
  
    imageUrl: '/assets/Hero/Component 24.png',
    imageAlt: 'Pair of brown leather shoes',
    layout: 'imageLeft',
  },
 
  {
    id: 2,
    title: 'SLING BAGS',
    
    imageUrl: '/assets/Hero/IMG_5545 1.png',
    imageAlt: 'Red duffle bag floating in a desert scene',
    layout: 'imageRight',
  },
 
  {
    id: 3,
    title: 'PREMIUM WALLETS',
   
    imageUrl: '/assets/Hero/IMG_5738 1.png',
    imageAlt: 'Stack of black leather wallets',
    layout: 'imageLeft',
  },
  
  {
    id: 4,
    title: 'TROLLEY',
    
    imageUrl: '/assets/Hero/ANI01001 1.png',
    imageAlt: 'Man and woman in leather jackets',
    layout: 'imageRight',
  },

  {
    id: 5,
    title: 'JACKETS',
  
    imageUrl: '/assets/Hero/image 81.png',
    imageAlt: 'Brown leather belt with buckle',
    layout: 'imageLeft',
  },
  
  {
    id: 6,
    title: 'GLOVES',
    
    imageUrl: '/assets/Hero/image 83.png',
    imageAlt: 'Man wearing a black leather sling bag',
    layout: 'imageRight',
  },
 
  {
    id: 7,
    title: 'SHOES',
  
    imageUrl: '/assets/Hero/image 85.png',
    imageAlt: 'Person pulling a black cylindrical trolley bag',
    layout: 'imageLeft',
  },

  {
    id: 8,
    title: 'BELT',
    
    imageUrl: '/assets/Hero/image 86.png',
    imageAlt: 'Hands wearing black leather driving gloves on a steering wheel',
    layout: 'imageRight',
  },
  
];

const CategoryShowcase: React.FC = () => {
  return (
    <div className="bg-black text-white font-serif">
      {sectionsData.map((section, index) => {
       
        const imageFirst = section.layout === 'imageLeft';
        const imageOrder = imageFirst ? 'order-1' : 'md:order-2 order-2';
        const textOrder = imageFirst ? 'order-2' : 'md:order-1 order-1';

        
        const isLeftImageText = index % 2 === 0;
        
        return (
          <div 
            key={section.id} 
            className="grid grid-cols-1 md:grid-cols-2 min-h-[30rem] mb-16"
          >
           
            <div 
              className={`relative aspect-video md:aspect-auto h-full min-h-[15rem] ${imageFirst ? 'md:order-1' : 'md:order-2'}`}
            >
              <Image
                src={section.imageUrl}
                alt={section.imageAlt}
                layout="fill"
                objectFit="cover"
                priority={false}
              />
            </div>
            
           
            <div 
              className={`flex items-center p-8 sm:p-12 md:p-16 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}
            >
              <div className="max-w-md">
                <h2 className="text-5xl md:text-6xl font-normal tracking-wide mb-6 uppercase">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-300 mb-8">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s,
                </p>
               
                <div className="flex items-center text-xs font-light tracking-wider uppercase cursor-pointer group">
                  <span className="mr-4">More</span>
                  <div className="h-px w-10 bg-white/70 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      
      <div className="relative w-full aspect-[2.5/1] overflow-hidden mb-10">
        <Image
         
          src="/assets/Hero/Rectangle 356.png"
          alt="Man and woman wearing leather jackets"
          layout="fill"
          objectFit="cover"
          priority={false}
        />
      </div>

       <section className="relative w-[1227px] h-[616px] py-16 sm:py-24 md:py-32 left-1 mb-6 gap-6">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
           
            src="/assets/Hero/Rectangle 635.png"
            alt="Light textured background"
            layout="fill"
            objectFit="cover"
            priority={false}
            className="opacity-70" // Slightly fade the background image
          />
        </div>
        
      
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/5 md:bg-transparent rounded-lg p-6 ">
          <h2 className="text-center text-4xl font-normal tracking-widest text-yellow-800 mb-12 uppercase">
            JAIL LUXURY
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-start">
            
           
            <div className="relative w-full aspect-[4/3] md:aspect-auto overflow-hidden rounded-lg shadow-xl">
             <Image
               
                src="/assets/Hero/girimage.png" 
                alt="Woman modeling a leather jacket"
                layout="fill"
                objectFit="cover"
                priority={false}
                className="rounded-lg z-1"
              />
            </div>

            
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl">
              <h3 className="text-3xl font-light text-black mb-6">
                Why jail ?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                The name **"Jail" is more than just a brand**. It's a nod to our
                roots. The original shop was located on Jail Road in Banka, and the name
                was born out of the simplicity of direction "Jail
                Road, Jail Road." Today, it stands as a symbol of
                our journey, from a small shop in Bihar to a
                **luxury brand** that resonates with customers
                around the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default CategoryShowcase;