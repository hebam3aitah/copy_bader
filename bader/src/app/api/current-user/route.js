// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';
// import { connectDB } from '@/lib/mongoose';
// import User from '@/models/User';
// import jwt from 'jsonwebtoken';

// export async function GET(req) {
//   const session = await getServerSession(authOptions);

//   // ✅ إذا سجل من Google (NextAuth)
//   if (session?.user) {
//     return Response.json({
//       name: session.user.name,
//       email: session.user.email,
//       phone: session.user.phone || 'غير متوفر', // ✅ حتى ما تكون فاضية
//       provider: 'google',
//     });
//   }

//   // ✅ إذا سجل من JWT (تسجيل دخول عادي)
//   const token = req.cookies.get('token')?.value;
//   if (!token) {
//     return new Response(JSON.stringify({ message: 'غير مسجل دخول' }), { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     await connectDB();
//     const user = await User.findById(decoded.userId);
//     if (!user) return new Response(JSON.stringify({ message: 'المستخدم غير موجود' }), { status: 404 });

//     return Response.json({
//       name: user.name,
//       email: user.email,
//       phone: user.phone || '',
//       provider: 'credentials',
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ message: 'توكن غير صالح' }), { status: 401 });
//   }
// }
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ إذا سجل من Google (NextAuth)
  if (token?.email && token?.name) {
    // جلب المستخدم من قاعدة البيانات للحصول على _id
    const user = await User.findOne({ email: token.email });
    return Response.json({
      _id: user?._id, // أضف _id إذا كان user موجود
      name: token.name,
      email: token.email,
      phone: token.phone || 'غير متوفر',
      address: token.address || 'غير متوفر',
      provider: 'google',
    });
  }

  // ✅ إذا سجل من JWT يدوي
  const rawToken = req.cookies.get('token')?.value;
  if (!rawToken) {
    return new Response(JSON.stringify({ message: 'غير مسجل دخول' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.userId).select('name email phone address');
    if (!user) return new Response(JSON.stringify({ message: 'المستخدم غير موجود' }), { status: 404 });
    // console.log("🔥 token:", req.cookies.get('token')?.value);

    return Response.json({
      _id: user._id, // أضف _id هنا أيضًا
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address:  user.address|| '',
      provider: 'credentials',
      
    });
  } catch (err) {
    console.error('❌ Error in /api/current-user:', err);

    return new Response(JSON.stringify({ message: 'توكن غير صالح' }), { status: 401 });
  }
}
