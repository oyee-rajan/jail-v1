import JailLuxuryFooter from '@/components/Jailfooter'
import JailLuxurySection from '@/components/JailLuxurySection'
import Naavbar from '@/components/Naavbar'
import SimpleProductMain from '@/components/product/SimpleProductMain'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getCategoryBySlug, getSubcategoryBySlug, getProductById } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'

interface ProductPageProps {
  params: Promise<{
    category: string
    subcategory: string
    'product-id': string
  }>
}

const ProductSpecification = async ({ params }: ProductPageProps) => {
  const { category: categorySlug, subcategory: subcategorySlug, 'product-id': productId } = await params;
  
  const category = getCategoryBySlug(categorySlug);
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
  const product = getProductById(productId);
  
  if (!category || !subcategory || !product) {
    notFound();
  }

  const breadcrumbItems = [
    { name: category.name, href: `/${category.slug}` },
    { name: subcategory.name, href: `/${category.slug}/${subcategory.slug}` },
    { name: product.name, href: `/${category.slug}/${subcategory.slug}/${productId}`, current: true }
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <Naavbar/>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <SimpleProductMain product={product}/>
        <JailLuxurySection/>
        <JailLuxuryFooter/>
      </div>
    </div>
  )
}

export default ProductSpecification