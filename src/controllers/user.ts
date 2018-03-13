import { Request, Response } from 'express'
import { controller, httpGet, httpDelete, httpPut, httpPost } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Types } from '../constants'
import { UserService } from '../services/user'

/**
 * The user controller. Contains all endpoints for handling users and user data.
 *
 * /api/users
 * @class UserController
 */
@controller('/api/users')
export class UserController {
  constructor (@inject(Types.UserService) private userService: UserService) {}

  /**
   * Gets all users from the database, excluding most user information.
   *
   * GET /
   * @param {Request} request
   * @param {Response} response
   * @returns Promise<User[]>
   * @memberof UserController
   */
  @httpGet('/')
  async find (request: Request, response: Response) {
    return this.userService.getUsers()
  }

  /**
   * Gets a user by their ID, including all user information.
   *
   * GET /:id
   * @param {Request} request
   * @param {Response} response
   * @returns Promise<User>
   * @memberof UserController
   */
  @httpGet('/:id')
  async findById (request: Request, response: Response) {
    return this.userService.getUser(request.params.id)
  }

  /**
   * Creates a user.
   *
   * POST /
   * @param {Request} request
   * @param {Response} response
   * @returns Promise<User>
   * @memberof UserController
   */
  @httpPost('/')
  async create (request: Request, response: Response) {
    return this.userService.create(request.body)
  }

  /**
   * Hard deletes a user.
   *
   * DELETE /:id
   * @param {Request} request
   * @param {Response} response
   * @returns Promise<void>
   * @memberof UserController
   */
  @httpDelete('/:id')
  async remove (request: Request, response: Response) {
    return this.userService.delete(request.params.id)
  }

  /**
   * Updates a user by ID.
   *
   * PUT /:id
   * @param {Request} request
   * @param {Response} response
   * @returns Promise<void>
   * @memberof UserController
   */
  @httpPut('/:id')
  async update (request: Request, response: Response) {
    return this.userService.update(request.params.id, request.body)
  }

  /**
   * Updates a user's level by ID.
   *
   * PUT /:id/level
   * @param {Request} request
   * @param {Response} response
   * @returns Promise<void>
   * @memberof UserController
   */
  @httpPut('/:id/level')
  async updateLevel (request: Request, response: Response) {
    return this.userService.updateLevel(request.params.id, request.body)
  }
}