<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { AlertDialog, Button, Dialog, Select } from 'bits-ui';
	import { ArrowUp, BicepsFlexed, ChevronsUpDown, Pen, Pickaxe, X } from '@lucide/svelte';

	let { todo, queryProject } = $props();

	let temp_todo: RecordModel | undefined = $state(undefined);
	let openDialog = $state(false);
	let confirmDeleteDialog = $state<boolean>(false);

	const stateOptions = [
		{ value: 'pending', label: 'Pendiente' },
		{ value: 'inProgress', label: 'En progreso' },
		{ value: 'completed', label: 'Completado' }
	];
	let stateValue = $derived<string>(todo.state);

	async function updateTodo() {
		if (!temp_todo) return;
		await pocketbase.collection('todos').update(todo.id, temp_todo);
		queryProject.refetch();
		openDialog = false;
	}

	async function deleteTodo() {		
		await pocketbase.collection('todos').update(todo.id, { deleted: new Date().toISOString() });
		confirmDeleteDialog = false;
		queryProject.refetch();
	}

	async function handleStateChange(value: string) {
		stateValue = value;
		await pocketbase.collection('todos').update(todo.id, { state: value });
		queryProject.refetch();
	}
</script>

<div
	class="relative flex flex-col rounded-xl border bg-white p-5 shadow-md transition hover:shadow-lg"
>
	<div class="absolute top-2 right-2 flex gap-2">
		<Button.Root
			class="bg-primary hover:bg-primary/80 cursor-pointer rounded-xl p-2 text-white"
			aria-label="Editar tarea"
			onclick={() => ((temp_todo = { ...todo }), (openDialog = true))}
		>
			<Pen size={18} />
		</Button.Root>
		<Button.Root
			class="bg-destructive hover:bg-destructive/80 cursor-pointer rounded-xl p-2 text-white"
			aria-label="Borrar tarea"
			onclick={() => (confirmDeleteDialog = true)}
		>
			<X size={18} />
		</Button.Root>
	</div>
	<h2 class="mb-1 text-lg font-bold text-gray-900">{todo.title}</h2>
	<p class="mb-2 whitespace-pre-line text-gray-700">{@html todo.description}</p>
	<div class="mb-2 flex items-center gap-2">
		<span class="text-sm text-gray-500">Estado:</span>
		<Select.Root
			type="single"
			items={stateOptions}
			value={stateValue}
			onValueChange={handleStateChange}
			allowDeselect={false}
		>
			<Select.Trigger
				class="h-input rounded-9px border-border-input bg-background data-placeholder:text-foreground-alt/50 inline-flex w-auto min-w-[220px] touch-none items-center border px-[11px] text-sm transition-colors select-none"
				aria-label="Seleccionar estado"
			>
				<Pickaxe class="text-muted-foreground mr-2 size-5" />
				{stateOptions.find((s) => s.value === stateValue)?.label || 'Seleccionar'}
				<ChevronsUpDown class="text-muted-foreground ml-auto size-6" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					class="focus-override border-muted bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 h-fit max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] rounded-xl border px-1 py-3 shadow-2xl outline-hidden select-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
					sideOffset={10}
				>
					<Select.ScrollUpButton class="flex w-full items-center justify-center">
						<ArrowUp class="size-3" />
					</Select.ScrollUpButton>
					<Select.Viewport class="p-1">
						{#each stateOptions as opt, i (i + opt.value)}
							<Select.Item
								class="rounded-button data-highlighted:bg-muted flex h-10 w-full items-center py-3 pr-1.5 pl-5 text-sm capitalize outline-hidden select-none"
								value={opt.value}
								label={opt.label}
							>
								{opt.label}
							</Select.Item>
						{/each}
					</Select.Viewport>
					<Select.ScrollDownButton class="flex w-full items-center justify-center">
						<ChevronsUpDown size={26} class="text-black" />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	</div>
	<div class="mb-1 text-xs text-gray-400">Creado: {new Date(todo.created).toLocaleString()}</div>
</div>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 mx-auto w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-4 max-md:max-w-md"
		>
			<Dialog.Title class="mb-2 text-lg font-semibold">Actualizar tarea</Dialog.Title>
			<Dialog.Description class="text-muted-foreground mb-4"
				>Introduce el nuevo título y la descripción de la tarea.</Dialog.Description
			>
			<input
				class="rounded-input mb-2 w-full border px-3 py-2 text-base"
				type="text"
				bind:value={temp_todo!.title}
				placeholder="Título"
			/>
			<textarea
				class="rounded-input mb-4 w-full border px-3 py-2 text-base"
				rows="3"
				bind:value={temp_todo!.description}
				placeholder="Descripción"
			></textarea>
			<div class="flex justify-end gap-2">
				<Button.Root
					class="bg-primary rounded-input px-4 py-2 font-semibold text-white"
					onclick={updateTodo}
				>
					Actualizar
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

<AlertDialog.Root bind:open={confirmDeleteDialog}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<AlertDialog.Content
			class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-6"
		>
			<AlertDialog.Title class="mb-2 text-lg font-semibold">Confirmar eliminación</AlertDialog.Title
			>
			<AlertDialog.Description class="text-muted-foreground mb-4"
				>¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.</AlertDialog.Description
			>
			<div class="flex justify-end gap-2">
				<AlertDialog.Cancel
					class="bg-success rounded-input px-4 py-2 font-medium text-white"
					onclick={() => (confirmDeleteDialog = false)}
					>Mantener
				</AlertDialog.Cancel>
				<AlertDialog.Action
					class="bg-destructive rounded-input px-4 py-2 font-semibold text-white"
					onclick={deleteTodo}
				>
					Eliminar
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
