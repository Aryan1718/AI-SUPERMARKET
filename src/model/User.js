// models/index.js
import mongoose from "mongoose";

// 1. User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 255 },
    email: { type: String, required: true, unique: true, maxlength: 255 },
    password_hash: { type: String, required: true, maxlength: 255 },
    diet_preference: { type: [String], default: [] },  // List of diet preferences
    favorite_brands: { type: [String], default: [] },   // List of favorite brands
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// 2. Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String },
    category: { type: String, maxlength: 100 },
    price: { type: mongoose.Types.Decimal128, required: true },
    stock_quantity: { type: Number, default: 0 },
    dietary_tags: { type: [String], default: [] },
    image_url: { type: String, maxlength: 255 },
    ratings_avg: { type: mongoose.Types.Decimal128, default: 0.0 },
    total_reviews: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// 3. Order Schema
const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    total_amount: { type: mongoose.Types.Decimal128, required: true },
    shipping_address: { type: String, maxlength: 255 },
    status: { type: String, maxlength: 50, default: "pending" },
    payment_status: { type: String, maxlength: 50, default: "unpaid" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// 4. Order Item Schema
const orderItemSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price_at_purchase: { type: mongoose.Types.Decimal128, required: true }
});

const OrderItem = mongoose.models.OrderItem || mongoose.model("OrderItem", orderItemSchema);

// 5. Recommendation Schema
const recommendationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    score: { type: mongoose.Types.Decimal128, default: 0.0 },
    created_at: { type: Date, default: Date.now }
});

const Recommendation = mongoose.models.Recommendation || mongoose.model("Recommendation", recommendationSchema);

export { User, Product, Order, OrderItem, Recommendation };
