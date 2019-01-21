'use strict';

/**
 * Brand.js controller
 *
 * @description: A set of functions called "actions" for managing `Brand`.
 */

module.exports = {

  /**
   * Retrieve brand records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.brand.search(ctx.query);
    } else {
      return strapi.services.brand.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a brand record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.brand.fetch(ctx.params);
  },

  /**
   * Count brand records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.brand.count(ctx.query);
  },

  /**
   * Create a/an brand record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.brand.add(ctx.request.body);
  },

  /**
   * Update a/an brand record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.brand.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an brand record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.brand.remove(ctx.params);
  },

  /**
   * Add relation to a/an brand record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.brand.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an brand record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.brand.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an brand record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.brand.removeRelation(ctx.params, ctx.request.body);
  }
};
