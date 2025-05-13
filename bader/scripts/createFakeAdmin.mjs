import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/lib/mongoose.js';
import User from '../src/models/User.js';

dotenv.config();

async function createFakeAdmin() {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: 'admin@bader.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    await User.create({
      name: 'Admin User',
      email: 'admin@bader.com',
      password: hashedPassword,
      role: 'admin',
      IsConfirmed: true,
      image: '',
      profilePicture: '',
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@bader.com');
    console.log('🔐 Password: 123456');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    process.exit(1);
  }
}

createFakeAdmin();
//📧 Email: admin@bader.com
//🔐 Password: 123456