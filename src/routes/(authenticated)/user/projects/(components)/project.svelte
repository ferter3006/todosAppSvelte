<script lang="ts">
	import { AlertDialog, Avatar, Button } from 'bits-ui';
	import Collaborator from './collaborator.svelte';
	import type { RecordModel } from 'pocketbase';
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { createQuery } from '@tanstack/svelte-query';

	// declare on:handleButtonOk and on:handleButtonDelete events

	let { project, handleButtonOk, handleButtonDelete } = $props();

	const query = createQuery(() => ({
		queryKey: ['projects'],
		queryFn: () =>
			pocketbase.collection('projects').getFullList({
				filter: `deleted = null`,
				expand: 'owner_id,collaborators'
			})
	}));

	let editingProject = $state<RecordModel | null>(null);
	let newTitle = $state<string>('');
	let dialogOpen = $state<boolean>(false);
	let saving = $state<boolean>(false);

	function openEditDialog(project: RecordModel) {
		console.log('Editing project:', project);
		editingProject = project;
		newTitle = project.title;
		dialogOpen = true;
	}

	async function handleSave() {
		saving = true;
		const title = newTitle.trim();
		if (!title) return;
		if (!editingProject) return;
		await pocketbase.collection('projects').update(editingProject.id, { title });
		editingProject = null;
		query.refetch();
		saving = false;
		dialogOpen = false;
	}

	function handleCancel() {
		editingProject = null;
		dialogOpen = false;
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

<AlertDialog.Root bind:open={dialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Title>Editar proyecto</AlertDialog.Title>
		<div class="mt-2 flex flex-col gap-4">
			<label>
				Nombre:
				<input class="input" bind:value={editingProject!.title} />
			</label>
			<label>
				Descripción:
				<textarea class="input" bind:value={editingProject!.description}></textarea>
			</label>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<Button.Root onclick={handleCancel} class="bg-muted">Cancelar</Button.Root>
			<Button.Root onclick={handleSave} class="bg-primary text-white">Guardar</Button.Root>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
