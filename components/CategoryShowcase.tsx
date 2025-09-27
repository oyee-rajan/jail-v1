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

      
      <div className="relative  aspect-[2.5/1] overflow-hidden mb-10 a  h-[733px] w-full ">
        <Image
         
          src="/assets/Hero/Rectangle 356.png"
          alt="Man and woman wearing leather jackets"
          layout="fill"
          objectFit="cover"
          priority={false}
        />
      </div>

      
      
    </div>
  );
};

export default CategoryShowcase;