<script lang="ts">
	import { page } from '$app/stores';
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import '../../../../app.css';

	// get id from routing params
	const transactionId = $page.params.id;

	function authViaGoogleForGodot() {
		
		pocketbase
			.collection('users')
			.authWithOAuth2({
				provider: 'google'
			})
			.then((authData) => {
				console.log('Auth Data:', authData.token);
				pocketbase.collection('transactions').create({
					transaction_id: transactionId,
					token: authData.token,
					status: 'PENDING'
				}).then(() => {
					window.close();
				});
			})
	}

</script>

<div class="flex min-h-screen w-screen items-center justify-center bg-black">
	<div class="flex flex-col items-center justify-center gap-8">
		<h1 class="text-3xl font-bold text-white">Login for Godot</h1>
		<button
			class="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-600"
			on:click={authViaGoogleForGodot}
		>
			log in with google
		</button>
		<p class="text-xxs font-bold text-white">{transactionId}</p>
	</div>
</div>
