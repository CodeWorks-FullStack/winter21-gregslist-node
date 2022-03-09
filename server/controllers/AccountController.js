import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { carBidsService } from '../services/CarBidsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editAccount)
      .get('/bids', this.getBidsByAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      res.send(await accountService.updateAccount(req.userInfo, req.body))
    } catch (error) {
      next(error)
    }
  }

  async getBidsByAccount(req, res, next) {
    try {
      const accountBids = await carBidsService.getBidsByAccount(req.userInfo.id)
      res.send(accountBids)
    } catch (error) {
      next(error)
    }
  }
}
