import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Student from '@/models/Student';


// PUT /api/students/:id
export async function PUT(_req, { params }) {
try {
await connectToDatabase();
const body = await _req.json();
const updated = await Student.findByIdAndUpdate(params.id, body, { new: true });
if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
return NextResponse.json(updated);
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Failed to update' }, { status: 400 });
}
}


// DELETE /api/students/:id
export async function DELETE(_req, { params }) {
try {
await connectToDatabase();
const deleted = await Student.findByIdAndDelete(params.id);
if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
return NextResponse.json({ success: true });
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Failed to delete' }, { status: 400 });
}
}
