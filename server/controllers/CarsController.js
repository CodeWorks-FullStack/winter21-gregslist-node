import { Auth0Provider } from '@bcwdev/auth0provider'
import { carBidsService } from '../services/CarBidsService'
import { carCommentsService } from '../services/CarCommentsService'
import { carsService } from '../services/CarsService'
import { socketProvider } from '../SocketProvider'
import BaseController from '../utils/BaseController'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      .get('/:id/bids', this.getBidsByCar)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE everything below this .use will be 'locked' down and we can access the auth user info
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
      .post('/:id/bids', this.createBid)
      .put('/:id/bids', this.increaseBid)
  }

  async getAll(req, res, next) {
    try {
      const cars = await carsService.getAll()
      // NOTE res.send sends the data back to the client
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const car = await carsService.getById(req.params.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await carCommentsService.getAll({ carId: req.params.id })
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER EVER trust client!!
      req.body.creatorId = req.userInfo.id
      const createdCar = await carsService.create(req.body)
      socketProvider.message('NEW_CAR', createdCar)
      res.send(createdCar)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const deletedCar = await carsService.remove(req.params.id, req.userInfo.id)
      res.send(deletedCar)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const editedCar = await carsService.edit(req.params.id, req.body)
      res.send(editedCar)
    } catch (error) {
      next(error)
    }
  }

  async getBidsByCar(req, res, next) {
    try {
      const carBids = await carBidsService.getBidsByCar(req.params.id)
      res.send(carBids)
    } catch (error) {
      next(error)
    }
  }

  async createBid(req, res, next) {
    try {
      req.body.carId = req.params.id
      req.body.accountId = req.userInfo.id
      const createdBid = await carBidsService.createBid(req.body)
      socketProvider.messageRoom(req.params.id, 'NEW_BID', createdBid)
      res.send(createdBid)
    } catch (error) {
      next(error)
    }
  }

  async increaseBid(req, res, next) {
    try {
      req.body.carId = req.params.id
      req.body.accountId = req.userInfo.id
      const editedBid = await carBidsService.increaseBid(req.body)
      socketProvider.messageRoom(req.params.id, 'INCREASED_BID', editedBid)
      res.send(editedBid)
    } catch (error) {
      next(error)
    }
  }
}
