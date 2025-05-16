'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { FaHandHoldingHeart, FaMoneyBillWave, FaUser, FaEnvelope, FaPhone, FaCreditCard, FaCalendarAlt, FaLock } from 'react-icons/fa';

export default function DonatePage({ organizationId = null }) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: 'credit',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    message: ''
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // جلب بيانات المستخدم الحالي
      const userRes = await fetch('/api/current-user');
      const userData = await userRes.json();
      const userId = userData._id;

      // جمل الطباعة للتشخيص
      console.log('amount:', formData.amount);
      console.log('userId:', userId);
      console.log('projectId:', projectId);
      console.log('userData:', userData);

      // تحقق من الحقول المطلوبة
      if (!formData.amount || !userId || !projectId) {
        alert('يرجى تعبئة جميع الحقول المطلوبة');
        return;
      }

      // إرسال البيانات إلى API التبرعات
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorId: userId,
          amount: Number(formData.amount),
          isGeneral: !projectId && !organizationId,
          projectId,
          organizationId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          amount: '',
          paymentMethod: 'credit',
          cardName: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          message: '',
        });
        setStep(1);
      } else {
        alert(data.message || 'فشل إرسال التبرع');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إرسال التبرع');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const donationAmounts = [50, 100, 200, 500, 1000];


  return (
    <div dir="rtl" className="min-h-screen ">
      <Head>
        <title>التبرع</title>
        <meta name="description" content="صفحة التبرع" />
      </Head>

      <main  className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* رأس النموذج */}
          <div className="bg-[#31124b] p-8 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-[#fa9e1b] rounded-full mb-4">
              <FaHandHoldingHeart className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white">تبرع الآن</h1>
            <p className="text-[#fa9e1b] mt-2">ساهم في دعم مبادراتنا وكن شريكاً في التغيير</p>
          </div>

          {/* مؤشر الخطوات */}
          <div className="bg-gray-100 px-8 py-4">
            <div className="flex justify-center items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-[#31124b]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#31124b] text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="mr-2 font-medium">معلومات التبرع</span>
              </div>
              <div className={`w-12 h-1 mx-2 ${step >= 2 ? 'bg-[#31124b]' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-[#31124b]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#31124b] text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="mr-2 font-medium">تفاصيل الدفع</span>
              </div>
            </div>
          </div>

          {/* نموذج التبرع */}
          <form onSubmit={handleSubmit} dir="ltr" className="p-8 space-y-6 bg-gray-50 rtl">
            {/* الخطوة الأولى - معلومات التبرع */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* الاسم الكامل */}
                  <div>
                    <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="name">
                      <span className="flex items-center justify-end gap-2">
                        <FaUser className="text-[#31124b]" /> الاسم الكامل
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* البريد الإلكتروني */}
                  <div>
                    <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="email">
                      <span className="flex items-center justify-end gap-2">
                        <FaEnvelope className="text-[#31124b]" /> البريد الإلكتروني
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="phone">
                      <span className="flex items-center justify-end gap-2">
                        <FaPhone className="text-[#31124b]" /> رقم الهاتف
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                      placeholder="أدخل رقم هاتفك (اختياري)"
                    />
                  </div>

                  {/* مبلغ التبرع */}
                  <div>
                    <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="amount">
                      <span className="flex items-center justify-end gap-2">
                        <FaMoneyBillWave className="text-[#31124b]" /> مبلغ التبرع
                      </span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                      placeholder="أدخل مبلغ التبرع"
                    />
                  </div>
                </div>

                {/* قيم مقترحة للتبرع */}
                <div className="mt-4">
                  <label className="block text-right mb-2 font-semibold text-[#31124b]">قيم مقترحة للتبرع</label>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                        className={`px-4 py-2 rounded-full transition-all ${
                          formData.amount === amount.toString() 
                            ? 'bg-[#fa9e1b] text-white' 
                            : 'bg-white border border-[#31124b] text-[#31124b] hover:bg-[#31124b]/10'
                        }`}
                      >
                        {amount} د.أ
                      </button>
                    ))}
                  </div>
                </div>

                {/* رسالة مع التبرع */}
                <div>
                  <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="message">
                    رسالة مع التبرع (اختياري)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                    placeholder="يمكنك إضافة رسالة مع تبرعك"
                  ></textarea>
                </div>

                {/* زر التالي */}
                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-4 bg-gradient-to-r from-[#fa9e1b] to-[#31124b] text-white font-bold rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                      تفاصيل الدفع
                  </button>
                </div>
              </div>
            )}

            {/* الخطوة الثانية - تفاصيل الدفع */}
            {step === 2 && (
              <div className="space-y-6">
                {/* طريقة الدفع */}
                <div>
                  <label className="block text-right mb-2 font-semibold text-[#31124b]">طريقة الدفع</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer flex items-center justify-center gap-3 ${
                        formData.paymentMethod === 'credit' 
                          ? 'border-[#fa9e1b] bg-[#fa9e1b]/10' 
                          : 'border-gray-300 hover:border-[#31124b]'
                      }`}
                      onClick={() => setFormData({ ...formData, paymentMethod: 'credit' })}
                    >
                      <FaCreditCard className="text-[#31124b] text-xl" />
                      <span>بطاقة ائتمان</span>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="credit" 
                        checked={formData.paymentMethod === 'credit'} 
                        onChange={handleChange} 
                        className="ml-2" 
                      />
                    </div>
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer flex items-center justify-center gap-3 ${
                        formData.paymentMethod === 'bank' 
                          ? 'border-[#fa9e1b] bg-[#fa9e1b]/10' 
                          : 'border-gray-300 hover:border-[#31124b]'
                      }`}
                      onClick={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                    >
                      <FaMoneyBillWave className="text-[#31124b] text-xl" />
                      <span>تحويل بنكي</span>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="bank" 
                        checked={formData.paymentMethod === 'bank'} 
                        onChange={handleChange} 
                        className="ml-2" 
                      />
                    </div>
                  </div>
                </div>

                {/* معلومات بطاقة الائتمان */}
                {formData.paymentMethod === 'credit' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* اسم حامل البطاقة */}
                      <div>
                        <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="cardName">
                          <span className="flex items-center justify-end gap-2">
                            <FaUser className="text-[#31124b]" /> اسم حامل البطاقة
                          </span>
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                          placeholder="الاسم كما يظهر على البطاقة"
                        />
                      </div>

                      {/* رقم البطاقة */}
                      <div>
                        <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="cardNumber">
                          <span className="flex items-center justify-end gap-2">
                            <FaCreditCard className="text-[#31124b]" /> رقم البطاقة
                          </span>
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </div>

                      {/* تاريخ الانتهاء */}
                      <div>
                        <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="expiryDate">
                          <span className="flex items-center justify-end gap-2">
                            <FaCalendarAlt className="text-[#31124b]" /> تاريخ الانتهاء
                          </span>
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                          placeholder="MM/YY"
                        />
                      </div>

                      {/* رمز الأمان */}
                      <div>
                        <label className="block text-right mb-2 font-semibold text-[#31124b]" htmlFor="cvv">
                          <span className="flex items-center justify-end gap-2">
                            <FaLock className="text-[#31124b]" /> رمز الأمان (CVV)
                          </span>
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#31124b] text-right"
                          placeholder="XXX"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* معلومات التحويل البنكي */}
                {formData.paymentMethod === 'bank' && (
                  <div   className="bg-[#31124b]/10 p-6 rounded-lg border border-[#31124b]/30">
                    <h3 className="text-lg font-bold text-[#31124b] mb-3 text-right">معلومات الحساب البنكي</h3>
                    <ul className="space-y-2 text-right">
                      <li className="flex justify-end items-center gap-2">
                        <span>بنك ABC</span>
                        <strong className="text-[#31124b]">اسم البنك:</strong>
                      </li>
                      <li className="flex justify-end items-center gap-2">
                        <span>مؤسسة الخير للتنمية المجتمعية</span>
                        <strong className="text-[#31124b]">اسم الحساب:</strong>
                      </li>
                      <li className="flex justify-end items-center gap-2">
                        <span dir="ltr">JO12 3456 7890 1234 5678 9012 3456</span>
                        <strong className="text-[#31124b]">رقم الحساب (IBAN):</strong>
                      </li>
                      <li className="flex justify-end items-center gap-2">
                        <span>يرجى ذكر اسمك ورقم هاتفك في تفاصيل التحويل</span>
                        <strong className="text-[#31124b]">ملاحظة:</strong>
                      </li>
                    </ul>
                  </div>
                )}

                {/* ملخص التبرع */}
                <div  className="bg-gray-100 p-6 rounded-lg border border-gray-200 mt-6">
                  <h3 className="text-lg font-bold text-[#31124b] mb-3 text-right">ملخص التبرع</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                      <span className="font-bold">{formData.amount || '0'} د.أ</span>
                      <span>مبلغ التبرع</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                      <span className="font-bold">0 د.أ</span>
                      <span>رسوم معالجة</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-lg font-bold text-[#31124b]">
                      <span>{formData.amount || '0'} د.أ</span>
                      <span>المبلغ الإجمالي</span>
                    </div>
                  </div>
                </div>

                {/* أزرار التنقل */}
                <div  className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 text-[#31124b] font-medium rounded-full hover:bg-gray-300 transition-all"
                  >
                    العودة
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#31124b] to-[#31124b] text-white font-bold rounded-full transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    إتمام عملية التبرع
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* التذييل */}
          <div className="bg-gray-100 p-6 text-center border-t border-gray-200">
            <p className="text-[#31124b]">
              جميع التبرعات آمنة ومشفرة. شكراً لدعمكم الكريم.
            </p>
            <div className="flex justify-center mt-3 gap-3">
              <img src="/api/placeholder/40/24" alt="فيزا" className="h-6" />
              <img src="/api/placeholder/40/24" alt="ماستركارد" className="h-6" />
              <img src="/api/placeholder/40/24" alt="أمريكان إكسبريس" className="h-6" />
              <img src="/api/placeholder/40/24" alt="باي بال" className="h-6" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
//<DonatePage projectId="665e46d9b90c2e84d22f9331" organizationId={null} />
