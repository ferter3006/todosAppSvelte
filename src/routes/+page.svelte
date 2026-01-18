<script lang="ts">
	import { AlertDialog, Progress, Avatar, Button } from 'bits-ui';
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
	<AlertDialog.Root>
		<AlertDialog.Trigger
			class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex h-12 select-none items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-semibold transition-all active:scale-[0.98]"
		>
			¿Qué es esto?
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay
				class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
			/>
			<AlertDialog.Content
				class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border p-7 sm:max-w-lg md:w-full "
			>
				<div class="flex flex-col gap-4 pb-6">
					<AlertDialog.Title class="text-lg font-semibold tracking-tight">
						Sobre Ferter TO-DOs
					</AlertDialog.Title>
					<AlertDialog.Description class="text-foreground-alt text-sm">
						Ferter TO-DOs es una aplicación para gestionar tareas y proyectos, ideal para uso personal o en equipo. Puedes crear listas, asignar tareas, y visualizar tu progreso.
					</AlertDialog.Description>
				</div>
				<div class="flex w-full items-center justify-center gap-2">
					<AlertDialog.Cancel
						class="h-input rounded-input bg-muted shadow-mini hover:bg-dark-10 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex w-full items-center justify-center text-[15px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
					>
						Cerrar
					</AlertDialog.Cancel>
					<AlertDialog.Action
						class="h-input rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex w-full items-center justify-center text-[15px] font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
					>
						¡A por tus tareas!
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
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
