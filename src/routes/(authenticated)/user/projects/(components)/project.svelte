<script lang="ts">
	import { AlertDialog, Avatar, Button, Dialog } from 'bits-ui';
	import Collaborator from './collaborator.svelte';
	import type { RecordModel } from 'pocketbase';
	import { pocketbase } from '$lib/pocketbase/pocketbase';

	// declare on:handleButtonOk and on:handleButtonDelete events

	let { project, handleButtonOk, query } = $props();
	let confirmDeleteDialog = $state<boolean>(false);

	let editingProject = $state<RecordModel | null>(null);
	let deletingProject = $state<RecordModel | null>(null);
	let newTitle = $state<string>('');
	let newDescription = $state<string>('');
	let dialogOpen = $state<boolean>(false);
	let saving = $state<boolean>(false);

	function openEditDialog(project: RecordModel) {
		editingProject = project;
		newTitle = project.title;
		newDescription = project.description || '';
		dialogOpen = true;
	}

	async function handleSave() {
		saving = true;
		const title = newTitle.trim();
		const description = newDescription.trim();
		if (!title) return;
		if (!editingProject) return;
		await pocketbase.collection('projects').update(editingProject.id, { title, description });
		editingProject = null;
		query.refetch();
		saving = false;
		dialogOpen = false;
	}

	function handleButtonDelete(project: RecordModel) {
		deletingProject = project;
		confirmDeleteDialog = true;
		editingProject = null;
		dialogOpen = false;
	}

	function deleteProjectConfirmed() {
		if (!deletingProject) return;
		pocketbase
			.collection('projects')
			.update(deletingProject.id, { deleted: new Date().toISOString() })
			.then(() => {
				query.refetch();
				confirmDeleteDialog = false;
			});
	}
</script>

<div class="bg-background shadow-card group relative flex flex-col gap-4 rounded-xl border p-6">
	<div class="flex items-center gap-3">
		<Avatar.Root class="bg-muted h-12 w-12">
			<div
				class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
			>
				{#if project.expand?.owner_id?.avatar}
					<Avatar.Image
						src={'http://localhost:8090/api/files/users/' +
							project.expand.owner_id.id +
							'/' +
							project.expand.owner_id.avatar}
						alt="avatar"
					/>
				{:else}
					<Avatar.Fallback class="border-muted border text-lg font-bold"
						>{project.expand?.owner_id?.name?.[0] ?? '?'}</Avatar.Fallback
					>
				{/if}
			</div>
		</Avatar.Root>
		<div class="flex-1">
			<span class="text-muted-foreground text-xs">Propietario</span>
			<div class="text-primary font-semibold">
				{project.expand?.owner_id?.name ?? 'Sin nombre'}
			</div>
		</div>
	</div>
	<div class="items-left flex flex-col gap-2">
		<h2 class="flex-1 text-xl font-bold">
			{project.title}
		</h2>
		<p>{project.description}</p>
		<Button.Root
			class="bg-dark text-background rounded-input hover:bg-dark/90 cursor-pointer px-3 py-1 text-sm font-semibold"
			onclick={() => openEditDialog(project)}
		>
			Editar nombre
		</Button.Root>
	</div>
	<div class="flex flex-wrap items-center gap-2">
		<span class="text-muted-foreground text-xs">Colaboradores:</span>
		{#if project.expand?.collaborators?.length}
			<div class="flex flex-wrap gap-2">
				{#each project.expand.collaborators as user}
					<Collaborator {user} />
				{/each}
			</div>
		{:else}
			<span class="text-muted-foreground text-xs">Ninguno</span>
		{/if}
	</div>
	<div class="mt-4 flex gap-2">
		<Button.Root
			class="bg-primary rounded-input hover:bg-primary/90 flex-1 cursor-pointer px-4 py-2 font-semibold text-white"
			onclick={() => handleButtonOk(project.id)}
		>
			Entrar
		</Button.Root>
		<Button.Root
			class="bg-destructive rounded-input hover:bg-destructive/90 cursor-pointer px-4 py-2 font-semibold text-white"
			onclick={() => handleButtonDelete(project)}
		>
			Borrar
		</Button.Root>
	</div>
</div>

<!-- Dialogo para editar nombre y descripcion -->
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-6"
		>
			<Dialog.Title class="mb-2 text-lg font-semibold">Editar nombre del proyecto</Dialog.Title>
			<Dialog.Description class="text-muted-foreground mb-4"
				>Cambia el nombre y guarda para actualizar.</Dialog.Description
			>
			<input
				class="rounded-input mb-4 w-full border px-3 py-2 text-base"
				type="text"
				bind:value={newTitle}
				placeholder="Nuevo nombre"
			/>
			<textarea
				class="rounded-input mb-4 w-full border px-3 py-2 text-base"
				rows="3"
				bind:value={newDescription}
				placeholder="Descripción"
			></textarea>
			<div class="flex justify-end gap-2">
				<Button.Root
					class="bg-primary rounded-input cursor-pointer px-4 py-2 font-semibold text-white"
					onclick={handleSave}
					disabled={!editingProject}
				>
					Guardar
				</Button.Root>
				<Dialog.Close
					class="bg-destructive text-white rounded-input cursor-pointer px-4 py-2 font-medium"
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
				<AlertDialog.Cancel class="bg-destructive text-white rounded-input px-4 py-2 font-medium"
					>Cancelar
				</AlertDialog.Cancel>
				<AlertDialog.Action
					class="bg-destructive rounded-input px-4 py-2 font-semibold text-white"
					onclick={deleteProjectConfirmed}
				>
					Eliminar
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
