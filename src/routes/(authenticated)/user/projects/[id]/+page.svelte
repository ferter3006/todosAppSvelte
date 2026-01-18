<script lang="ts">
	import { page } from '$app/state';
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { createQuery } from '@tanstack/svelte-query';
	import { Button } from 'bits-ui';
	import Todo from './(components)/todo.svelte';
	import DialogTodo from './(components)/dialogTodo.svelte';

	let openDialog = $state(false);
	let todoTitle = $state('');
	let todoDescription = $state('');

	// get id from routing params
	const projectId = page.params.id;

	const queryProject = createQuery(() => ({
		queryKey: ['project', projectId],
		queryFn: () =>
			pocketbase.collection('projects').getOne(projectId!, {
				expand: 'owner_id,colaborators, todos_via_project_id'
			})
	}));

	async function createTodo() {
		if (!todoTitle || !todoTitle) return;
		await pocketbase
			.collection('todos')
			.create({
				title: todoTitle,
				description: todoDescription,
				project_id: projectId
			})
			.then(() => {
				queryProject.refetch();
			});
		openDialog = false;
		todoTitle = '';
		todoDescription = '';
		// Si tienes un queryTodos.refetch(), llama aquí para refrescar la lista
	}
</script>

{#if queryProject.isLoading}
	<p>Cargando proyecto...</p>
{:else if queryProject.isError}
	<p>Error al cargar el proyecto: {queryProject.error?.message}</p>

{:else}
	<div class="m-8 flex flex-col items-center justify-center gap-6">
		<h1 class="text-3xl font-bold">{queryProject.data?.title}</h1>
		<div class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each queryProject.data?.expand?.todos_via_project_id as todo}
				<Todo {todo} {queryProject} />
			{/each}
		</div>
		<div id="add-todo-button" class="w-max">
			<Button.Root
				class="hover:bg-primary/90 rounded-md bg-black px-5 py-3 font-bold text-white"
				onclick={() => (openDialog = true)}
			>
				Agregar TODO
			</Button.Root>
		</div>
	</div>
{/if}

<DialogTodo
	dialogTitle="Crear nueva tarea"
	dialogDescription="Introduce el título y la descripción de la tarea."
	bind:openDialog={openDialog}
	{todoTitle}
	{todoDescription}
	handleCreateOrUpdate={createTodo}
/>
