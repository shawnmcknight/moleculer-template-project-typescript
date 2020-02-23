"use strict";

import { Context } from "moleculer";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "greeter",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello",
			},
			async handler(): Promise<string> {
				return "Hello Moleculer";
			},
		},

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			rest: "/welcome",
			params: {
				name: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx: Context<{ name: string }>): Promise<string> {
				return `Welcome, ${ctx.params.name}`;
			},
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created(): void {
		// add any logic to run at service create time
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started(): Promise<void> {
		// add any logic to run at service start time
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped(): Promise<void> {
		// add any logic to run at service stop time
	},
};
