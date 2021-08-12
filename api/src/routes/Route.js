import { Route as RouteBase } from 'koa-smart'
import { crypto } from '../utils/crypto'
import { logError } from '../utils/log'

export default class Route extends RouteBase {
  constructor(params) {
    super(params)
  }

  async beforeRoute(ctx, infos, next) {
    // the "beforeRoute" function is executed before any call to a route belonging to the same class
    // (or a class ihneriting from it) is made.

    if (!ctx.session.id) {
      ctx.session.id = crypto.generateToken()
    }

    try {
      await super.beforeRoute(ctx, infos, next)
    } catch (e) {
      logError(e)
      throw e
    }
  }

  user(ctx) {
    return ctx.state.user
  }
  userId(ctx) {
    return this.user(ctx) ? this.user(ctx).id : null
  }
}

async function isLogin(ctx) {
  return !!ctx.state.user
}

export const Access = {
  isLogin,
}
