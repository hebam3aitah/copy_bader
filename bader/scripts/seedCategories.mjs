
// import { config } from 'dotenv';
// import { connectDB } from '../src/lib/mongoose.js';
// import Category from '../src/models/Category.js';

// config(); // لتحميل متغيرات البيئة .env

// const dummyCategories = [

//   { name: "مشاكل الطرق والرصيف" },
//   { name: "إنارة الشوارع" },
//   { name: "تراكم النفايات" },
//   { name: "مشاكل الصرف الصحي" },
//   { name: "حدائق ومساحات عامة" },
//   { name: "تلوث بيئي" },
//   { name: "أخرى" },

// ];

// async function seedCategories() {
//   try {
//     await connectDB();
//     await Category.deleteMany(); // احذف كل التصنيفات القديمة أولاً (اختياري)
//     await Category.insertMany(dummyCategories);
//     console.log('✅ Dummy categories inserted successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Failed to seed categories:', error);
//     process.exit(1);
//   }
// }

// seedCategories();
