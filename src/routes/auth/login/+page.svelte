<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { AuthWithGoogle, AuthWithUserPass } from '$lib/stores/authStore';
	import { Icon, icons } from '@lucide/svelte';
	import { Button } from 'bits-ui';

	import { currentUser } from '$lib/stores/authStore';

	$effect(() => {
		currentUser.subscribe((user) => {
			if (user) {
				window.location.href = '/user/dashboard';
			}
		});
	});
</script>

<div class="mx-auto mt-8 flex items-center justify-center">
	<Button.Root class="bg-primary rounded-2xl p-4" onclick={AuthWithGoogle}>
		<icons.GlobeLock class="mr-2 inline-block size-5 text-white" />
		<span class="inline-block text-white"> Sign in with Google </span>
	</Button.Root>
	<Button.Root class="bg-primary rounded-2xl p-4" onclick={AuthWithGoogle}>
		<icons.GlobeLock class="mr-2 inline-block size-5 text-white" />
		<span class="inline-block text-white"> Sign in with user / pass </span>
	</Button.Root>
</div>
