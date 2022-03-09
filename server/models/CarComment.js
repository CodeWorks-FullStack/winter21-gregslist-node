import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarCommentSchema = new Schema(
  {
    body: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CarCommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
