// app/supporters.js

"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Heart,
  Award,
  Users,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SponsorsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
    },

  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const sponsorCategories = [
    { id: "all", name: "جميع الجهات" },
    { id: "governmental", name: "جهات حكومية" },
    { id: "companies", name: "شركات" },
    { id: "ngos", name: "مؤسسات غير ربحية" },
  ];

  const sponsors = [
    {
      id: 1,
      name: "وزارة الشباب",
      logo: "/api/placeholder/80/80",
      description: "دعم مشاريع تطوعية لتنمية المناطق السكنية وإصلاح الأحياء",
      category: "governmental",
      featured: true,
    },
    {
      id: 2,
      name: "شركة التنمية الوطنية",
      logo: "/api/placeholder/80/80",
      description:
        "توفير الموارد اللازمة لمبادرات إصلاح الأحياء والمرافق العامة",
      category: "companies",
      featured: true,
    },
    {
      id: 3,
      name: "مؤسسة الأمل للتنمية المجتمعية",
      logo: "/api/placeholder/80/80",
      description:
        "دعم مبادرات تطوعية تهدف لتحسين البيئة المحلية وتطوير الأحياء",
      category: "ngos",
      featured: false,
    },
    {
      id: 4,
      name: "بلدية الزرقاء ",
      logo: "/api/placeholder/80/80",
      description:
        "تسهيل الإجراءات وتوفير التصاريح اللازمة لمشاريع إصلاح الأحياء",
      category: "governmental",
      featured: false,
    },
    {
      id: 5,
      name: "مجموعة الخير للاستثمار",
      logo: "/api/placeholder/80/80",
      description: "دعم مالي لمشاريع تحسين البنية التحتية في الأحياء",
      category: "companies",
      featured: false,
    },
    {
      id: 6,
      name: "جمعية التطوع الخيرية",
      logo: "/api/placeholder/80/80",
      description: "تنسيق جهود المتطوعين وتوفير التدريب اللازم",
      category: "ngos",
      featured: false,
    },
    {
      id: 7,
      name: "وزارة الإسكان",
      logo: "/api/placeholder/80/80",
      description: "دعم مشاريع تحسين المساكن والمرافق السكنية",
      category: "governmental",
      featured: false,
    },
    {
      id: 8,
      name: "مؤسسة المستقبل الأخضر",
      logo: "/api/placeholder/80/80",
      description: "دعم مشاريع التشجير وتحسين البيئة في الأحياء",
      category: "ngos",
      featured: false,
    },
  ];

  const filteredSponsors =
    activeCategory === "all"
      ? sponsors
      : sponsors.filter((sponsor) => sponsor.category === activeCategory);

  const displayedSponsors = showMore
    ? filteredSponsors
    : filteredSponsors.slice(0, 6);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-100 to-white overflow-hidden"
      dir="rtl"
    >
   

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 text-center pb-12">
        {/* القسم الرئيسي مع تأثيرات حركية */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-24 relative"
        >
          <h1 className="text-5xl font-bold  text-[#31124b] mb-4 relative inline-block">
            الجهات الداعمة{" "}
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#fa9e1b] transform origin-left"></span>
          </h1>

          <p className="mt-8 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            نفخر بشراكتنا مع مجموعة من المؤسسات والجهات الداعمة لمبادرتنا
          </p>
          <motion.div
            animate={floatingAnimation}
            className="absolute -z-10 top-10 left-20 w-64 h-64 rounded-full bg-[#fa9e1b] opacity-5 blur-3xl"
          ></motion.div>
          <motion.div
            animate={floatingAnimation}
            className="absolute -z-10 bottom-0 right-40 w-80 h-80 rounded-full bg-[#31124b] opacity-5 blur-3xl"
          ></motion.div>
        </motion.div>

        <section className="mb-16">
        {/* <div className="mb-24 observe-section"> */}
          {/* <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden"> */}
            {/* زخارف خلفية */}
            <div className="absolute top-10 left-1  w-40 h-40 bg-[#fa9e1b] opacity-10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute top-10 bottom-0  w-60 h-60 bg-[#31124b] opacity-10 rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-10 bottom-0 left-0  w-60 h-60 bg-[#fa9e1b] opacity-10 rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute  bottom-80 left-6  w-40 h-40 bg-[#31124b] opacity-10 rounded-full translate-x-20 translate-y-20"></div>


          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#31124b] mb-2 mt-20 ">
              الرعاة الرئيسيون
            </h2>
            <div className="h-1 w-24 bg-orange-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sponsors
              .filter((sponsor) => sponsor.featured)
              .map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-orange-400 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6 flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div className="mr-6 rtl:mr-0 rtl:ml-6 text-right">
                      <h3 className="text-xl font-bold text-[#31124b]">
                        {sponsor.name}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {sponsor.description}
                      </p>
                      <div className="mt-4 flex items-center justify-end">
                        <Award className="w-5 h-5 text-orange-400 ml-1" />
                        <span className="text-sm text-orange-600 font-medium">
                          راعي رئيسي
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Category Filter */}
        <section dir="rtl" className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {sponsorCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-lg transition-colors duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#31124b] text-white"
                    : "bg-white text-[#31124b] hover:bg-orange-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* All Sponsors */}
        <section>
          <div dir="rtl" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-purple-800 to-orange-400"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-50 p-2 rounded-full">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#31124b] mr-4 rtl:mr-0 rtl:ml-4">
                      {sponsor.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{sponsor.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-medium px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                      {
                        sponsorCategories.find(
                          (cat) => cat.id === sponsor.category
                        )?.name
                      }
                    </span>
                    <button className="text-purple-700 hover:text-[#31124b] flex items-center text-sm">
                      <span>المزيد</span>
                      <ExternalLink className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSponsors.length > 6 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-md transition-colors duration-300 shadow"
              >
                <span>{showMore ? "عرض أقل" : "عرض المزيد"}</span>
                {showMore ? (
                  <ChevronUp className="mr-2 w-4 h-4 rtl:mr-0 rtl:ml-2" />
                ) : (
                  <ChevronDown className="mr-2 w-4 h-4 rtl:mr-0 rtl:ml-2" />
                )}
              </button>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#31124b] to-[#411866] rounded-2xl p-8 shadow-xl border border-white border-opacity-10">
            <Heart className="text-orange-400 w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              هل ترغب في دعم مبادرتنا؟
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              نرحب بالشراكات الجديدة مع المؤسسات والشركات والجهات الحكومية
              الراغبة في المساهمة في تطوير الأحياء والمجتمعات المحلية
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-md transition-colors duration-300 flex items-center">
                <span>تواصل معنا</span>
                <Users className="mr-2 w-5 h-5 rtl:mr-0 rtl:ml-2" />
              </button>
              <button className="px-6 py-3 bg-white hover:bg-purple-50 text-[#31124b] rounded-md transition-colors duration-300 flex items-center">
                <span>استكشف المشاريع</span>
                <MapPin className="mr-2 w-5 h-5 rtl:mr-0 rtl:ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
