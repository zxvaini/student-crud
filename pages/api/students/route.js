import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Student from '@/models/Student';


// GET /api/students?search=&page=1&limit=10
export async function GET(request) {
try {
await connectToDatabase();


const { search, page = '1', limit = '10' } = Object.fromEntries(
request.nextUrl.searchParams
);


const pageNum = parseInt(page, 10) || 1;
const limitNum = parseInt(limit, 10) || 10;
const skip = (pageNum - 1) * limitNum;


const q = search
? { name: { $regex: search, $options: 'i' } }
: {};


const [data, total] = await Promise.all([
Student.find(q).sort({ name: 1 }).skip(skip).limit(limitNum),
Student.countDocuments(q)
]);


return NextResponse.json({ data, total, page: pageNum, pages: Math.ceil(total / limitNum) });
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
}
}


// POST /api/students { name, nis, className?, gender, address? }
export async function POST(request) {
try {
await connectToDatabase();
const body = await request.json();
const created = await Student.create(body);
return NextResponse.json(created, { status: 201 });
} catch (err) {
console.error(err);
let msg = 'Failed to create student';
if (err?.code === 11000) msg = 'NIS must be unique';
return NextResponse.json({ error: msg }, { status: 400 });
}
}
