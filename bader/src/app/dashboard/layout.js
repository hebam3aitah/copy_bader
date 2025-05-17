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
