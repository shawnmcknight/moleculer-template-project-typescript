"use strict";

import DbMixin from "../mixins/db.mixin";
import { Context, ServiceSchema } from "moleculer";
import DbService from "moleculer-db";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const ProductsService: ServiceSchema & ThisType<DbService> = {
	name: "products",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("products")],

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: ["_id", "name", "quantity", "price"],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string|min:3",
			price: "number|positive",
		},
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx: Context<{ quantity: number }>): void {
				ctx.params.quantity = 0;
			},
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		// --- ADDITIONAL ACTIONS ---

		/**
		 * Increase the quantity of the product item.
		 */
		increaseQuantity: {
			rest: "PUT /:id/quantity/increase",
			params: {
				id: "string",
				value: { type: "number", integer: true, positive: true },
			},
			async handler(ctx: Context<{ id: string; value: number }>) {
				const doc = await this.adapter.updateById(ctx.params.id, {
					$inc: { quantity: ctx.params.value },
				});
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			},
		},

		/**
		 * Decrease the quantity of the product item.
		 */
		decreaseQuantity: {
			rest: "PUT /:id/quantity/decrease",
			params: {
				id: "string",
				value: { type: "number", integer: true, positive: true },
			},
			/** @param {Context} ctx  */
			async handler(ctx: Context<{ id: string; value: number }>) {
				const doc = await this.adapter.updateById(ctx.params.id, {
					$inc: { quantity: -ctx.params.value },
				});
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB(): Promise<void> {
			await this.adapter.insertMany([
				{ name: "Samsung Galaxy S10 Plus", quantity: 10, price: 704 },
				{ name: "iPhone 11 Pro", quantity: 25, price: 999 },
				{ name: "Huawei P30 Pro", quantity: 15, price: 679 },
			]);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected(): Promise<void> {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};

module.exports = ProductsService;
export default ProductsService;
