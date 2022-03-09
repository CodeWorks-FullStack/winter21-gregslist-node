import { Auth0Provider } from '@bcwdev/auth0provider'
import { carCommentsService } from '../services/CarCommentsService'
import BaseController from '../utils/BaseController'

export class CarCommentsController extends BaseController {
  constructor() {
    super('api/carComments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE everything below this .use will be 'locked' down and we can access the auth user info
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER EVER trust client!!
      req.body.creatorId = req.userInfo.id
      const createdCarComment = await carCommentsService.create(req.body)
      res.send(createdCarComment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const deletedCarComment = await carCommentsService.remove(req.params.id, req.userInfo.id)
      res.send(deletedCarComment)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const editedCarComment = await carCommentsService.edit(req.params.id, req.body)
      res.send(editedCarComment)
    } catch (error) {
      next(error)
    }
  }
}
