

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, LogOut, Bell } from "lucide-react";
// import NotificationsMenu from "./NotificationsMenu";

// const navItems = [
//   { title: "الرئيسية", href: "/" },
//   { title: "المشاريع", href: "/projects" },
//   { title: "الفرص التطوعية", href: "/volunteer-opportunities" },
//   { title: "الجهات الداعمة", href: "/supporters" },
//   { title: "الإبلاغ عن مشكلة", href: "/report-issue" },
//   { title: "من نحن", href: "/about" },
//   { title: "اتصل بنا", href: "/contact" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const isHiddenPage = pathname === "/login" || pathname === "/register";

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", { method: "GET" });
//       document.cookie = "token=; Max-Age=0; path=/"; // مسح الكوكي يدويًا احتياطيًا
//       setCurrentUser(null);
//       window.location.href = "/";
//     } catch (err) {
//       console.error("فشل تسجيل الخروج:", err);
//     }
//   };

//   useEffect(() => {
//     setMounted(true);

//     const getUserData = async () => {
//       try {
//         const res = await fetch("/api/current-user");
//         if (!res.ok) {
//           setCurrentUser(null);
//           return;
//         }
//         const data = await res.json();
//         setCurrentUser(data);
//       } catch (error) {
//         console.error("خطأ في جلب بيانات المستخدم:", error);
//         setCurrentUser(null);
//       }
//     };

//     getUserData();
//   }, []);

//   if (!mounted || isHiddenPage) return null;

//   return (
//     <header className="sticky top-0 z-50 w-full bg-[#31124b]">
//       <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="flex h-16 items-center justify-between">
//           <Link href="/" className="flex items-center">
//             <img src="/images/logo.png" alt="بادر" className="h-8 w-auto mr-2" />
//             <span className="text-xl font-bold text-white">بادر</span>
//           </Link>

//           <div className="hidden md:flex space-x-6 space-x-reverse items-center">
//             {navItems.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
//                   pathname === link.href
//                     ? "bg-[#fa9e1b] text-[#31124b]"
//                     : "text-white hover:text-[#fa9e1b]"
//                 }`}
//               >
//                 {link.title}
//               </Link>
//             ))}
//             <NotificationsMenu />

//             {currentUser ? (
//               <>
//                 <span className="text-sm text-white font-semibold">
//                   {currentUser.name}
//                 </span>
//                 <Link
//                   href="/profile"
//                   className="h-8 w-8 rounded-full bg-white text-[#31124b] flex items-center justify-center font-bold"
//                 >
//                   {currentUser?.name?.charAt(0) || "م"}
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-white hover:text-red-300 flex items-center gap-1"
//                 >
//                   <LogOut size={16} /> تسجيل خروج
//                 </button>
//               </>
//             ) : (
//               <Link href="/login" className="text-white hover:text-[#fa9e1b]">
//                 تسجيل الدخول
//               </Link>
//             )}
//           </div>

//           <div className="md:hidden flex">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white"
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white border-t">
//           <div className="flex flex-col p-4 space-y-2">
//             {navItems.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`px-3 py-2 rounded-md text-sm font-medium ${
//                   pathname === link.href
//                     ? "bg-[#fa9e1b] text-[#31124b]"
//                     : "text-[#31124b] hover:bg-[#f5f5f5]"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {link.title}
//               </Link>
//             ))}

//             {currentUser ? (
//               <>
//                 <div className="text-sm font-semibold text-[#31124b]">
//                   {currentUser.name}
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-600 text-right"
//                 >
//                   تسجيل خروج
//                 </button>
//               </>
//             ) : (
//               <Link
//                 href="/login"
//                 className="text-[#31124b]"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 تسجيل الدخول
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, Bell } from "lucide-react";
import NotificationsMenu from "./NotificationsMenu";

const navItems = [
  { title: "الرئيسية", href: "/" },
  { title: "المشاريع", href: "/projects" },
  { title: "الفرص التطوعية", href: "/volunteer-opportunities" },
  { title: "الجهات الداعمة", href: "/supporters" },
  { title: "الإبلاغ عن مشكلة", href: "/report-issue" },
  { title: "من نحن", href: "/about" },
  { title: "اتصل بنا", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const isHiddenPage = pathname === "/login" || pathname === "/register";

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
      document.cookie = "token=; Max-Age=0; path=/"; // مسح الكوكي يدويًا احتياطيًا
      setCurrentUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("فشل تسجيل الخروج:", err);
    }
  };

  useEffect(() => {
    setMounted(true);

    const getUserData = async () => {
      try {
        const res = await fetch("/api/current-user");
        if (!res.ok) {
          setCurrentUser(null);
          return;
        }
        const data = await res.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("خطأ في جلب بيانات المستخدم:", error);
        setCurrentUser(null);
      }
    };

    getUserData();
  }, []);

  if (!mounted || isHiddenPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#31124b] shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="flex h-20 items-center justify-between">
          {/* الشعار والاسم */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="بادر" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-white">بادر</span>
          </Link>

          {/* القائمة الرئيسية للشاشات المتوسطة والكبيرة */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-[#fa9e1b] text-[#31124b] font-bold"
                    : "text-white hover:text-[#fa9e1b] hover:bg-[#41225b]"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          
          {/* قسم الإشعارات وبيانات المستخدم */}
          <div className="hidden md:flex items-center gap-4">
            <NotificationsMenu />

            {currentUser ? (
              <div className="flex items-center gap-3 border-r border-[#41225b] pr-3">
                <span className="text-sm text-white font-semibold">
                  {currentUser.name}
                </span>
                <Link
                  href="/profile"
                  className="h-9 w-9 rounded-full bg-white text-[#31124b] flex items-center justify-center font-bold text-lg shadow-sm hover:bg-[#fa9e1b] transition-colors"
                >
                  {currentUser?.name?.charAt(0) || "م"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-300 flex items-center gap-1 bg-[#41225b] px-3 py-1.5 rounded-md text-sm transition-colors"
                >
                  <LogOut size={16} /> تسجيل خروج
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-white bg-[#fa9e1b] hover:bg-[#ffb848] text-[#31124b] font-medium px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* زر القائمة للشاشات الصغيرة */}
          <div className="md:hidden flex">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-[#41225b]"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "bg-[#fa9e1b] text-[#31124b]"
                    : "text-[#31124b] hover:bg-[#f5f5f5]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            <div className="border-t border-gray-200 my-2 pt-2">
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 p-2">
                    <div className="h-10 w-10 rounded-full bg-[#31124b] text-white flex items-center justify-center font-bold text-lg">
                      {currentUser?.name?.charAt(0) || "م"}
                    </div>
                    <div className="text-base font-medium text-[#31124b]">
                      {currentUser.name}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="px-4 py-3 bg-gray-100 text-[#31124b] rounded-md text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    الملف الشخصي
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 bg-red-50 text-red-600 rounded-md text-base font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} /> تسجيل خروج
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-3 bg-[#fa9e1b] text-[#31124b] rounded-md text-base font-bold text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}