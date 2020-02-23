import { IncomingMessage } from "http";
import { ActionSchema } from "moleculer";

declare module "moleculer-web" {
	export class IncomingRequest extends IncomingMessage {
		$action: ActionSchema;
	}
}
