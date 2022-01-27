import { Auth0Provider } from '@bcwdev/auth0provider'
import { carCommentsService } from '../services/CarCommentsService'
import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE everything below this .use will be 'locked' down and we can access the auth user info
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
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
}
