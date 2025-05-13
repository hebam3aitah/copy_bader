
'use client';

import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [activeTab, setActiveTab] = useState('vision');
  const [isScrolled, setIsScrolled] = useState(false);
  const teamRef = useRef(null);
  const achievementsRef = useRef(null);
  const partnersRef = useRef(null);
  
  useEffect(() => {
    // تأثير التمرير
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // مراقبة العناصر المرئية
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // تأثيرات الحركة للعناصر
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white overflow-hidden" dir="rtl">
      <Head>
        <title>من نحن | بادر - مبادرة إصلاح الحي</title>
        <meta name="description" content="تعرف على مبادرة بادر التطوعية لإصلاح مشاكل الحي وتحسين المجتمع" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </Head>
      
  

      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* القسم الرئيسي مع تأثيرات حركية */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-24 relative"
        >
          <h1 className="text-5xl font-bold text-[#31124b] mb-4 relative inline-block">
            من نحن
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#fa9e1b] transform origin-left"></span>
          </h1>
          
          <p className="mt-8 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            مبادرة <span className="text-[#31124b] font-bold relative">
              بادر
              {/* <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#fa9e1b]"></span> */}
            </span> هي مشروع تطوعي يهدف إلى إصلاح مشاكل الحي وتحسين جودة الحياة للجميع
          </p>
          
          {/* شكل زخرفي */}
          <motion.div 
            animate={floatingAnimation}
            className="absolute -z-10 top-10 left-20 w-64 h-64 rounded-full bg-[#fa9e1b] opacity-5 blur-3xl"
          ></motion.div>
          <motion.div 
            animate={floatingAnimation}
            className="absolute -z-10 bottom-0 right-40 w-80 h-80 rounded-full bg-[#31124b] opacity-5 blur-3xl"
          ></motion.div>
        </motion.div>

        {/* قسم الرؤية والرسالة والقيم مع تأثيرات */}
        <div className="mb-24 observe-section">
          <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* زخارف خلفية */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#fa9e1b] opacity-10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#31124b] opacity-10 rounded-full translate-x-20 translate-y-20"></div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button 
                onClick={() => setActiveTab('vision')} 
                className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ${activeTab === 'vision' 
                  ? 'bg-[#31124b] text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-[#fa9e1b] hover:text-white'}`}
              >
                <i className="fas fa-eye ml-2"></i>
                رؤيتنا
              </button>
              <button 
                onClick={() => setActiveTab('mission')} 
                className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ${activeTab === 'mission' 
                  ? 'bg-[#31124b] text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-[#fa9e1b] hover:text-white'}`}
              >
                <i className="fas fa-rocket ml-2"></i>
                رسالتنا
              </button>
              <button 
                onClick={() => setActiveTab('values')} 
                className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ${activeTab === 'values' 
                  ? 'bg-[#31124b] text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-[#fa9e1b] hover:text-white'}`}
              >
                <i className="fas fa-star ml-2"></i>
                قيمنا
              </button>
            </div>

            <div className="min-h-64 p-6">
              {activeTab === 'vision' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg"
                >
                  <h2 className="text-2xl font-bold text-[#31124b] mb-6 flex items-center">
                    <span className="w-10 h-10 bg-[#fa9e1b] rounded-full flex items-center justify-center text-white ml-3">
                      <i className="fas fa-eye text-lg"></i>
                    </span>
                    رؤيتنا
                  </h2>
                  <p className="text-lg text-gray-700 mb-4 mr-12 border-r-2 border-[#fa9e1b] pr-4">
                    نتطلع إلى أحياء نموذجية تنعم بالجودة والاستدامة، حيث يشارك السكان بفعالية في تحديد وحل تحديات مجتمعهم.
                  </p>
                  <p className="text-lg text-gray-700 mr-12 border-r-2 border-[#fa9e1b] pr-4">
                    نسعى لبناء نموذج مجتمعي يُحتذى به في المشاركة المدنية والتطوعية، يمكن تطبيقه في مختلف المناطق.
                  </p>
                </motion.div>
              )}

              {activeTab === 'mission' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg"
                >
                  <h2 className="text-2xl font-bold text-[#31124b] mb-6 flex items-center">
                    <span className="w-10 h-10 bg-[#fa9e1b] rounded-full flex items-center justify-center text-white ml-3">
                      <i className="fas fa-rocket text-lg"></i>
                    </span>
                    رسالتنا
                  </h2>
                  <p className="text-lg text-gray-700 mb-4 mr-12 border-r-2 border-[#fa9e1b] pr-4">
                    تمكين سكان الأحياء من تحديد وحل المشكلات المحلية من خلال العمل التطوعي المنظم والمستدام.
                  </p>
                  <p className="text-lg text-gray-700 mr-12 border-r-2 border-[#fa9e1b] pr-4">
                    بناء جسور التواصل بين الأهالي والجهات المختصة لتسهيل وتسريع عمليات الإصلاح والتطوير.
                  </p>
                </motion.div>
              )}

              {activeTab === 'values' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg"
                >
                  <h2 className="text-2xl font-bold text-[#31124b] mb-6 flex items-center">
                    <span className="w-10 h-10 bg-[#fa9e1b] rounded-full flex items-center justify-center text-white ml-3">
                      <i className="fas fa-star text-lg"></i>
                    </span>
                    قيمنا
                  </h2>
                  <motion.ul 
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                    className="text-lg text-gray-700 space-y-4 mr-12"
                  >
                    <motion.li variants={fadeInUp} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#fa9e1b] opacity-20 flex items-center justify-center ml-3">
                        <span className="w-4 h-4 rounded-full bg-[#fa9e1b]"></span>
                      </span>
                      <span>المبادرة والإيجابية في حل المشكلات</span>
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#fa9e1b] opacity-20 flex items-center justify-center ml-3">
                        <span className="w-4 h-4 rounded-full bg-[#fa9e1b]"></span>
                      </span>
                      <span>الشفافية والمساءلة في جميع الأعمال</span>
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#fa9e1b] opacity-20 flex items-center justify-center ml-3">
                        <span className="w-4 h-4 rounded-full bg-[#fa9e1b]"></span>
                      </span>
                      <span>التعاون والعمل الجماعي</span>
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#fa9e1b] opacity-20 flex items-center justify-center ml-3">
                        <span className="w-4 h-4 rounded-full bg-[#fa9e1b]"></span>
                      </span>
                      <span>الاستدامة في الحلول المقترحة</span>
                    </motion.li>
                    <motion.li variants={fadeInUp} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#fa9e1b] opacity-20 flex items-center justify-center ml-3">
                        <span className="w-4 h-4 rounded-full bg-[#fa9e1b]"></span>
                      </span>
                      <span>احترام التنوع وتقدير مختلف وجهات النظر</span>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* قسم فريق العمل مع تأثيرات حركية */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-24 observe-section"
          ref={teamRef}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#31124b] inline-block relative">
              فريقنا
              <div className="h-1 w-full bg-[#fa9e1b] absolute bottom-0 left-0 transform origin-left"></div>
            </h2>
          </div>
          
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* عضو الفريق 1 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-xl overflow-hidden group"
            >
              <div className="h-48 bg-[#31124b] relative overflow-hidden">
                <div className="w-32 h-32 rounded-full bg-gray-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 border-4 border-[#fa9e1b] transition-all duration-300 group-hover:border-white"></div>
                
                {/* شكل زخرفي */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#fa9e1b] opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#fa9e1b] opacity-10"></div>
              </div>
              <div className="p-6 text-center relative">
                <div className="w-10 h-10 bg-[#fa9e1b] rounded-full flex items-center justify-center text-white absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-lg">
                  <i className="fas fa-user"></i>
                </div>
                <h3 className="text-xl font-bold text-[#31124b] mt-4 mb-2">أحمد محمد</h3>
                <p className="text-[#fa9e1b] font-medium mb-4">مؤسس المبادرة</p>
                <p className="text-gray-600">خبرة أكثر من 10 سنوات في العمل التطوعي والمجتمعي.</p>
                
                <div className="mt-6 flex justify-center space-x-4 space-x-reverse">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* عضو الفريق 2 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-xl overflow-hidden group"
            >
              <div className="h-48 bg-[#31124b] relative overflow-hidden">
                <div className="w-32 h-32 rounded-full bg-gray-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 border-4 border-[#fa9e1b] transition-all duration-300 group-hover:border-white"></div>
                
                {/* شكل زخرفي */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#fa9e1b] opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#fa9e1b] opacity-10"></div>
              </div>
              <div className="p-6 text-center relative">
                <div className="w-10 h-10 bg-[#fa9e1b] rounded-full flex items-center justify-center text-white absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-lg">
                  <i className="fas fa-user"></i>
                </div>
                <h3 className="text-xl font-bold text-[#31124b] mt-4 mb-2">سارة أحمد</h3>
                <p className="text-[#fa9e1b] font-medium mb-4">مديرة المشاريع</p>
                <p className="text-gray-600">متخصصة في إدارة المشاريع التنموية والمجتمعية.</p>
                
                <div className="mt-6 flex justify-center space-x-4 space-x-reverse">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* عضو الفريق 3 */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-xl overflow-hidden group"
            >
              <div className="h-48 bg-[#31124b] relative overflow-hidden">
                <div className="w-32 h-32 rounded-full bg-gray-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 border-4 border-[#fa9e1b] transition-all duration-300 group-hover:border-white"></div>
                
                {/* شكل زخرفي */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#fa9e1b] opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#fa9e1b] opacity-10"></div>
              </div>
              <div className="p-6 text-center relative">
                <div className="w-10 h-10 bg-[#fa9e1b] rounded-full flex items-center justify-center text-white absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-lg">
                  <i className="fas fa-user"></i>
                </div>
                <h3 className="text-xl font-bold text-[#31124b] mt-4 mb-2">محمد عبدالله</h3>
                <p className="text-[#fa9e1b] font-medium mb-4">منسق المتطوعين</p>
                <p className="text-gray-600">خبير في تنظيم الفعاليات وإدارة فرق العمل التطوعية.</p>
                
                <div className="mt-6 flex justify-center space-x-4 space-x-reverse">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#31124b] hover:bg-[#fa9e1b] hover:text-white transition-colors">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* قسم إنجازاتنا مع عدادات تنازلية */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-24 observe-section"
          ref={achievementsRef}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#31124b] inline-block relative">
              إنجازاتنا
              <div className="h-1 w-full bg-[#fa9e1b] absolute bottom-0 left-0 transform origin-left"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* إنجاز 1 */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fa9e1b] opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#31124b] opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#31124b] flex items-center justify-center mb-6 transform -rotate-6">
                  <i className="fas fa-tools text-[#fa9e1b] text-2xl"></i>
                </div>
                <Counter end={20} suffix="+" className="text-6xl font-bold text-[#31124b]" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-2">مشروع تم إنجازه</h3>
                <div className="h-1 w-16 bg-[#fa9e1b] mb-4"></div>
                <p className="text-gray-600">تمكنا من إتمام أكثر من 20 مشروع إصلاحي في مختلف الأحياء.</p>
              </div>
            </motion.div>

            {/* إنجاز 2 */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fa9e1b] opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#31124b] opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#31124b] flex items-center justify-center mb-6 transform -rotate-6">
                  <i className="fas fa-users text-[#fa9e1b] text-2xl"></i>
                </div>
                <Counter end={300} suffix="+" className="text-6xl font-bold text-[#31124b]" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-2">متطوع نشط</h3>
                <div className="h-1 w-16 bg-[#fa9e1b] mb-4"></div>
                <p className="text-gray-600">فريق متنوع من المتطوعين يعمل بجد لخدمة المجتمع.</p>
              </div>
            </motion.div>

            {/* إنجاز 3 */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fa9e1b] opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fa9e1b] opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#31124b] opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#31124b] flex items-center justify-center mb-6 transform -rotate-6">
                  <i className="fas fa-heart text-[#fa9e1b] text-2xl"></i>
                </div>
                <Counter end={5000} suffix="+" className="text-6xl font-bold text-[#31124b]" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-2">مستفيد</h3>
                <div className="h-1 w-16 bg-[#fa9e1b] mb-4"></div>
                <p className="text-gray-600">تمكنا من تحسين حياة أكثر من 5000 مستفيد في المجتمع.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* قسم شركاؤنا مع تأثيرات */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-24 observe-section"
          ref={partnersRef}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#31124b] inline-block relative">
              شركاؤنا
              <div className="h-1 w-full bg-[#fa9e1b] absolute bottom-0 left-0 transform origin-left"></div>
            </h2>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fa9e1b] opacity-5 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#31124b] opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
            
            <motion.div 
              variants={staggerChildren}
              className="flex flex-wrap justify-center items-center gap-8"
            >
              {/* شريك 1 */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
                className="w-40 h-40 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-100 group"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-lg font-bold text-gray-600 group-hover:text-[#31124b] transition-colors">شريك 1</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fa9e1b] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
              
              {/* شريك 2 */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
                className="w-40 h-40 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-100 group"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-lg font-bold text-gray-600 group-hover:text-[#31124b] transition-colors">شريك 2</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fa9e1b] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
              
              {/* شريك 3 */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
                className="w-40 h-40 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-100 group"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-lg font-bold text-gray-600 group-hover:text-[#31124b] transition-colors">شريك 3</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fa9e1b] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
              
              {/* شريك 4 */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
                className="w-40 h-40 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-100 group"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-lg font-bold text-gray-600 group-hover:text-[#31124b] transition-colors">شريك 4</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fa9e1b] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
              
              {/* شريك 5 */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
                className="w-40 h-40 bg-white rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-100 group"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-lg font-bold text-gray-600 group-hover:text-[#31124b] transition-colors">شريك 5</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fa9e1b] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* قسم انضم إلينا مع تأثيرات */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="observe-section"
        >
          <div className="bg-gradient-to-r from-[#31124b] to-[#31124b] rounded-2xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
            {/* أشكال زخرفية */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fa9e1b] opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fa9e1b] opacity-10 rounded-full transform -translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#fa9e1b] opacity-10 rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#fa9e1b] opacity-10 rounded-full"></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h2 className="text-4xl font-bold mb-6">انضم إلى فريقنا</h2>
              <p className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                كن جزءًا من التغيير الإيجابي في مجتمعك. انضم إلى مبادرة بادر اليوم ودع بصمتك في خدمة الحي والمجتمع!
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#fa9e1b] hover:bg-yellow-500 text-white font-bold py-4 px-10 rounded-full transition-colors duration-300 shadow-lg flex items-center mx-auto"
              >
                <span className="ml-2">سجل كمتطوع</span>
                <i className="fas fa-arrow-left"></i>
              </motion.button>
              
              <div className="mt-10 flex justify-center space-x-6 space-x-reverse">
                <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-[#fa9e1b] flex items-center justify-center text-white transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-[#fa9e1b] flex items-center justify-center text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-[#fa9e1b] flex items-center justify-center text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-[#fa9e1b] flex items-center justify-center text-white transition-colors">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#31124b] text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 مبادرة بادر. جميع الحقوق محفوظة.</p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <a href="#" className="text-[#fa9e1b] hover:text-white transition-colors">الرئيسية</a>
            <a href="#" className="text-[#fa9e1b] hover:text-white transition-colors">من نحن</a>
            <a href="#" className="text-[#fa9e1b] hover:text-white transition-colors">المشاريع</a>
            <a href="#" className="text-[#fa9e1b] hover:text-white transition-colors">اتصل بنا</a>
          </div>
        </div>
      </footer>
      
      {/* مكون العداد */}
    </div>
  );
}

// مكون العداد التنازلي
const Counter = ({ end, suffix = "", className }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime;
          const duration = 1500; // مدة العد بالمللي ثانية
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end]);
  
  return (
    <div ref={counterRef} className={className}>
      {count}{suffix}
    </div>
  );
};