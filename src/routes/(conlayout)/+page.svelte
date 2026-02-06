<script lang="ts">
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import { Progress, Avatar, Button, Select } from 'bits-ui';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	const tween = new Tween(13, { duration: 1000, easing: cubicInOut });
	const baseURL = import.meta.env.VITE_POCKETBASE_URL;
	const labelId = 'progress-label';

	onMount(() => {
		const timer = setTimeout(() => tween.set(66), 500);
		return () => {
			clearTimeout(timer);
		};
	});

	function handlePagar() {
		console.log(baseURL + '/redsys/pay');
		window.location.href = `${baseURL}/redsys/pay`;
	}
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center gap-8 p-6">
	<Avatar.Root
		delayMs={200}
		class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground mb-2 h-20 w-20 rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent"
	>
		<div
			class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
		>
			<Avatar.Image src="/src/lib/assets/ferterIcon.png" alt="Logo" />
			<Avatar.Fallback class="border-muted border">FT</Avatar.Fallback>
		</div>
	</Avatar.Root>
	<h1 class="text-primary mb-2 text-3xl font-bold">Ferter TO-DOs</h1>
	<p class="text-muted-foreground mb-4 max-w-xl text-center text-lg">
		Organiza tus proyectos, tareas y notas en un solo lugar. Gestiona tu productividad y mantén el
		control de tus objetivos diarios y de equipo.
	</p>

	<div class="mt-6 flex w-[25%] flex-col gap-2">
		<div class="flex items-center justify-between text-sm font-medium">
			<span id={labelId}> Progreso de ejemplo </span>
			<span>{Math.round(tween.current)}%</span>
		</div>
		<Progress.Root
			aria-labelledby={labelId}
			value={Math.round(tween.current)}
			max={100}
			class="bg-dark-10 shadow-mini-inset relative h-[15px] w-full overflow-hidden rounded-full"
		>
			<div
				class="bg-foreground shadow-mini-inset h-full w-full flex-1 rounded-full"
				style={`transform: translateX(-${100 - (100 * (tween.current ?? 0)) / 100}%)`}
			></div>
		</Progress.Root>
	</div>
	<Button.Root
		class="hover:bg-primary/90 cursor-pointer rounded-md bg-black px-5 py-3 font-bold text-white"
		onclick={handlePagar}
	>
		Pagar!
	</Button.Root>
</div>
