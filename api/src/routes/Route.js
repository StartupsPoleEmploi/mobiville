import { Route as RouteBase } from 'koa-smart'

export default class Route extends RouteBase {
  constructor(params) {
    super(params)
  }

  async beforeRoute(ctx, infos, next) {
    // the "beforeRoute" function is executed before any call to a route belonging to the same class
    // (or a class ihneriting from it) is made.
    try {
      await super.beforeRoute(ctx, infos, next)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  user(ctx) {
    return ctx.state.user
  }
  userId(ctx) {
    return this.user(ctx) ? this.user(ctx).id : null
  }

  async addUserInfoInBody(ctx, id) {
    /* if (!id && ctx.state.user) {
      id = ctx.state.user.id;
    }
    this.assertUnauthorized(id);

    const user = await this.models.users.findById(id, { attributes: ['email'], raw: true });
    this.assertUnauthorized(user);
    ctx.body.user = user;

    return user;*/
    return null
  }
}

async function isLogin(ctx) {
  return !!ctx.state.user
}

export const Access = {
  isLogin,
}
