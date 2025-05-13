// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { connectDB } from '../src/lib/mongoose.js';
// import Notification from '../src/models/Notification.js';

// dotenv.config();

// const dummyNotifications = [
//     {
//       title: "مشروع جديد متاح للتطوع",
//       message: "تم إضافة مشروع جديد: صيانة ملعب الأطفال.",
//       type: "project",
//       severity: "medium",
//       link: "/projects/1",
//       seen: false,
//     },
//     {
//       title: "تهانينا!",
//       message: "لقد أكملت 3 مشاريع تطوعية وحصلت على شارة جديدة.",
//       type: "general", // 🔥 بدلتها من badge → general
//       severity: "low",
//       link: "/profile/badges",
//       seen: false,
//     },
//     {
//       title: "تم تحديث حالة البلاغ",
//       message: "تم حل مشكلة 'تسرب مياه في الشارع الرئيسي'.",
//       type: "general",
//       severity: "high",
//       link: "/issues",
//       seen: false,
//     }
//   ];
  

// async function seedNotifications() {
//   try {
//     await connectDB();
//     await Notification.deleteMany();
//     await Notification.insertMany(dummyNotifications);
//     console.log('✅ Dummy notifications inserted successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Failed to seed notifications:', error);
//     process.exit(1);
//   }
// }

// seedNotifications();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { connectDB } from '../src/lib/mongoose.js';
import Notification from '../src/models/Notification.js';
import User from '../src/models/User.js';

dotenv.config();

async function seedNotifications() {
  try {
    await connectDB();

    const users = await User.find({});
    if (!users.length) {
      console.error('❌ No users found!');
      process.exit(1);
    }

    const notifications = users.map((user) => ({
      title: "👋 مرحبًا بك في بادر!",
      message: "يسعدنا انضمامك معنا، يمكنك البدء بالإبلاغ عن مشاكل الحي أو التطوع في المشاريع.",
      type: "welcome",
      severity: "low",
      link: "/user/profile",
      user: user._id,
      seen: false,
      createdAt: new Date(),
    }));

    await Notification.deleteMany({ type: 'welcome' }); // نزيل القديم فقط لو تحب
    await Notification.insertMany(notifications);
    console.log(`✅ Sent welcome notifications to ${users.length} users.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed notifications:', error);
    process.exit(1);
  }
}

seedNotifications();
