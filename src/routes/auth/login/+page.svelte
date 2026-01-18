<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { AuthWithGoogle, AuthWithUserPass } from '$lib/stores/authStore';
	import { Icon, icons } from '@lucide/svelte';
	import { Button, Dialog } from 'bits-ui';

	import { currentUser } from '$lib/stores/authStore';

	let email = $state('');
	let password = $state('');
	let openDialog = $state(false);

	$effect(() => {
		currentUser.subscribe((user) => {
			if (user) {
				window.location.href = '/user/dashboard';
			}
		});
	});
</script>

<div class="mx-auto mt-8 flex items-center justify-center flex-col gap-4">
	<Button.Root class="bg-primary rounded-2xl p-4" onclick={AuthWithGoogle}>
		<icons.GlobeLock class="mr-2 inline-block size-5 text-white" />
		<span class="inline-block text-white"> Sign in with Google </span>
	</Button.Root>
	<Button.Root class="bg-primary rounded-2xl p-4" onclick={() => (openDialog = true)}>
		<icons.GlobeLock class="mr-2 inline-block size-5 text-white" />
		<span class="inline-block text-white"> Sign in with user / pass </span>
	</Button.Root>
</div>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
	<Dialog.Content
		class="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg focus:outline-none"
	>
		<Dialog.Title class="mb-4 text-lg font-medium">Login with Email and Password</Dialog.Title>
		<div class="flex flex-col gap-4">
			<input
				type="email"
				placeholder="Email"
				bind:value={email}
				class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
			/>
			<input
				type="password"
				placeholder="Password"
				bind:value={password}
				class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
			/>
			<Button.Root
				class="bg-primary rounded-2xl p-4 text-white"
				onclick={() => AuthWithUserPass(email, password)}
			>
				<span class="inline-block"> Login </span>
			</Button.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
