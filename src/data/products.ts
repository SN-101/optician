// products.ts
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  descriptionEn: string;
  descriptionFr: string;
  price: number;
  type: 'medical' | 'sunglasses';
  gender: 'men' | 'women' | 'kids';
  color: string;
  image: string;
  glasses: string;
  rating: number;
  scaleMultiplier?: number; // ✅ جديد
}

export const products: Product[] = [
  {
    id: '1',
    name: 'نظارة طبية كلاسيكية',
    nameEn: 'Classic Medical Glasses',
    nameFr: 'Lunettes Médicales Classiques',
    description: 'إطار معدني أنيق بتصميم كلاسيكي مناسب للاستخدام اليومي',
    descriptionEn: 'Elegant metal frame with classic design suitable for daily use',
    descriptionFr: 'Monture métallique élégante au design classique adaptée à un usage quotidien',
    price: 450,
    type: 'medical',
    gender: 'men',
    color: 'أسود',
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses: `${import.meta.env.BASE_URL}glasses/id1.png`,
    rating: 4.5,
    scaleMultiplier: 2.2 // ✅
  },
  {
    id: '2',
    name: 'نظارة شمسية عصرية نسائية',
    nameEn: 'Modern Women Sunglasses',
    nameFr: 'Lunettes de Soleil Modernes pour Femmes',
    description: 'تصميم عصري مع حماية كاملة من الأشعة فوق البنفسجية',
    descriptionEn: 'Modern design with full UV protection',
    descriptionFr: 'Design moderne avec protection UV complète',
    price: 550,
    type: 'sunglasses',
    gender: 'women',
    color: 'بني',
    image: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=600', // ✅ مسافة زائدة أزيلت
    glasses: `${import.meta.env.BASE_URL}glasses/id2.png`,
    rating: 4.8,
    scaleMultiplier: 2.3
  },
  {
    id: '3',
    name: 'نظارة طبية للأطفال',
    nameEn: 'Kids Medical Glasses',
    nameFr: 'Lunettes Médicales pour Enfants',
    description: 'إطار مرن ومريح مصمم خصيصاً للأطفال',
    descriptionEn: 'Flexible and comfortable frame specially designed for kids',
    descriptionFr: 'Monture flexible et confortable spécialement conçue pour les enfants',
    price: 350,
    type: 'medical',
    gender: 'kids',
    color: 'أزرق',
    image: 'https://images.pexels.com/photos/1476215/pexels-photo-1476215.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id3.png`,
    rating: 4.6,
    scaleMultiplier: 1.8 // الأطفال → حجم أصغر
  },
  {
    id: '4',
    name: 'نظارة شمسية رياضية رجالية',
    nameEn: 'Men Sports Sunglasses',
    nameFr: 'Lunettes de Soleil Sport pour Hommes',
    description: 'مثالية للأنشطة الرياضية مع عدسات مستقطبة',
    descriptionEn: 'Perfect for sports activities with polarized lenses',
    descriptionFr: 'Parfait pour les activités sportives avec verres polarisés',
    price: 650,
    type: 'sunglasses',
    gender: 'men',
    color: 'أسود',
    image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id4.png`,
    rating: 4.7,
    scaleMultiplier: 2.7
  },
  {
    id: '5',
    name: 'نظارة طبية أنيقة نسائية',
    nameEn: 'Elegant Women Medical Glasses',
    nameFr: 'Lunettes Médicales Élégantes pour Femmes',
    description: 'تصميم أنيق وعصري بإطار أسود لامع',
    descriptionEn: 'Elegant and modern design with glossy black frame',
    descriptionFr: 'Design élégant et moderne avec monture noire brillante',
    price: 480,
    type: 'medical',
    gender: 'women',
    color: 'أسود',
    image: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id5.png`, // ✅ تم استبدال 'hi'
    rating: 4.9,
    scaleMultiplier: 2.0
  },
  {
    id: '6',
    name: 'نظارة شمسية كلاسيكية',
    nameEn: 'Classic Sunglasses',
    nameFr: 'Lunettes de Soleil Classiques',
    description: 'تصميم كلاسيكي خالد لا يتأثر بالموضة',
    descriptionEn: 'Timeless classic design that never goes out of style',
    descriptionFr: 'Design classique intemporel qui ne se démode jamais',
    price: 520,
    type: 'sunglasses',
    gender: 'men',
    color: 'بني',
    image: 'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id6.png`,
    rating: 4.4,
    scaleMultiplier: 2.2
  },
  {
    id: '7',
    name: 'نظارة طبية عصرية',
    nameEn: 'Modern Medical Glasses',
    nameFr: 'Lunettes Médicales Modernes',
    description: 'إطار بلاستيكي خفيف بتصميم عصري',
    descriptionEn: 'Lightweight plastic frame with modern design',
    descriptionFr: 'Monture plastique légère au design moderne',
    price: 420,
    type: 'medical',
    gender: 'men',
    color: 'رمادي',
    image: 'https://images.pexels.com/photos/1743394/pexels-photo-1743394.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id7.png`,
    rating: 4.3,
    scaleMultiplier: 2.0
  },
  {
    id: '8',
    name: 'نظارة شمسية فاخرة نسائية',
    nameEn: 'Luxury Women Sunglasses',
    nameFr: 'Lunettes de Soleil de Luxe pour Femmes',
    description: 'تصميم فاخر مع تفاصيل ذهبية راقية',
    descriptionEn: 'Luxury design with elegant gold details',
    descriptionFr: 'Design luxueux avec des détails dorés élégants',
    price: 750,
    type: 'sunglasses',
    gender: 'women',
    color: 'ذهبي',
    image: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id8.png`,
    rating: 5.0,
    scaleMultiplier: 2.5
  },
  {
    id: '9',
    name: 'نظارة شمسية ملونة للأطفال',
    nameEn: 'Colorful Kids Sunglasses',
    nameFr: 'Lunettes de Soleil Colorées pour Enfants',
    description: 'نظارة شمسية ملونة ومرحة للأطفال مع حماية كاملة',
    descriptionEn: 'Colorful and playful sunglasses for kids with full protection',
    descriptionFr: 'Lunettes de soleil colorées et ludiques pour enfants avec protection complète',
    price: 280,
    type: 'sunglasses',
    gender: 'kids',
    color: 'أحمر',
    image: 'https://images.pexels.com/photos/834949/pexels-photo-834949.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses:`${import.meta.env.BASE_URL}glasses/id9.png`,
    rating: 4.5,
    scaleMultiplier: 1.7
  },
  {
    id: '10',
    name: 'نظارة طبية مع إطار خشبي',
    nameEn: 'Medical Glasses with Wooden Frame',
    nameFr: 'Lunettes Médicales avec Monture en Bois',
    description: 'تصميم فريد بإطار خشبي طبيعي صديق للبيئة',
    descriptionEn: 'Unique design with natural eco-friendly wooden frame',
    descriptionFr: 'Design unique avec monture en bois naturel écologique',
    price: 580,
    type: 'medical',
    gender: 'women',
    color: 'بني',
    image: 'https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses: `${import.meta.env.BASE_URL}glasses/id10.png`,
    rating: 4.7,
    scaleMultiplier: 2.1
  },
  {
    id: '11',
    name: 'نظارة شمسية بايلوت',
    nameEn: 'Pilot Sunglasses',
    nameFr: 'Lunettes de Soleil Aviateur',
    description: 'تصميم الطيار الكلاسيكي بإطار معدني',
    descriptionEn: 'Classic pilot design with metal frame',
    descriptionFr: 'Design aviateur classique avec monture métallique',
    price: 620,
    type: 'sunglasses',
    gender: 'men',
    color: 'فضي',
    image: 'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses: `${import.meta.env.BASE_URL}glasses/id11.png`,
    rating: 4.6,
    scaleMultiplier: 2.6 // النظارات الطيار عادة أوسع
  },
  {
    id: '12',
    name: 'نظارة طبية مرنة للأطفال',
    nameEn: 'Flexible Kids Medical Glasses',
    nameFr: 'Lunettes Médicales Flexibles pour Enfants',
    description: 'إطار فائق المرونة وآمن للأطفال النشطين',
    descriptionEn: 'Super flexible and safe frame for active kids',
    descriptionFr: 'Monture super flexible et sûre pour les enfants actifs',
    price: 380,
    type: 'medical',
    gender: 'kids',
    color: 'أخضر',
    image: 'https://images.pexels.com/photos/1694410/pexels-photo-1694410.jpeg?auto=compress&cs=tinysrgb&w=600',
    glasses: `${import.meta.env.BASE_URL}glasses/id12.png`,
    rating: 4.8,
    scaleMultiplier: 1.8
  }
];
