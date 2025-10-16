import React, { useState, useMemo } from 'react';
import { Search, Heart, Calendar, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWishlist } from '../contexts/WishlistContext';
import { products, Product } from '../data/products';

interface ProductsPageProps {
  onNavigate: (page: string, productId?: string) => void;
  onTryOn: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, onTryOn }) => {
  const { language, t, isRTL } = useLanguage();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');

  const uniqueColors = useMemo(() => {
    const colors = products.map(p => p.color);
    return Array.from(new Set(colors));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const nameToSearch = language === 'ar' ? product.name :
                          language === 'en' ? product.nameEn :
                          product.nameFr;

      const matchesSearch = nameToSearch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || product.type === selectedType;
      const matchesGender = selectedGender === 'all' || product.gender === selectedGender;
      const matchesColor = selectedColor === 'all' || product.color === selectedColor;

      return matchesSearch && matchesType && matchesGender && matchesColor;
    });
  }, [searchTerm, selectedType, selectedGender, selectedColor, language]);

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

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t.products?.title}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} h-5 w-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t.products?.filters?.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">{t.products?.filters?.all} - {t.products?.filters?.type}</option>
              <option value="medical">{t.products?.filters?.medical}</option>
              <option value="sunglasses">{t.products?.filters?.sunglasses}</option>
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">{t.products?.filters?.all} - {t.products?.filters?.gender}</option>
              <option value="men">{t.products?.filters?.men}</option>
              <option value="women">{t.products?.filters?.women}</option>
              <option value="kids">{t.products?.filters?.kids}</option>
            </select>

            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">{t.products?.filters?.all} - {t.products?.filters?.color}</option>
              {uniqueColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {filteredProducts.length} {isRTL ? 'منتج' : 'products'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                  onClick={() => handleToggleWishlist(product)}
                  className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {isRTL ? 'لا توجد منتجات مطابقة للبحث' : 'No products match your search'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
