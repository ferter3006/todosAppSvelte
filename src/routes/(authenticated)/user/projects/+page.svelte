<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { createQuery } from '@tanstack/svelte-query';
	import type { RecordModel } from 'pocketbase';
	import ProjectCardForProjectsLanding from './(components)/ProjectCardForProjectsLanding.svelte';
	import { Button, Dialog } from 'bits-ui';
	import { Loader } from '@lucide/svelte';

	let dialogCreateProject = $state<boolean>(false);
	let newTitle = $state<string>('');
	let newDescription = $state<string>('');
	let creating = $state<boolean>(false);

	const query = createQuery(() => ({
		queryKey: ['projects'],
		queryFn: () =>
			pocketbase.collection('projects').getFullList({
				filter: `deleted = null`,
				sort: 'created',
				expand: 'owner_id,collaborators'
			})
	}));

	function enterProject(projectId: string) {
		window.location.href = `/user/projects/${projectId}`;
	}

	async function handleCreate() {
		creating = true;
		const title = newTitle.trim();
		const description = newDescription.trim();
		if (!title) return;
		await pocketbase
			.collection('projects')
			.create({
				title,
				description,
				owner_id: pocketbase.authStore.model?.id
			})
			.then(() => {
				query.refetch();
			});
		dialogCreateProject = false;
		newTitle = '';
		newDescription = '';
		creating = false;
	}
</script>

<div class="flex min-h-[70vh] flex-col items-center p-4">
	<h1 class="text-primary mb-6 text-3xl font-bold">Tus proyectos</h1>
	{#if query.isLoading}
		<p class="text-muted-foreground">Cargando proyectos...</p>
	{:else if query.isError}
		<p class="text-destructive">Error cargando proyectos: {query.error.message}</p>
	{:else if query.data?.length === 0}
		<p class="text-muted-foreground">No tienes proyectos aún.</p>
	{:else}
		<div class="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each query.data as project}
				<ProjectCardForProjectsLanding
					{project}
					{query}
					handleButtonOk={() => enterProject(project.id)}
				/>
			{/each}
		</div>
	{/if}
	<!-- Add New Project Button could go here -->
	<div class="mt-6">
		<button
			class="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white"
			onclick={() => (dialogCreateProject = true)}
		>
			+ Nuevo Proyecto
		</button>
	</div>
</div>
<!-- Dialog para crear nuevo proyecto  -->
<Dialog.Root bind:open={dialogCreateProject}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		{#if !creating}
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
						class="bg-primary  rounded-input cursor-pointer px-4 py-2 font-semibold text-white"
						onclick={handleCreate}
					>
						Crear
					</Button.Root>
					<Dialog.Close
						class="bg-destructive rounded-input cursor-pointer px-4 py-2 font-medium text-white"
					>
						Cancelar
					</Dialog.Close>
				</div>
			</Dialog.Content>
		{:else}
			<Dialog.Content
				class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col items-center p-6"
			>
				<Loader class="text-primary animate-spin" size={48} />
			</Dialog.Content>
		{/if}
	</Dialog.Portal>
</Dialog.Root>
