<script lang="ts">
	import { AuthRefresh, currentUser } from '$lib/stores/authStore';
	import { LoaderCircle } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	let mounted = $state(false);

	$effect(() => {
		if (!$currentUser) {
			window.location.href = '/';
		}
	});

	onMount(() => {
		AuthRefresh();
		mounted = true;
	});
</script>

{#if !mounted}
	<LoaderCircle class="text-primary mx-auto mt-20 animate-spin" size={48} />
{:else}
	{@render children()}
{/if}
