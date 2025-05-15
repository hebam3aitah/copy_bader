// 'use client';

// import Head from 'next/head';
// import Link from 'next/link';
// import HeroSection from './components/herosection';

// import { useState } from 'react';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   // أعلى الملف (خارج المكون)
// const partners = [
//   { name: "الشريك 1", logo: "" },
//   { name: "الشريك 2", logo: "" },
//   { name: "الشريك 3", logo: "" },
//   { name: "الشريك 4", logo: "" },
// ];


//   return (
//     <div className="min-h-screen bg-white" dir="rtl">
     
//      <HeroSection />

//       {/* قسم المميزات */}
//       <div className="py-16 px-4 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">كيف نعمل على تحسين الحي؟</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-[#662480] text-4xl mb-4 flex justify-center">
//                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تحديد المشاكل</h3>
//               <p className="text-gray-700 text-center">نستمع لسكان الحي ونقوم بتحليل ودراسة المشاكل الملحة التي تواجه مجتمعنا</p>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-[#fa9e1b] text-4xl mb-4 flex justify-center">
//                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تكوين فرق العمل</h3>
//               <p className="text-gray-700 text-center">نجمع المتطوعين والداعمين من أصحاب الخبرات المتنوعة للعمل على حل مشاكل الحي</p>
//             </div>
            
//             <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
//               <div className="text-[#31124b] text-4xl mb-4 flex justify-center">
//                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تنفيذ المشاريع</h3>
//               <p className="text-gray-700 text-center">ننفذ الحلول العملية ونقيم تأثيرها في المجتمع مع المتابعة المستمرة لضمان نجاحها</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* قسم الإحصائيات */}
//       <div className="py-16 px-4 bg-gray-50">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">أثر مبادرتنا بالأرقام</h2>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             <div className="bg-white rounded-lg p-6 shadow-md">
//               <div className="text-[#fa9e1b] text-4xl font-bold mb-2">+15</div>
//               <p className="text-gray-700">مشروع تم إنجازه</p>
//             </div>
            
//             <div className="bg-white rounded-lg p-6 shadow-md">
//               <div className="text-[#662480] text-4xl font-bold mb-2">+1500</div>
//               <p className="text-gray-700">مستفيد من المبادرة</p>
//             </div>
            
//             <div className="bg-white rounded-lg p-6 shadow-md">
//               <div className="text-[#31124b] text-4xl font-bold mb-2">+200</div>
//               <p className="text-gray-700">متطوع نشط</p>
//             </div>
            
//             <div className="bg-white rounded-lg p-6 shadow-md">
//               <div className="text-[#fa9e1b] text-4xl font-bold mb-2">+25</div>
//               <p className="text-gray-700">جهة داعمة</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* قسم آخر المشاريع */}
//       <div className="py-16 px-4 bg-white">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-4 text-[#31124b]">آخر مشاريعنا</h2>
//           <p className="text-center text-gray-700 mb-12">تعرّف على بعض المشاريع التي نعمل عليها حالياً</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//               <div className="h-48 bg-gray-300"></div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 text-[#31124b]">تخضير الحي</h3>
//                 <p className="text-gray-700 mb-4">مشروع لزراعة الأشجار وإنشاء مساحات خضراء في الأماكن المهملة بالحي</p>
//                 <Link href="/projects/1" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
//                   التفاصيل 
//                   <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                   </svg>
//                 </Link>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//               <div className="h-48 bg-gray-300"></div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 text-[#31124b]">صيانة ملعب الحي</h3>
//                 <p className="text-gray-700 mb-4">إعادة تأهيل وصيانة الملعب الرياضي ليكون وجهة آمنة ومناسبة للشباب</p>
//                 <Link href="/projects/2" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
//                   التفاصيل 
//                   <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                   </svg>
//                 </Link>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//               <div className="h-48 bg-gray-300"></div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 text-[#31124b]">تطوير المكتبة العامة</h3>
//                 <p className="text-gray-700 mb-4">تجديد المكتبة العامة وتزويدها بالكتب وتقنيات التعلم الحديثة</p>
//                 <Link href="/projects/3" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
//                   التفاصيل 
//                   <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-center mt-12">
//             <Link href="/projects" className="bg-[#31124b] text-white hover:bg-[#662480] px-6 py-3 rounded-lg transition-colors font-bold inline-block">
//               جميع المشاريع
//             </Link>
//           </div>
//         </div>
//       </div>
// {/* قسم الشركاء */}
// <div className="py-16 px-4 bg-gray-50">
//   <div className="container mx-auto max-w-6xl">
//     <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">شركاؤنا وداعمونا</h2>
    
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
//       {partners.map((partner, index) => (
//         <div key={index} className="flex justify-center">
//           <div className="h-20 w-32 bg-gray-200 flex items-center justify-center">
//             {/* استبدل هذا بشعار الشريك */}
//             <span className="text-gray-500">{partner.name}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//       {/* قسم الدعم */}

//       <div className="py-10 px-2 bg-gradient-to-r m-20 from-[#31124b] to-[#411866]  rounded-2xl p-2 shadow-xl border border-opacity-10  text-white">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-8">كن جزءاً من التغيير</h2>
//           <p className="text-center text-xl mb-12 max-w-3xl mx-auto">نحتاج إلى دعمكم لنحقق طموحاتنا في إصلاح الحي وخلق بيئة أفضل للجميع. يمكنكم المساهمة بالوقت، الخبرة، أو الدعم المادي.</p>
          
//           <div className="text-center">
//             <Link href="/supportFile" className="bg-[#fa9e1b] text-[#31124b] hover:bg-white px-8 py-4 rounded-lg transition-colors font-bold text-xl inline-block">
//               كن داعماً الآن
//             </Link>
//           </div>
//         </div>
        
//       </div>

      
//     </div>

//   );
// }
'use client';

import Head from 'next/head';
import Link from 'next/link';
import HeroSection from './components/herosection';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  // بيانات الشركاء
  const partners = [
    { name: "الشريك 1", logo: "" },
    { name: "الشريك 2", logo: "" },
    { name: "الشريك 3", logo: "" },
    { name: "الشريك 4", logo: "" },
  ];
  
  // بيانات الشهادات
  const testimonials = [
    { 
      name: "أحمد محمد", 
      role: "من سكان الحي", 
      quote: "لقد تغير الحي بشكل كبير بفضل هذه المبادرة. أصبحت المساحات الخضراء أكثر وأصبح أطفالنا يملكون أماكن آمنة للعب.", 
      image: "" 
    },
    { 
      name: "سارة خالد", 
      role: "متطوعة", 
      quote: "العمل مع هذه المبادرة منحني فرصة للمساهمة في تطوير مجتمعي. أشعر بالفخر لما أنجزناه سوياً.", 
      image: "" 
    },
    { 
      name: "فهد العمري", 
      role: "صاحب متجر محلي", 
      quote: "بعد تحسين الشوارع والإنارة، ازداد عدد الزوار للمنطقة مما انعكس إيجاباً على التجارة المحلية.", 
      image: "" 
    },
  ];
  
  // للتحكم في شرائح الشهادات
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // للتحقق من صحة البريد الإلكتروني
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      return;
    }
    // هنا يمكن إضافة كود للاشتراك
    alert('تم الاشتراك بنجاح!');
    setEmail('');
  };
  
  // الفعاليات القادمة
  const upcomingEvents = [
    {
      title: "يوم التشجير",
      date: "15 مايو 2025",
      description: "حملة لزراعة 100 شجرة في الحي بمشاركة المتطوعين والسكان"
    },
    {
      title: "ورشة عمل: تدوير النفايات",
      date: "22 مايو 2025",
      description: "تعلم كيفية تدوير النفايات المنزلية واستخدامها بطرق مبتكرة"
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <HeroSection />

      {/* قسم الفيديو التعريفي */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#31124b]">شاهد مبادرتنا</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">تعرف أكثر على رؤيتنا وأهدافنا من خلال هذا الفيديو التعريفي</p>
          
          <div className="relative aspect-video w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-xl">
            {/* هنا يمكن وضع الفيديو الحقيقي */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
              <svg className="w-20 h-20 text-[#662480] opacity-70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* قسم المميزات */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">كيف نعمل على تحسين الحي؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#662480] text-4xl mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تحديد المشاكل</h3>
              <p className="text-gray-700 text-center">نستمع لسكان الحي ونقوم بتحليل ودراسة المشاكل الملحة التي تواجه مجتمعنا</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#fa9e1b] text-4xl mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تكوين فرق العمل</h3>
              <p className="text-gray-700 text-center">نجمع المتطوعين والداعمين من أصحاب الخبرات المتنوعة للعمل على حل مشاكل الحي</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-[#31124b] text-4xl mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#31124b] text-center">تنفيذ المشاريع</h3>
              <p className="text-gray-700 text-center">ننفذ الحلول العملية ونقيم تأثيرها في المجتمع مع المتابعة المستمرة لضمان نجاحها</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم قصص النجاح - قبل وبعد */}
      <div className="py-16 px-4 bg-[#f8f5fc]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#31124b]">قصص النجاح</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">شاهد التحول الذي أحدثناه في الحي من خلال مشاريعنا</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* قصة النجاح الأولى */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <h3 className="text-xl font-bold p-4 bg-[#31124b] text-white text-center">ملعب الحي</h3>
              <div className="grid grid-cols-2">
                <div className="relative h-64 bg-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white bg-black bg-opacity-50">قبل</div>
                </div>
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white bg-black bg-opacity-50">بعد</div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-700">تحويل منطقة مهملة إلى ملعب آمن ومجهز بأحدث المعدات للأطفال والشباب.</p>
              </div>
            </div>
            
            {/* قصة النجاح الثانية */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <h3 className="text-xl font-bold p-4 bg-[#31124b] text-white text-center">الحديقة العامة</h3>
              <div className="grid grid-cols-2">
                <div className="relative h-64 bg-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white bg-black bg-opacity-50">قبل</div>
                </div>
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white bg-black bg-opacity-50">بعد</div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-700">تطوير الحديقة العامة بالمزيد من المساحات الخضراء وأماكن الجلوس والمرافق العائلية.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/success-stories" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
              عرض المزيد من قصص النجاح
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* قسم الإحصائيات */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">أثر مبادرتنا بالأرقام</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-[#fa9e1b] text-4xl font-bold mb-2">+15</div>
              <p className="text-gray-700">مشروع تم إنجازه</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-[#662480] text-4xl font-bold mb-2">+1500</div>
              <p className="text-gray-700">مستفيد من المبادرة</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-[#31124b] text-4xl font-bold mb-2">+200</div>
              <p className="text-gray-700">متطوع نشط</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform">
              <div className="text-[#fa9e1b] text-4xl font-bold mb-2">+25</div>
              <p className="text-gray-700">جهة داعمة</p>
            </div>
          </div>
        </div>
      </div>

    

      {/* قسم آخر المشاريع */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#31124b]">آخر مشاريعنا</h2>
          <p className="text-center text-gray-700 mb-12">تعرّف على بعض المشاريع التي نعمل عليها حالياً</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#31124b]">تخضير الحي</h3>
                <p className="text-gray-700 mb-4">مشروع لزراعة الأشجار وإنشاء مساحات خضراء في الأماكن المهملة بالحي</p>
                <Link href="/projects/1" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
                  التفاصيل 
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#31124b]">صيانة ملعب الحي</h3>
                <p className="text-gray-700 mb-4">إعادة تأهيل وصيانة الملعب الرياضي ليكون وجهة آمنة ومناسبة للشباب</p>
                <Link href="/projects/2" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
                  التفاصيل 
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#31124b]">تطوير المكتبة العامة</h3>
                <p className="text-gray-700 mb-4">تجديد المكتبة العامة وتزويدها بالكتب وتقنيات التعلم الحديثة</p>
                <Link href="/projects/3" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
                  التفاصيل 
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects" className="bg-[#31124b] text-white hover:bg-[#662480] px-6 py-3 rounded-lg transition-colors font-bold inline-block">
              جميع المشاريع
            </Link>
          </div>
        </div>
      </div>

      {/* قسم الفعاليات القادمة */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">الفعاليات القادمة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-r-4 border-[#662480]">
                <div className="flex items-start">
                  <div className="bg-[#f8f5fc] p-4 rounded-lg mr-4 text-center min-w-20">
                    <div className="text-sm text-gray-600">{event.date.split(" ")[1]}</div>
                    <div className="text-2xl font-bold text-[#662480]">{event.date.split(" ")[0]}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#31124b]">{event.title}</h3>
                    <p className="text-gray-700">{event.description}</p>
                    <Link href={`/events/${index + 1}`} className="mt-3 inline-block text-[#662480] hover:text-[#fa9e1b] font-medium">
                      التفاصيل والتسجيل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/events" className="text-[#662480] hover:text-[#fa9e1b] font-semibold inline-flex items-center">
              عرض جميع الفعاليات
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* قسم الشهادات */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">ماذا يقول عنا؟</h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="transition-all duration-500 transform" style={{ transform: `translateX(${activeTestimonial * 100}%)` }}>
                <div className="flex flex-nowrap">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="min-w-full">
                      <div className="bg-[#f8f5fc] rounded-xl p-8 relative shadow-md">
                        <svg className="absolute top-4 right-6 w-10 h-10 text-[#662480] opacity-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <div className="text-lg text-gray-700 mb-6 relative z-10">{testimonial.quote}</div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            {/* يمكن استبدالها بصورة حقيقية */}
                          </div>
                          <div className="mr-4">
                            <div className="font-bold text-[#31124b]">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${index === activeTestimonial ? 'bg-[#662480]' : 'bg-gray-300'}`}
                  aria-label={`الشهادة ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* قسم الشركاء */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#31124b]">شركاؤنا وداعمونا</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <div className="h-20 w-32 bg-white rounded-lg shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
                  {/* استبدل هذا بشعار الشريك */}
                  <span className="text-gray-500">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* قسم الدعم */}
      <div className="py-10 px-2 bg-gradient-to-r m-20 from-[#31124b] to-[#411866] rounded-2xl p-2 shadow-xl border border-opacity-10 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8">كن جزءاً من التغيير</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">نحتاج إلى دعمكم لنحقق طموحاتنا في إصلاح الحي وخلق بيئة أفضل للجميع. يمكنكم المساهمة بالوقت، الخبرة، أو الدعم المادي.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-[#fa9e1b]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-xl font-bold mb-2">تطوع بوقتك</h3>
                <p className="mb-4 text-white text-opacity-80">شارك في فعالياتنا ومشاريعنا كمتطوع وساهم بمهاراتك في تطوير الحي</p>
                <Link href="/volunteer" className="text-[#fa9e1b] hover:text-white font-semibold">سجل كمتطوع</Link>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-[#fa9e1b]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
                <h3 className="text-xl font-bold mb-2">انضم للشركاء</h3>
                <p className="mb-4 text-white text-opacity-80">قدم دعمك كجهة أو مؤسسة من خلال توفير الموارد أو المواد اللازمة</p>
                <Link href="/partner" className="text-[#fa9e1b] hover:text-white font-semibold">كن شريكاً معنا</Link>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-filter backdrop-blur-sm">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-[#fa9e1b]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-xl font-bold mb-2">تبرع للمبادرة</h3>
                <p className="mb-4 text-white text-opacity-80">ساهم في دعم مشاريعنا من خلال التبرع المادي لمساعدتنا في الاستمرار والتوسع</p>
                <Link href="/donate" className="text-[#fa9e1b] hover:text-white font-semibold">تبرع الآن</Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/supportFile" className="bg-[#fa9e1b] text-[#31124b] hover:bg-white px-8 py-4 rounded-lg transition-colors font-bold text-xl inline-block">
              كن داعماً الآن
            </Link>
          </div>
        </div>
      </div>

     
      </div>
  );
  }
  