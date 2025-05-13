// app/dashboard/layout.js
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
    FiHome, 
    FiAlertTriangle, 
    FiPackage, 
    FiFileText, 
    FiMail, 
    FiBell, 
    FiMenu, 
    FiX,
    FiUser,
    FiLogOut,
    FiSettings,
    FiChevronDown,
    FiChevronUp
  } from 'react-icons/fi';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
     const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if current route is active
  const isActive = (path) => {
    return pathname === path;
  };

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items with icons
  const navItems = [
    { name: 'الإحصائيات', path: '/dashboard', icon: <FiHome size={18} /> },
    { name: 'إدارة البلاغات', path: '/dashboard/issues', icon: <FiAlertTriangle size={18} /> },
    { name: 'إدارة المشاريع', path: '/dashboard/projects', icon: <FiPackage size={18} /> },
    { name: 'إدارة التقارير', path: '/dashboard/reports', icon: <FiFileText size={18} /> },
    { name: 'إدارة الرسائل', path: '/dashboard/AdminMessagesPage', icon: <FiMail size={18} /> },
    { name: 'إدارة الإشعارات', path: '/dashboard/AdminNotification', icon: <FiBell size={18} /> },
  ];

  return (
    <div dir="rtl" className="flex min-h">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-[#31124b] text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>
        <ul className="space-y-2">
          <li><Link href="/dashboard" className="block hover:text-[#fa9e1b]">الإحصائيات</Link></li>
          <li><Link href="/dashboard/issues" className="block hover:text-[#fa9e1b]">إدارة البلاغات</Link></li>
          <li><Link href="/dashboard/projects" className="block hover:text-[#fa9e1b]">إدارة المشاريع</Link></li>
          <li><Link href="/dashboard/reports" className="block hover:text-[#fa9e1b]">إدارة التقارير</Link></li>
          <li><Link href="/dashboard/AdminMessagesPage" className="block hover:text-[#fa9e1b]">إدارة المسجات</Link></li>
          <li><Link href="/dashboard/AdminNotification" className="block hover:text-[#fa9e1b]">إدارة الاشعارات</Link></li>
        </ul>
      </aside>

      {/* ✅ Page content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
// // app/dashboard/layout.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';
// import { 
//   FiHome, 
//   FiAlertTriangle, 
//   FiPackage, 
//   FiFileText, 
//   FiMail, 
//   FiBell, 
//   FiMenu, 
//   FiX,
//   FiUser,
//   FiLogOut,
//   FiSettings,
//   FiChevronDown,
//   FiChevronUp
// } from 'react-icons/fi';

// export default function DashboardLayout({ children }) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if current route is active
//   const isActive = (path) => {
//     return pathname === path;
//   };

//   // Handle window resize to detect mobile view
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };
    
//     handleResize(); // Set initial state
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Navigation items with icons
//   const navItems = [
//     { name: 'الإحصائيات', path: '/dashboard', icon: <FiHome size={18} /> },
//     { name: 'إدارة البلاغات', path: '/dashboard/issues', icon: <FiAlertTriangle size={18} /> },
//     { name: 'إدارة المشاريع', path: '/dashboard/projects', icon: <FiPackage size={18} /> },
//     { name: 'إدارة التقارير', path: '/dashboard/reports', icon: <FiFileText size={18} /> },
//     { name: 'إدارة الرسائل', path: '/dashboard/AdminMessagesPage', icon: <FiMail size={18} /> },
//     { name: 'إدارة الإشعارات', path: '/dashboard/AdminNotification', icon: <FiBell size={18} /> },
//   ];

//   return (
//     <div dir="rtl" className="flex min-h-5 bg-gray-50">
//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div 
//           className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside 
//         className={`${
//           mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
//         } md:translate-x-0 fixed md:relative z-30 h-full w-72 bg-[#31124b] text-white transition-transform duration-300 ease-in-out flex flex-col`}
//       >
//         {/* Logo and Brand */}
//         <div className="p-6 border-b border-[#53386c] flex items-center justify-between">
//           <div className="flex items-center space-x-3 space-x-reverse">
//             <div className="w-10 h-10 rounded-full bg-[#fa9e1b] flex items-center justify-center">
//               <span className="font-bold text-[#31124b]">EH</span>
//             </div>
//             <h2 className="text-xl font-bold">لوحة التحكم</h2>
//           </div>
          
//           {/* Close Button for Mobile */}
//           {isMobile && (
//             <button 
//               onClick={() => setMobileMenuOpen(false)}
//               className="text-white hover:text-[#fa9e1b] transition-colors"
//             >
//               <FiX size={24} />
//             </button>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-grow p-6 overflow-y-auto">
//           <ul className="space-y-1">
//             {navItems.map((item) => (
//               <li key={item.path}>
//                 <Link 
//                   href={item.path}
//                   className={`flex items-center py-3 px-4 rounded-lg transition-all ${
//                     isActive(item.path) 
//                       ? 'bg-[#53386c] text-[#fa9e1b]' 
//                       : 'hover:bg-[#42225a] hover:text-[#fa9e1b]'
//                   }`}
//                   onClick={() => isMobile && setMobileMenuOpen(false)}
//                 >
//                   <span className="ml-3">{item.icon}</span>
//                   <span>{item.name}</span>
//                   {isActive(item.path) && (
//                     <span className="mr-auto w-1.5 h-5 rounded-full bg-[#fa9e1b]"></span>
//                   )}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* User Profile Section */}
//         <div className="p-4 border-t border-[#53386c]">
//           <div 
//             className="flex items-center p-2 rounded-lg hover:bg-[#42225a] cursor-pointer"
//             onClick={() => setUserMenuOpen(!userMenuOpen)}
//           >
//             <div className="w-10 h-10 rounded-full bg-[#fa9e1b] flex items-center justify-center">
//               <FiUser size={18} color="#31124b" />
//             </div>
//             <div className="mr-3 flex-grow">
//               <p className="font-medium">اسم المستخدم</p>
//               <p className="text-xs text-gray-300">مدير النظام</p>
//             </div>
//             {userMenuOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
//           </div>
          
//           {userMenuOpen && (
//             <div className="mt-2 py-2 bg-[#42225a] rounded-lg">
//               <Link 
//                 href="/dashboard/profile"
//                 className="flex items-center py-2 px-4 hover:bg-[#53386c] transition-colors"
//                 onClick={() => isMobile && setMobileMenuOpen(false)}
//               >
//                 <FiSettings size={16} className="ml-2" />
//                 <span>الإعدادات</span>
//               </Link>
//               <Link 
//                 href="/logout"
//                 className="flex items-center py-2 px-4 text-[#fa9e1b] hover:bg-[#53386c] transition-colors"
//                 onClick={() => isMobile && setMobileMenuOpen(false)}
//               >
//                 <FiLogOut size={16} className="ml-2" />
//                 <span>تسجيل الخروج</span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white shadow-sm py-3 px-6 flex items-center justify-between">
//           {/* Mobile Menu Toggle */}
//           <button 
//             className="md:hidden text-[#31124b] hover:text-[#fa9e1b] transition-colors"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <FiMenu size={24} />
//           </button>
          
//           {/* Page Title - will be dynamic in a real app */}
//           <h1 className="text-xl font-bold hidden md:block" style={{ color: '#31124b' }}>
//             {navItems.find(item => isActive(item.path))?.name || 'لوحة التحكم'}
//           </h1>
          
//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4 space-x-reverse">
//             <button className="relative p-2 text-gray-600 hover:text-[#31124b] transition-colors">
//               <FiBell size={20} />
//               <span className="absolute top-1 left-1 w-2 h-2 bg-[#fa9e1b] rounded-full"></span>
//             </button>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 overflow-auto">
//           {/* Breadcrumb can be added here */}
          
//           {/* Page Content */}
//           <div className="mt-2">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }