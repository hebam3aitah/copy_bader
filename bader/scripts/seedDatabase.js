import dotenv from 'dotenv';
import { connectDB } from '../src/lib/mongoose.js';
import Category from '../src/models/Category.js';
import Project from '../src/models/Project.js';
import User from '../src/models/User.js';
import { faker } from '@faker-js/faker';

dotenv.config();

const NUM_PROJECTS = 50;

const dummyCategories = [
  { name: "مشاكل الطرق والرصيف" },
  { name: "إنارة الشوارع" },
  { name: "تراكم النفايات" },
  { name: "مشاكل الصرف الصحي" },
  { name: "حدائق ومساحات عامة" },
  { name: "تلوث بيئي" },
  { name: "أخرى" },
];

async function seedDatabase() {
  try {
    await connectDB();

    // ✅ 1. حذف وإدخال التصنيفات
    await Category.deleteMany();
    const insertedCategories = await Category.insertMany(dummyCategories);
    console.log('✅ Categories inserted!');

    // ✅ 2. جلب المستخدمين
    const users = await User.find({});
    if (users.length === 0) {
      console.error('❌ No users found! Please seed users first.');
      process.exit(1);
    }

    // ✅ 3. بناء مشاريع مرتبطة بتصنيفات ومستخدمين
    const dummyProjects = Array.from({ length: NUM_PROJECTS }, () => {
      const randomCategory = faker.helpers.arrayElement(insertedCategories);
      const randomLikes = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 5 }));
      const randomComments = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 3 }));
      const randomVolunteers = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 4 }));

      return {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        location: faker.location.city(),
        category: randomCategory._id,
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

    // ✅ 4. حذف المشاريع القديمة وإدخال الجديدة
    await Project.deleteMany();
    await Project.insertMany(dummyProjects);

    console.log(`✅ Inserted ${NUM_PROJECTS} projects with real categories and users!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
