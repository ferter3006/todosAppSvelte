<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import DialogTodo from './dialogTodo.svelte';

	let { todo } = $props();

	let temp_todo: RecordModel = $state({ ...todo });
	let dialogOpen = $state(false);

	async function updateTodo(todo: RecordModel) {
		console.log('Updating todo:', todo);
		await pocketbase.collection('todos').update(todo.id, todo);
	}

	function handleClickTodo() {
		temp_todo = { ...todo };
		dialogOpen = true;
	}

	$effect(() => {
		console.log('Todo Data:', todo);
	});
</script>

<button class="w-[50%] cursor-pointer bg-red-50 text-left" onclick={handleClickTodo}>
	<div class="rounded-lg border p-4 shadow-md hover:bg-gray-300">
		<h2 class="mb-2 text-xl font-semibold">{todo.title}</h2>
		<p class="whitespace-pre-line text-gray-600">{todo.description}</p>
		<p class="mt-2 text-sm text-gray-500">Estado: {todo.completed ? 'Completado' : 'Pendiente'}</p>
	</div>
</button>

<DialogTodo
	bind:openDialog={dialogOpen}
	bind:todoTitle={temp_todo.title}
	bind:todoDescription={temp_todo.description}
	handlesCreateOrUpdate={() => updateTodo(temp_todo)}
/>
