// import dotenv from 'dotenv';
// import { connectDB } from '../src/lib/mongoose.js';
// import { pathToFileURL } from 'url';
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config();

// // نجيب مسار Issue.js كـ file://
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const issueModulePath = pathToFileURL(path.join(__dirname, '../src/models/Issue.js')).href;
// const IssueModule = await import(issueModulePath);
// const Issue = IssueModule.default; // نجيب default export

// const dummyIssues = [
//   {
//     problemType: "تراكم نفايات",
//     description: "تراكم النفايات بشكل كبير في الشارع الرئيسي بحي النسيم.",
//     location: "حي النسيم",
//     category: "664f1f0c92836d7396e82460",
//     images: ["https://res.cloudinary.com/demo/image/upload/sample4.jpg"],
//     severityLevel: "high",
//     reporterName: "محمد سالم",
//     phone: "0599001122",
//     status: "pending",
//     reviewedByAdmin: false,
//     reportedAt: new Date("2025-04-18"),
//   },
//   {
//     problemType: "كسر في رصيف",
//     description: "كسر واضح وخطير في الرصيف أمام المدرسة الثانوية.",
//     location: "حي الورود",
//     category: "664f1f0c92836d7396e82460",
//     images: ["https://res.cloudinary.com/demo/image/upload/sample5.jpg"],
//     severityLevel: "medium",
//     reporterName: "أحمد الزهراني",
//     phone: "0599003344",
//     status: "approved",
//     reviewedByAdmin: true,
//     reportedAt: new Date("2025-04-22"),
//   }
// ];

// async function seedIssues() {
//   try {
//     await connectDB();
//     await Issue.deleteMany();
//     await Issue.insertMany(dummyIssues);
//     console.log('✅ Dummy issues inserted successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Failed to seed issues:', error);
//     process.exit(1);
//   }
// }

// seedIssues();
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { connectDB } from '../src/lib/mongoose.js';
import Issue from '../src/models/Issue.js';
import User from '../src/models/User.js';
import Category from '../src/models/Category.js';

dotenv.config();

const NUM_ISSUES = 20;

async function seedIssues() {
  try {
    await connectDB();

    const users = await User.find({});
    const categories = await Category.find({});

    if (!users.length || !categories.length) {
      console.error('❌ Users or Categories not found!');
      process.exit(1);
    }

    const issues = Array.from({ length: NUM_ISSUES }, () => {
      const user = faker.helpers.arrayElement(users);
      const category = faker.helpers.arrayElement(categories);

      return {
        problemType: faker.word.words(2),
        description: faker.lorem.paragraph(),
        location: faker.location.streetAddress(),
        category: category._id,
        images: [],
        reportedAt: faker.date.past({ years: 1 }),
        severityLevel: faker.helpers.arrayElement(['high', 'medium', 'low']),
        reporterName: user.name,
        phone: "079" + faker.string.numeric(7),
        reportedBy: user._id,
        status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
        reviewedByAdmin: faker.datatype.boolean(),
      };
    });

    await Issue.deleteMany();
    await Issue.insertMany(issues);
    console.log(`✅ Inserted ${NUM_ISSUES} issues linked to users/categories.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed issues:', error);
    process.exit(1);
  }
}

seedIssues();
