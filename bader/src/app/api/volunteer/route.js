// src/app/api/volunteer/route.js
import connectToDatabase from '../../../lib/connectDb'; // ✅ صح

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { db } = await connectToDatabase();
  const data = await request.json(); // البيانات القادمة من العميل (النموذج)

  // إدخال البيانات في MongoDB
  const collection = db.collection('volunteers');
  await collection.insertOne(data);

  return NextResponse.json({ message: 'تم تسجيلك كمتطوع بنجاح' }, { status: 201 });
}
