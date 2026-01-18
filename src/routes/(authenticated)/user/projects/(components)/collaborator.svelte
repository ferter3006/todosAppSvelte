<script lang="ts">
	import { Avatar } from "bits-ui";
    
    const baseURL = import.meta.env.VITE_POCKETBASE_URL;
    let { user } = $props();

</script>
<div class="flex items-center rounded-xl border-1 px-2 py-1">
	<Avatar.Root class="bg-muted mr-2 h-8 w-8">
		<div
			class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
		>
			{#if user.avatar}
				<Avatar.Image
					src={`${baseURL}/api/files/users/${user.id}/${user.avatar}`}
					alt={user.name}
				/>
			{:else}
				<Avatar.Fallback class="border-muted border text-xs font-bold"
					>{user.name?.[0] ?? '?'}</Avatar.Fallback
				>
			{/if}
		</div>
	</Avatar.Root>
	{user.name}
</div>
