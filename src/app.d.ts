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
		updateCallbackDone: Promise<Void>;
		ready: Promise<Void>;
		finished: Promise<Void>;
		skipTransition: () => void;
	}
	type Theme = 'light' | 'dark';
}

export {};
