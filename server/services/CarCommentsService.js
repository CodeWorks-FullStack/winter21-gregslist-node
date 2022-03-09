import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class CarCommentsService {
  async getAll(query = {}) {
    const foundCarComments = await dbContext.CarComments.find(query).populate('creator', 'name picture')
    return foundCarComments
  }

  async getById(carCommentId) {
    const foundCarComment = await dbContext.CarComments.findById(carCommentId).populate('creator', 'name picture')
    if (!foundCarComment) {
      throw new BadRequest('Unable to find carComment')
    }
    return foundCarComment
  }

  async create(newCarComment) {
    const createdCarComment = await dbContext.CarComments.create(newCarComment)
    return createdCarComment
  }

  async remove(carCommentId, creatorId) {
    const foundCarComment = await this.getById(carCommentId)
    if (foundCarComment.creatorId.toString() !== creatorId) {
      throw new BadRequest('Unauthorized to delete')
    }
    await foundCarComment.remove()
    return foundCarComment
  }

  async edit(carCommentId, editedCarComment) {
    const carCommentToEdit = await this.getById(carCommentId)
    if (carCommentToEdit.creatorId.toString() !== editedCarComment.creatorId) {
      throw new BadRequest('Unauthorized to edit')
    }
    carCommentToEdit.body = editedCarComment.body || carCommentToEdit.body
    await carCommentToEdit.save()
    return carCommentToEdit
  }
}

export const carCommentsService = new CarCommentsService()
