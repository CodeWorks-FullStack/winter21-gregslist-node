import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema(
  {
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String },
    description: { type: String, required: true },
    // NOTE when wanting to supply default value, that field MUST be required
    imgUrl: { type: String, required: true, default: 'https://placehold.it/300x300' },
    // NOTE objectId notes - https://masteringjs.io/tutorials/mongoose/objectid
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// NOTE Virtuals are properties that do not exist in the schema, but we want them on the object sent back to the client

CarSchema.virtual('creator', {
  // localfield is the property on this local table we want to match
  localField: 'creatorId',
  // foreignfield is the property on a foreign table we want to match to our localfield
  foreignField: '_id',
  // ref is what schema we want to have populated onto 'creator'
  ref: 'Profile',
  justOne: true
})
