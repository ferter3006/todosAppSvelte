<script lang="ts">
	import { Button, Dialog } from 'bits-ui';

	let {
		dialogTitle,
		dialogDescription,
		openDialog = $bindable(),
		todoTitle,
		todoDescription,
		handleCreateOrUpdate
	} = $props();
</script>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 mx-auto w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-4 max-md:max-w-md"
		>
			<Dialog.Title class="mb-2 text-lg font-semibold">{dialogTitle}</Dialog.Title>
			<Dialog.Description class="text-muted-foreground mb-4">{dialogDescription}</Dialog.Description
			>
			<input
				class="rounded-input mb-2 w-full border px-3 py-2 text-base"
				type="text"
				bind:value={todoTitle}
				placeholder="Título"
			/>
			<textarea
				class="rounded-input mb-4 w-full border px-3 py-2 text-base"
				rows="3"
				bind:value={todoDescription}
				placeholder="Descripción"
			></textarea>
			<div class="flex justify-end gap-2">
				<Button.Root
					class="bg-primary rounded-input px-4 py-2 font-semibold text-white"
					onclick={handleCreateOrUpdate}
				>
					Crear
				</Button.Root>
				<Dialog.Close
					class="bg-destructive rounded-input px-4 py-2 font-medium text-white"
					onclick={() => (openDialog = false)}
					>Cancelar
				</Dialog.Close>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
