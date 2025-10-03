import Naavbar from '@/components/Naavbar'
import ProductListingPage from '@/components/product/productview'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getCategoryBySlug, getSubcategoryBySlug, getProductsBySubcategory } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'

interface SubcategoryPageProps {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = getCategoryBySlug(categorySlug)
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug)
  
  if (!category || !subcategory) {
    notFound()
  }

  const products = getProductsBySubcategory(categorySlug, subcategorySlug)
  const breadcrumbItems = [
    { name: category.name, href: `/${category.slug}` },
    { name: subcategory.name, href: `/${category.slug}/${subcategory.slug}`, current: true }
  ]

  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <Naavbar/>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Fixed Header */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-4">
              <h1 className="text-4xl font-bold text-black dark:text-white mb-4">{subcategory.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">{subcategory.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductListingPage 
            categoryName={subcategory.name}
            products={products}
          />
        </div>
      </div>
    </div>
  )
}

export default SubcategoryPage;
