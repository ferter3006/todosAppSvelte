<script lang="ts">
	import { Progress, Avatar } from 'bits-ui';
	import { onMount } from "svelte";
	import { cubicInOut } from "svelte/easing";
	import { Tween } from "svelte/motion";

	const tween = new Tween(13, { duration: 1000, easing: cubicInOut });
	const labelId = 'progress-label';

	onMount(() => {
		const timer = setTimeout(() => tween.set(66), 500);
		return () => {
			clearTimeout(timer);
		};
	});
</script>

<div class="flex flex-col items-center justify-center min-h-[70vh] gap-8 p-6">
	<Avatar.Root
		delayMs={200}
		class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground h-20 w-20 rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent mb-2"
	>
		<div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent">
			<Avatar.Image src="/src/lib/assets/ferterIcon.png" alt="Logo" />
			<Avatar.Fallback class="border-muted border">FT</Avatar.Fallback>
		</div>
	</Avatar.Root>
	<h1 class="text-3xl font-bold text-primary mb-2">Ferter TO-DOs</h1>
	<p class="text-lg text-muted-foreground max-w-xl text-center mb-4">
		Organiza tus proyectos, tareas y notas en un solo lugar. Gestiona tu productividad y mantén el control de tus objetivos diarios y de equipo.
	</p>
	
	<div class="flex w-[25%] flex-col gap-2 mt-6">
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
</div>
