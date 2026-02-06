<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { currentUser, SignOut } from '$lib/stores/authStore';
	import ferterIcon from '$lib/assets/ferterIcon.png';

</script>

<div class="bg-primary flex w-full items-center justify-between p-2 sm:hidden">
	<img src={ferterIcon} alt="Logo" class="h-8 w-8 rounded-full" />
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class="border-input text-foreground shadow-btn hover:bg-muted inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium select-none active:scale-[0.98]"
			aria-label="Abrir menú"
		>
			<svg
				class="text-foreground h-6 w-6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
				><circle cx="12" cy="12" r="1.5" /><circle cx="19.5" cy="12" r="1.5" /><circle
					cx="4.5"
					cy="12"
					r="1.5"
				/></svg
			>
		</DropdownMenu.Trigger>
		<DropdownMenu.Portal>
			<DropdownMenu.Content
				class="border-muted bg-background shadow-popover w-56 rounded-xl border px-1 py-1.5 outline-hidden focus-visible:outline-hidden"
				sideOffset={8}
			>
				<DropdownMenu.Item>
					<a href="/user/dashboard" class="hover:bg-muted flex items-center gap-2 rounded px-3 py-2"
						>Ferter TO-DOs</a
					>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a href="/user/projects" class="hover:bg-muted flex items-center gap-2 rounded px-3 py-2"
						>Projects</a
					>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a href="/user/notes" class="hover:bg-muted flex items-center gap-2 rounded px-3 py-2"
						>Global Notes</a
					>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a href="/user/stats" class="hover:bg-muted flex items-center gap-2 rounded px-3 py-2"
						>Stats</a
					>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				{#if $currentUser}
					<DropdownMenu.Item>
						<a href="/user/profile" class="hover:bg-muted flex items-center gap-2 rounded px-3 py-2"
							>Perfil</a
						>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<button
							class="hover:bg-muted flex w-full items-center gap-2 rounded px-3 py-2 text-left"
							on:click={SignOut}>Sign Out</button
						>
					</DropdownMenu.Item>
				{:else}
					<DropdownMenu.Item>
						<a href="/auth/login" class="hover:bg-muted flex items-center gap-2 rounded px-3 py-2"
							>Sign In</a
						>
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	</DropdownMenu.Root>
</div>
