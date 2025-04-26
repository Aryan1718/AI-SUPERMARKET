import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { items } = await request.json();
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Create order document
    const order = {
      items,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert order into database
    const result = await db.collection('orders').insertOne(order);
    
    // Update product stock
    for (const item of items) {
      await db.collection('products').updateOne(
        { _id: item._id },
        { $inc: { stock: -item.quantity } }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      orderId: result.insertedId 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    );
  }
} 