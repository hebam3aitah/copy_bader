"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function RelatedProjects({ projects }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-[#31124b]">مشاريع مشابهة</h3>
      <div className="space-y-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <div className="flex items-center space-x-4 space-x-reverse group cursor-pointer">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#31124b] group-hover:text-[#e08c18] transition-colors">
                  {project.title}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// export default function RelatedProjects({ projectId }) {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     if (!projectId) return;

//     const fetchRelated = async () => {
//       try {
//         const res = await fetch(`/api/projects/${projectId}/related`);
//         const data = await res.json();
//         setProjects(data);
//       } catch (err) {
//         console.error('فشل في تحميل المشاريع المشابهة:', err);
//       }
//     };

//     fetchRelated();
//   }, [projectId]);

//   if (projects.length === 0) return null;

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h3 className="text-xl font-bold mb-4 text-[#31124b]">مشاريع مشابهة</h3>
//       <div className="space-y-4">
//         {projects.map((project) => (
//           <Link key={project.id} href={`/project/${project.id}`}>
//             <div className="flex items-center space-x-4 space-x-reverse group cursor-pointer">
//               <div className="relative w-20 h-20 rounded-lg overflow-hidden">
//                 <Image 
//                   src={project.image} 
//                   alt={project.title}
//                   fill
//                   style={{ objectFit: 'cover' }}
//                 />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-[#31124b] group-hover:text-[#e08c18] transition-colors">
//                   {project.title}
//                 </h4>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
