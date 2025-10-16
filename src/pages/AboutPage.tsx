import React from 'react';
import { MapPin, Clock, Phone, Mail, Award, Users, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    {
      icon: Award,
      title: isRTL ? 'الجودة' : 'Quality',
      description: isRTL ? 'نلتزم بتقديم أفضل المنتجات من الماركات العالمية' : 'We commit to providing the best products from global brands',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: isRTL ? 'الخبرة' : 'Expertise',
      description: isRTL ? 'فريق محترف من الخبراء لمساعدتك في الاختيار الأمثل' : 'Professional team of experts to help you make the best choice',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Shield,
      title: isRTL ? 'الضمان' : 'Warranty',
      description: isRTL ? 'ضمان شامل على جميع منتجاتنا' : 'Comprehensive warranty on all our products',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Heart,
      title: isRTL ? 'رضا العملاء' : 'Customer Satisfaction',
      description: isRTL ? 'رضاكم هدفنا الأول ونسعى دائماً لتجاوز توقعاتكم' : 'Your satisfaction is our top priority',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t.about?.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.about?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div
            className="h-96 bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1446610/pexels-photo-1446610.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          />
          <div
            className="h-96 bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800)'
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${value.bgColor} rounded-full mb-4`}>
                  <Icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4 mx-auto">
              <MapPin className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {t.about?.location?.title}
            </h3>
            <p className="text-gray-600 text-center">
              {t.about?.location?.address}
            </p>
            <div className="mt-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.399775!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ4LjgiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Store Location"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {t.about?.hours?.title}
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800 mb-1">
                  {isRTL ? 'السبت - الخميس' : 'Saturday - Thursday'}
                </p>
                <p className="text-sm">
                  {isRTL ? '9:00 صباحاً - 10:00 مساءً' : '9:00 AM - 10:00 PM'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800 mb-1">
                  {isRTL ? 'الجمعة' : 'Friday'}
                </p>
                <p className="text-sm">
                  {isRTL ? '4:00 مساءً - 10:00 مساءً' : '4:00 PM - 10:00 PM'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {t.about?.contact?.title}
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center justify-center">
                <Phone className={`h-5 w-5 text-amber-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <a
                  href="tel:+966501234567"
                  className="hover:text-amber-600 transition-colors"
                >
                  {t.about?.contact?.phone}
                </a>
              </div>
              <div className="flex items-center justify-center">
                <Mail className={`h-5 w-5 text-amber-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <a
                  href="mailto:info@opticsstore.com"
                  className="hover:text-amber-600 transition-colors"
                >
                  {t.about?.contact?.email}
                </a>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-center">
                  {isRTL ? 'متاح للرد على استفساراتكم' : 'Available to answer your inquiries'}
                </p>
                <p className="text-sm text-center font-semibold text-gray-800 mt-1">
                  {isRTL ? 'السبت - الخميس: 9:00 ص - 10:00 م' : 'Sat - Thu: 9 AM - 10 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isRTL ? 'زرنا اليوم واحصل على استشارة مجانية!' : 'Visit Us Today for Free Consultation!'}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {isRTL ? 'فريقنا جاهز لمساعدتك في اختيار النظارة المثالية' : 'Our team is ready to help you choose the perfect glasses'}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {isRTL ? 'احجز موعد الآن' : 'Book Appointment Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
