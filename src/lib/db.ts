import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: CachedMongoose | undefined;
}

const cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  // Return existing connection immediately if already connected
  if (cached.conn && mongoose.connection.readyState === 1) return cached.conn;
  
  // If connecting, wait for it
  if (cached.promise && mongoose.connection.readyState === 2) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  if (!cached.promise || mongoose.connection.readyState === 0) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
