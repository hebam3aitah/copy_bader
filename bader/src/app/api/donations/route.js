// /app/api/donations/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Donation from '@/models/Donation';
import User from '@/models/User';
import Project from '@/models/Project';
import Organization from '@/models/Organization';

export async function POST(req) {
  try {
    await connectDB();
    const { donorId, amount, isGeneral, projectId, organizationId } = await req.json();

    if (!donorId || !amount) {
      return NextResponse.json({ message: 'البيانات ناقصة' }, { status: 400 });
    }

    const donation = await Donation.create({
      donor: donorId,
      amount,
      isGeneral,
      project: projectId || null,
      organization: organizationId || null,
    });

    return NextResponse.json({ message: 'تمت إضافة التبرع بنجاح', donation });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'فشل إضافة التبرع' }, { status: 500 });
  }
}
