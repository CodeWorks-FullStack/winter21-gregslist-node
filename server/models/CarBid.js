import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarBidSchema = new Schema(
  {
    carId: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    rate: { type: Number, required: true, min: 1 }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

CarBidSchema.index({ accountId: 1, carId: 1 }, { unique: true })

CarBidSchema.virtual('bidder', {
  foreignField: '_id',
  localField: 'accountId',
  justOne: true,
  ref: 'Account'
})

CarBidSchema.virtual('car', {
  foreignField: '_id',
  localField: 'carId',
  justOne: true,
  ref: 'Car'
})
