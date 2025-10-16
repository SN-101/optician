import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products, Product } from '../data/products';

interface BookingPageProps {
  selectedProductId?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({ selectedProductId }) => {
  const { language, t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    productId: selectedProductId || '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedProductId) {
      setFormData(prev => ({ ...prev, productId: selectedProductId }));
    }
  }, [selectedProductId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setError(t.booking?.form?.error || 'Please fill all required fields');
      return;
    }

    console.log('Booking submitted:', formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        productId: '',
        notes: ''
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return '';
    return language === 'ar' ? product.name :
           language === 'en' ? product.nameEn :
           product.nameFr;
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t.booking?.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.booking?.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isRTL ? 'تم إرسال الحجز بنجاح!' : 'Booking Sent Successfully!'}
            </h2>
            <p className="text-gray-600">
              {t.booking?.form?.success}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className={`h-5 w-5 text-red-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.booking?.form?.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={t.booking?.form?.name}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t.booking?.form?.phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+966 50 123 4567"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t.booking?.form?.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t.booking?.form?.date} *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getTodayDate()}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t.booking?.form?.time} *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">{isRTL ? 'اختر الوقت' : 'Select time'}</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  {t.booking?.form?.product}
                </label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">{isRTL ? 'اختر نظارة (اختياري)' : 'Select glasses (optional)'}</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {getProductName(product.id)} - {product.price} {t.products?.mad}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t.booking?.form?.notes}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={isRTL ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                {t.booking?.form?.submit}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {isRTL ? 'معلومات مهمة:' : 'Important Information:'}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>{isRTL ? 'سنتواصل معك خلال 24 ساعة لتأكيد الموعد' : 'We will contact you within 24 hours to confirm'}</li>
                <li>{isRTL ? 'يمكنك إلغاء أو تعديل الموعد مجاناً قبل 12 ساعة' : 'Free cancellation or modification up to 12 hours before'}</li>
                <li>{isRTL ? 'الفحص الطبي متاح مع طبيب مختص' : 'Medical examination available with specialist'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
