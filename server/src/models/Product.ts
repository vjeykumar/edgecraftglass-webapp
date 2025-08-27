import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  imageUrl?: string;
  inStock: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
