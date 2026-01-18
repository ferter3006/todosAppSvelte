<script lang="ts">
	import { page } from '$app/state';
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { createQuery } from '@tanstack/svelte-query';
	import { Button, Dialog } from 'bits-ui';
	import Todo from './(components)/todo.svelte';

	let openDialog = $state(false);
	let todoTitle = $state('');
	let todoDescription = $state('');

	// get id from routing params
	const projectId = page.params.id;

	const queryProject = createQuery(() => ({
		queryKey: ['project', projectId],
		queryFn: () =>
			pocketbase.collection('projects').getList(1, 1, {
				filter: `deleted = null && id = "${projectId}"`,
				expand: 'owner_id,collaborators'
			})
	}));

	const queryTodos = createQuery(() => ({
		queryKey: ['todos', projectId],
		queryFn: () =>
			pocketbase.collection('todos').getFullList({
				filter: `project_id = "${projectId}"`,
				sort: 'created'
			})
	}));

	$effect(() => {
		console.log('Project data:', queryProject.data);
		console.log('Todos data:', queryTodos.data);
	});

	async function createTodo() {
		console.log('	Creating todo:', todoTitle, todoDescription, projectId);
		if (!todoTitle || !todoTitle) return;

		await pocketbase
			.collection('todos')
			.create({
				title: todoTitle,
				description: todoDescription,
				state: 'pending',
				project_id: projectId
			})
			.then(() => {
				queryTodos.refetch();
			});

		openDialog = false;
		todoTitle = '';
		todoDescription = '';
	}
</script>

{#if queryProject.isLoading}
	<p>Cargando proyecto...</p>
{:else if queryProject.isError}
	<p>Error al cargar el proyecto: {queryProject.error?.message}</p>
{:else}
	<div class="m-8 flex flex-col items-center justify-center gap-6">
		<h1 class="text-3xl font-bold">{queryProject.data?.items[0].title}</h1>
		<div class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each queryTodos.data as todo}
				<Todo {todo} {queryProject} />
			{/each}
		</div>
		<div id="add-todo-button" class="w-max">
			<Button.Root
				class="hover:bg-primary/90 cursor-pointer rounded-md bg-black px-5 py-3 font-bold text-white"
				onclick={() => (openDialog = true)}
			>
				Agregar TODO
			</Button.Root>
		</div>
	</div>
{/if}

<Dialog.Root bind:open={openDialog}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover fixed top-1/2 left-1/2 z-50 mx-auto w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-4 max-md:max-w-md"
		>
			<Dialog.Title class="mb-2 text-lg font-semibold">Crear tarea</Dialog.Title>
			<Dialog.Description class="text-muted-foreground mb-4"
				>Introduce el título y la descripción de la tarea.</Dialog.Description
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
					onclick={createTodo}
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
