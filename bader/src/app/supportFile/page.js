"use client";

import { useState } from 'react';
import Head from 'next/head';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    supportType: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('بيانات النموذج:', formData);
    setSubmitted(true);
    
    // هنا يمكنك إضافة الكود لإرسال البيانات إلى الخادم
    
    // إعادة ضبط النموذج
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      supportType: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>كن داعماً لنا</title>
        <meta name="description" content="صفحة الدعم والمساهمة" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-[#31124b] text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">كن داعماً</h1>
          <p className="mt-2 text-lg text-[#fa9e1b]">ساهم معنا في تحقيق أهدافنا</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#31124b] p-6">
              <h2 className="text-2xl font-bold text-white">انضم إلينا كداعم</h2>
              <p className="text-[#fa9e1b] mt-2">املأ النموذج أدناه للمساهمة في دعم مشاريعنا</p>
            </div>
            
            {submitted ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">تم إرسال بيانات الدعم بنجاح!</h3>
                <p className="mt-2 text-gray-600">شكراً لك على تقديم الدعم. سنتواصل معك قريباً.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-[#fa9e1b] text-white rounded-md hover:bg-[#e8900a] transition duration-300"
                >
                  تقديم طلب دعم آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">اسم المؤسسة</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="supportType" className="block text-sm font-medium text-gray-700">نوع الدعم</label>
                  <select
                    id="supportType"
                    name="supportType"
                    value={formData.supportType}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                  >
                    <option value="">اختر نوع الدعم</option>
                    <option value="مالي">دعم مالي</option>
                    <option value="عيني">دعم عيني</option>
                    <option value="تطوعي">دعم تطوعي</option>
                    <option value="تقني">دعم تقني</option>
                    <option value="آخر">آخر</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">تفاصيل الدعم</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fa9e1b] focus:border-[#fa9e1b]"
                  ></textarea>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#31124b] text-white rounded-md hover:bg-[#25093b] transition duration-300 flex items-center"
                  >
                    <span>إرسال طلب الدعم</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#fa9e1b]">
              <div className="flex justify-center">
                <div className="rounded-full bg-[#31124b] p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#fa9e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-center">الدعم المالي</h3>
              <p className="mt-2 text-gray-600 text-center">ساهم مالياً في تمويل مشاريعنا وأنشطتنا المختلفة</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#fa9e1b]">
              <div className="flex justify-center">
                <div className="rounded-full bg-[#31124b] p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#fa9e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-center">الدعم التطوعي</h3>
              <p className="mt-2 text-gray-600 text-center">شارك معنا بوقتك وخبراتك لتحقيق رسالتنا</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#fa9e1b]">
              <div className="flex justify-center">
                <div className="rounded-full bg-[#31124b] p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#fa9e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-center">الدعم العيني</h3>
              <p className="mt-2 text-gray-600 text-center">قدم مواد أو خدمات تساهم في دعم أنشطتنا ومشاريعنا</p>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-[#31124b] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white">شركاؤنا الداعمون</h2>
          <p className="mt-2 text-[#fa9e1b]">نشكر جميع الجهات التي ساهمت في دعم مشاريعنا</p>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white/10 p-6 rounded-lg flex items-center justify-center h-24">
                <span className="text-white font-medium">شريك داعم</span>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* 
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-[#fa9e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@example.com</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-[#fa9e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+123 456 789</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-[#fa9e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>شارع المثال، المدينة، البلد</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#fa9e1b] transition duration-300">الرئيسية</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fa9e1b] transition duration-300">من نحن</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fa9e1b] transition duration-300">المشاريع</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fa9e1b] transition duration-300">أخبارنا</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-[#31124b] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fa9e1b] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="bg-[#31124b] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fa9e1b] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="bg-[#31124b] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fa9e1b] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="bg-[#31124b] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fa9e1b] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2025 جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}