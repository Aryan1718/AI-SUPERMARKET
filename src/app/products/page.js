'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useUser } from '@/context/UserContext';

const categories = [
  'fruits',
  'vegetables',
  'dairy',
  'meat',
  'pantry',
  'beverages',
  'snacks',
  'household'
];

export default function ProductsPage() {
  const [products, setProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsByCategory = {};
        
        // Get user preference first
        const userPreference = user?.preference;
        console.log('User preference:', userPreference);
        
        for (const category of categories) {
          // Skip categories based on user preference
          if (userPreference === 'veg' && category === 'meat') {
            continue;
          }
          if (userPreference === 'vegan' && (category === 'meat' || category === 'dairy')) {
            continue;
          }
          
          console.log(`Fetching products for ${category}...`);
          const response = await fetch(`/api/products/category/${category}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log(`Received ${data.length} products for ${category}`);
          productsByCategory[category] = data;
        }
        
        setProducts(productsByCategory);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]); // Add user as dependency to refetch when user changes

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-600 text-center">
            <h2 className="text-2xl font-bold mb-2">Error loading products</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>
        {user && (
          <div className="mb-4 text-gray-600">
            Showing {
              user.preference === 'vegan' ? 'vegan' :
              user.preference === 'veg' ? 'vegetarian' : 'all'
            } products
          </div>
        )}
        
        {categories.map((category) => {
          const categoryProducts = products[category] || [];
          
          if (categoryProducts.length === 0) {
            return null;
          }

          return (
            <section key={category} className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
} 