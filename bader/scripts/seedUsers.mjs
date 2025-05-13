// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { connectDB } from '../src/lib/mongoose.js';
// import User from '../src/models/User.js';

// dotenv.config();

// const dummyUsers = [
//   {
//     name: "محمد الأحمد",
//     email: "mohammed@example.com",
//     password: "hashed_password_123", // 🔥 ملاحظة: استخدم كلمة مرور مشفرة لو كنت عامل لوجيك تسجيل
//     role: "user",
//     address: "حي النسيم، شارع الزهور",
//     profession: "مهندس مدني",
//     experience: "5 سنوات خبرة في المشاريع التطوعية",
//     age: 28,
//     IsConfirmed: true,
//   },
//   {
//     name: "سارة علي",
//     email: "sara@example.com",
//     password: "hashed_password_456",
//     role: "volunteer",
//     address: "حي الورود، شارع الربيع",
//     profession: "طالبة جامعية",
//     experience: "مشاركة في 10 حملات تطوعية",
//     age: 22,
//     IsConfirmed: true,
//   },
//   {
//     name: "أدمن رئيسي",
//     email: "admin@example.com",
//     password: "hashed_password_admin",
//     role: "admin",
//     address: "حي النخيل، شارع الأمن",
//     profession: "مدير مشروع",
//     experience: "10 سنوات خبرة",
//     age: 35,
//     IsConfirmed: true,
//   }
// ];

// async function seedUsers() {
//   try {
//     await connectDB();
//     await User.deleteMany();
//     await User.insertMany(dummyUsers);
//     console.log('✅ Dummy users inserted successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Failed to seed users:', error);
//     process.exit(1);
//   }
// }

// seedUsers();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../src/lib/mongoose.js';
import User from '../src/models/User.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

dotenv.config();

// ⚡ كم مستخدم بدك تزرع؟
const NUM_USERS = 50;

const dummyUsers = Array.from({ length: NUM_USERS }, () => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: bcrypt.hashSync('123456', 10), // 🔥 كلمة مرور مشفرة (كلهم 123456)
  role: faker.helpers.arrayElement(['user', 'volunteer']),
  image: faker.image.avatar(), // صورة بروفايل
  profilePicture: faker.image.avatar(), // نفس الصورة حاليا
  address: faker.location.streetAddress(),
  profession: faker.person.jobTitle(),
  experience: faker.lorem.sentence(),
  age: faker.number.int({ min: 18, max: 50 }),
  birthDate: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
  IsConfirmed: true,
}));

async function seedUsers() {
  try {
    await connectDB();
    await User.deleteMany();
    const insertedUsers = await User.insertMany(dummyUsers);
    console.log(`✅ Inserted ${NUM_USERS} dummy users successfully!`);

    // ✨ تطبع IDs عشان تستخدمهم بعدين لو حابب بالـ Projects
    console.log('🎯 User IDs:', insertedUsers.map(user => user._id.toString()));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed users:', error);
    process.exit(1);
  }
}

seedUsers();
