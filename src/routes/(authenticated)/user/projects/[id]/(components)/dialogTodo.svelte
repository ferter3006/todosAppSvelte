<script lang="ts">
	import { AlertDialog } from 'bits-ui';

	export let openDialog: boolean;
	export let todoTitle: string;
	export let todoDescription: string;
	export let handlesCreateOrUpdate: () => void;
</script>

<AlertDialog.Root bind:open={openDialog}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<AlertDialog.Content
			class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-6"
		>
			<AlertDialog.Title class="mb-2 text-lg font-semibold">Crear nueva tarea</AlertDialog.Title>
			<AlertDialog.Description class="text-muted-foreground mb-4"
				>Introduce el título y la descripción de la tarea.</AlertDialog.Description
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
				<AlertDialog.Cancel>
					<button class="bg-muted text-foreground rounded-input px-4 py-2 font-medium"
						>Cancelar</button
					>
				</AlertDialog.Cancel>
				<AlertDialog.Action>
					<button
						class="bg-primary rounded-input px-4 py-2 font-semibold text-white"
						onclick={handlesCreateOrUpdate}
					>
						Crear
					</button>
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
