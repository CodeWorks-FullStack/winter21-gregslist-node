import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class CarBidsService {
  async getBidsByAccount(accountId) {
    // NOTE you can chain populates - the bidder may be overkill here though
    const accountBids = await dbContext.CarBids.find({ accountId: accountId }).populate('car').populate('bidder', 'name picture')
    return accountBids
  }

  async increaseBid(editedBid) {
    const original = await dbContext.CarBids.findOne({ carId: editedBid.carId, accountId: editedBid.accountId }).populate('bidder', 'name picture')
    if (!original) {
      throw new BadRequest('Invalid ID - car not found')
    }
    original.rate = editedBid.rate || original.rate
    await original.save()
    return original
  }

  async getBidsByCar(carId) {
    const bids = await dbContext.CarBids.find({ carId: carId }).sort('-rate').populate('bidder', 'name picture')
    return bids
  }

  async createBid(newBid) {
    const createdBid = await dbContext.CarBids.create(newBid)
    await createdBid.populate('bidder', 'name picture')
    return createdBid
  }
}

export const carBidsService = new CarBidsService()
