import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runSeeders() {
  try {
    console.log('🌱 Seeding Categories...');
    await execAsync('node scripts/seedCategories.mjs');

    console.log('🌱 Seeding Users...');
    await execAsync('node scripts/seedUsers.mjs');

    console.log('🌱 Seeding Projects...');
    await execAsync('node scripts/seedProjects.mjs');

    console.log('🌱 Seeding Issues...');
    await execAsync('node scripts/seedIssues.mjs');

    console.log('🌱 Seeding Notifications...');
    await execAsync('node scripts/seedNotifications.mjs');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    process.exit(1);
  }
}

runSeeders();
//node scripts/masterSeeder.mjs
