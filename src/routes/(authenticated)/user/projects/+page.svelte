<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { createQuery } from '@tanstack/svelte-query';
	import { AlertDialog, Avatar, Button, LinkPreview } from 'bits-ui';
	import type { RecordModel } from 'pocketbase';
	import Collaborator from './(components)/collaborator.svelte';
	import Project from './(components)/project.svelte';

	const baseURL = import.meta.env.VITE_POCKETBASE_URL;
	let editingProject = $state<RecordModel | null>(null);
	let newTitle = $state<string>('');
	let dialogOpen = $state<boolean>(false);
	let saving = $state<boolean>(false);

	const query = createQuery(() => ({
		queryKey: ['projects'],
		queryFn: () =>
			pocketbase.collection('projects').getFullList({
				filter: `deleted = null`,
				expand: 'owner_id,collaborators'
			})
	}));

	$effect(() => {
		console.log('Projects Data:', query.data);
	});



	function enterProject(projectId: string) {
		window.location.href = `/user/projects/${projectId}`;
	}

	async function deleteProject(project: RecordModel) {
		if (confirm('¿Seguro que quieres borrar este proyecto?')) {
			await pocketbase.collection('projects').update(project.id, { deleted: new Date().toISOString() });
			query.refetch();
		}
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
				<Project {project} handleButtonOk={() => enterProject(project.id)} handleButtonDelete={() => deleteProject(project)} />
			{/each}
		</div>
	{/if}
</div>
