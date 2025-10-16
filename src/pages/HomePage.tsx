import React from 'react';
import { Camera, Shield, Users, Tag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'feature1',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Camera,
      titleKey: 'feature2',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      titleKey: 'feature3',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Tag,
      titleKey: 'feature4',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const steps = [
    { number: '1', key: 'step1' },
    { number: '2', key: 'step2' },
    { number: '3', key: 'step3' },
    { number: '4', key: 'step4' }
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1446610/pexels-photo-1446610.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            {t.home?.hero?.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
            {t.home?.hero?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('products')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center"
            >
              {t.home?.hero?.cta}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white hover:bg-gray-100 text-amber-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center"
            >
              <Camera className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.home?.hero?.tryNow}
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            {t.home?.features?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const featureData = t.home?.features?.[feature.titleKey];
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-4`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {featureData?.title}
                  </h3>
                  <p className="text-gray-600">
                    {featureData?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            {t.home?.howItWorks?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.home?.howItWorks?.[step.key]}
                  </h3>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block absolute top-1/2 ${isRTL ? 'right-0' : 'left-full'} w-full h-0.5 bg-amber-300 transform -translate-y-1/2`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {isRTL ? 'جاهز لتجربة نظاراتنا؟' : 'Ready to try our glasses?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {isRTL ? 'احجز موعدك الآن واستمتع بخدمة استثنائية' : 'Book your appointment now and enjoy exceptional service'}
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            {t.nav?.booking}
          </button>
        </div>
      </section>
    </div>
  );
};
