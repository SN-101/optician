import React from 'react';
import { Heart, Calendar, Camera, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Product } from '../data/products';

interface WishlistPageProps {
  onNavigate: (page: string, productId?: string) => void;
  onTryOn: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate, onTryOn }) => {
  const { language, t, isRTL } = useLanguage();
  const { wishlist, removeFromWishlist } = useWishlist();

  const getProductName = (product: Product) => {
    return language === 'ar' ? product.name :
           language === 'en' ? product.nameEn :
           product.nameFr;
  };

  const getProductDescription = (product: Product) => {
    return language === 'ar' ? product.description :
           language === 'en' ? product.descriptionEn :
           product.descriptionFr;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t.wishlist?.title}
          </h1>
          <p className="text-gray-600">
            {wishlist.length} {t.wishlist?.items}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-600 mb-6">{t.wishlist?.empty}</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              {isRTL ? 'تصفح المنتجات' : 'Browse Products'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={getProductName(product)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 hover:scale-110 transition-all`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {getProductName(product)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {getProductDescription(product)}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-600">
                      {product.price} {t.products?.mad}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onTryOn(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Camera className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t.products?.tryOn}
                    </button>
                    <button
                      onClick={() => onNavigate('booking', product.id)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Calendar className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t.products?.bookNow}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
