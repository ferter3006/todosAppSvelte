<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import DialogTodo from './dialogTodo.svelte';
	import { Button } from 'bits-ui';
	import { Pen, X } from '@lucide/svelte';

	let { todo, queryProject } = $props();

	let temp_todo: RecordModel | undefined = $state(undefined);
	let openDialog = $state(false);
	let stateOptions = [
		{ value: 'pending', label: 'Pendiente' },
		{ value: 'inProgress', label: 'En progreso' },
		{ value: 'completed', label: 'Completado' }
	];

	async function updateTodo(todo: RecordModel | undefined) {
		if (!todo) return;
		await pocketbase.collection('todos').update(todo.id, todo);
		queryProject.refetch();
		openDialog = false;
	}

	async function deleteTodo() {
		await pocketbase.collection('todos').delete(todo.id);
		queryProject.refetch();
	}

	function handleEdit() {
		temp_todo = { ...todo };
		openDialog = true;
	}

	async function handleStateChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		console.log('Nuevo estado seleccionado:', value);
		await pocketbase.collection('todos').update(todo.id, { state: value });
		queryProject.refetch();
	}

</script>

<div
	class="relative flex flex-col rounded-xl border bg-white p-5 shadow-md transition hover:shadow-lg"
>
	<div class="absolute top-2 right-2 flex gap-2">
		<Button.Root
			class="bg-primary hover:bg-primary/80 rounded-xl p-2 text-white"
			aria-label="Editar tarea"
			onclick={handleEdit}
		>
			<Pen size={18} />
		</Button.Root>
		<Button.Root
			class="bg-destructive hover:bg-destructive/80 rounded-xl p-2 text-white"
			aria-label="Borrar tarea"
			onclick={deleteTodo}
		>
			<X size={18} />
		</Button.Root>
	</div>
	<h2 class="mb-1 text-lg font-bold text-gray-900">{todo.title}</h2>
	<p class="mb-2 whitespace-pre-line text-gray-700">{todo.description}</p>
	<div class="mb-2 flex items-center gap-2">
		<span class="text-sm text-gray-500">Estado:</span>
		<select
			class="rounded border px-2 py-1 text-sm focus:ring focus:outline-none"
			value={todo.state}
			onchange={handleStateChange}
		>
			{#each stateOptions as opt}
				<option value={opt.value} selected={todo.state === opt.value}>{opt.label}</option>
			{/each}
		</select>
	</div>
	<div class="mb-1 text-xs text-gray-400">Creado: {new Date(todo.created).toLocaleString()}</div>

	<DialogTodo
		dialogTitle="Actualizar tarea"
		dialogDescription="Introduce el nuevo título y la descripción de la tarea."
		bind:openDialog
		todoTitle={temp_todo?.title}
		todoDescription={temp_todo?.description}
		handleCreateOrUpdate={() => updateTodo(temp_todo)}
	/>
</div>
