// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}
	interface Document {
		startViewTransition(updateCallbackDone: () => Promise<void>): ViewTransition;
	}
	interface SpotifyCredentials {
		_id: string;
		access_token: string;
		refresh_token: tring;
	}
}

export {};
