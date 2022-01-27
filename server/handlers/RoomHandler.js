import { SocketHandler } from '../utils/SocketHandler'

export class RoomHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('JOIN_ROOM', this.joinRoom)
      .on('LEAVE_ROOM', this.leaveRoom)
  }

  async joinRoom(payload) {
    if (!payload.room) {
      this.socket.emit('error', { message: 'You must provide property "room" to JOIN_ROOM' })
      return
    }
    this.socket.join(payload.room)
    this.socket.emit('JOINED', { room: payload.room })
  }

  async leaveRoom(payload) {
    if (!payload.room) {
      this.socket.emit('error', { message: 'You must provide property "room" to JOIN_ROOM' })
      return
    }
    this.socket.leave(payload.room)
    this.socket.emit('LEFT', { room: payload.room })
  }
}
