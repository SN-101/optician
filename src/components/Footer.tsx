import React from 'react';
import { Glasses, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Glasses className="h-8 w-8 text-amber-500" />
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-xl font-bold`}>
                {t.siteName}
              </span>
            </div>
            <p className="text-gray-400">
              {t.about?.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.about?.contact?.title}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className={`h-5 w-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-400">{t.about?.contact?.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className={`h-5 w-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-400">{t.about?.contact?.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className={`h-5 w-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                <span className="text-gray-400">{t.about?.location?.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.about?.hours?.title}</h3>
            <div className="space-y-2 text-gray-400">
              <p>{t.about?.hours?.weekdays}</p>
              <p>{t.about?.hours?.friday}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {t.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
