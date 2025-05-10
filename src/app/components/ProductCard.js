'use client';

import CartButton from './CartButton';
import CachedImage from '@/components/CachedImage';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  const {
    name,
    price,
    image,
    unit,
    discount,
    rating,
    numberOfReviews
  } = product;

  const discountedPrice = discount > 0 
    ? price * (1 - discount / 100)
    : price;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative">
        <CachedImage 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">
            ({numberOfReviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through mr-2">
                ${price.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-green-600">
              ${discountedPrice.toFixed(2)}/{unit}
            </span>
          </div>
          <CartButton 
            product={product} 
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 