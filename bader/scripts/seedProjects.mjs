import dotenv from 'dotenv';
import { connectDB } from '../src/lib/mongoose.js';
import Project from '../src/models/Project.js';
import User from '../src/models/User.js'; // 🔥 ضروري نجيب المستخدمين
import { faker } from '@faker-js/faker';

dotenv.config();

// ⚡ كم مشروع بدك تزرع؟
const NUM_PROJECTS = 50;

// ✅ ثابت ID كاتيجوري
const FIXED_CATEGORY_ID = "664f1f0c92836d7396e82460"; // بدله حسب الكاتيجوري الحقيقي عندك

async function seedProjects() {
  try {
    await connectDB();
    
    // 🧠 أولا: نجيب كل الـ Users من قاعدة البيانات
    const users = await User.find({});
    if (users.length === 0) {
      console.error('❌ No users found! Please seed users first.');
      process.exit(1);
    }

    // 🛠️ بناء مشاريع عشوائية بناء على المستخدمين الموجودين
    const dummyProjects = Array.from({ length: NUM_PROJECTS }, () => {
      const randomLikes = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 5 }));
      const randomComments = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 3 }));
      const randomVolunteers = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 4 }));

      return {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        location: faker.location.city(),
        category: FIXED_CATEGORY_ID,
        images: [faker.image.urlLoremFlickr({ category: 'city' })],
        status: faker.helpers.arrayElement(['pending', 'in-progress', 'completed']),
        priority: faker.helpers.arrayElement(['urgent', 'medium', 'low']),
        likes: randomLikes.map(user => user._id),
        comments: randomComments.map(user => ({
          user: user._id,
          comment: faker.lorem.sentence(),
          createdAt: faker.date.recent({ days: 30 }),
        })),
        donations: faker.number.int({ min: 0, max: 1000 }),
        volunteers: randomVolunteers.map(user => user._id),
        shareCount: faker.number.int({ min: 0, max: 100 }),
        reportedAt: faker.date.past({ years: 1 }),
      };
    });

    // 🗑️ نحذف كل المشاريع القديمة
    await Project.deleteMany();

    // 🚀 نزرع المشاريع الجديدة
    await Project.insertMany(dummyProjects);

    console.log(`✅ Inserted ${NUM_PROJECTS} projects linked with real users successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed projects:', error);
    process.exit(1);
  }
}

seedProjects();
