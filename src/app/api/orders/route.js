import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const { items } = await request.json();
    const { db } = await connectToDatabase();

    // Start a session for transaction
    const session = await db.client.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Update stock for each item
        for (const item of items) {
          const result = await db.collection('products').updateOne(
            { _id: new ObjectId(item._id) },
            { 
              $inc: { stock: -item.quantity }
            },
            { session }
          );

          if (result.modifiedCount === 0) {
            throw new Error(`Product ${item._id} not found or stock update failed`);
          }
        }
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Order processed successfully' 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to process order' 
      },
      { status: 500 }
    );
  }
} 