import { pocketbase } from "$lib/pocketbase/pocketbase";
import type { RecordModel } from "pocketbase";
import { writable } from "svelte/store";

export const currentUser = writable<RecordModel | null>(null);
export const currentUserToken = writable<string | null>(null);

export function AuthWithGoogle() {
	pocketbase
		.collection('users')
		.authWithOAuth2({
			provider: 'google'
		})
		.then((authData) => {
			currentUser.set(authData.record);
			currentUserToken.set(authData.token);
		});
}

export function AuthWithUserPass(email: string, password: string) {
	pocketbase
		.collection('users')
		.authWithPassword(email, password)
		.then((authData) => {
			currentUser.set(authData.record);
			currentUserToken.set(authData.token);
		});
}

export function SignOut() {
	pocketbase.authStore.clear();
	currentUser.set(null);
	currentUserToken.set(null);
}

export function AuthRefresh() {
	pocketbase.collection("users")
		.authRefresh()
		.then((authData) => {
			currentUser.set(authData.record);
			currentUserToken.set(authData.token);
		});
}

// Rehidratar store al iniciar la aplicación
if (pocketbase.authStore.isValid) {
	const authRecord = pocketbase.authStore.model as RecordModel;
	currentUser.set(authRecord);
	currentUserToken.set(pocketbase.authStore.token);
}

pocketbase.authStore.onChange(() => {
	if (pocketbase.authStore.isValid) {
		const authRecord = pocketbase.authStore.model as RecordModel;
		currentUser.set(authRecord);
		currentUserToken.set(pocketbase.authStore.token);
	} else {
		currentUser.set(null);
		currentUserToken.set(null);
	}
});


