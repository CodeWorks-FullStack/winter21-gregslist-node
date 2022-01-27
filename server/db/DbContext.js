import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
<<<<<<< HEAD
import { CarCommentSchema } from '../models/CarComment'
=======
import { CarBidSchema } from '../models/CarBid'
>>>>>>> bb62acc0220f0e532f4ce431f4a39137a04b114b
import { ValueSchema } from '../models/Value'

// NOTE this is where we want to register our Schemas, so that we can reference them when we populate data, or access the database

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Cars = mongoose.model('Car', CarSchema)
<<<<<<< HEAD
  CarComments = mongoose.model('CarComment', CarCommentSchema)
=======
  CarBids = mongoose.model('CarBid', CarBidSchema)
>>>>>>> bb62acc0220f0e532f4ce431f4a39137a04b114b
}

export const dbContext = new DbContext()
