<script lang="ts">
	import ferterIcon from '$lib/assets/ferterIcon.png';
	import { NavigationMenu } from 'bits-ui';
	import cn from 'clsx';
	import { onMount } from 'svelte';
	import MenuDesktop from './menuDesktop.svelte';
	import MenuMobile from './menuMobile.svelte';

	let mounted = $state(false);

	type ListItemProps = {
		className?: string;
		title: string;
		href: string;
		content: string;
	};

	onMount(() => {
		mounted = true;
	});

	let classMenuItem =
		'my-1 mx-0.5 text-white hover:text-accent-foreground focus-visible:bg-muted focus-visible:text-accent-foreground data-[state=open]:shadow-mini dark:hover:bg-muted dark:data-[state=open]:bg-muted group inline-flex h-8 w-max items-center justify-center rounded-[7px] bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-white data-[state=open]:text-black';
</script>

<svelte:head><link rel="icon" href={ferterIcon} /></svelte:head>
{#snippet ListItem({ className, title, content, href }: ListItemProps)}
	<li>
		<NavigationMenu.Link
			class={cn(
				'hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none',
				className
			)}
			{href}
		>
			<div class="text-sm leading-none font-medium">{title}</div>
			<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
				{content}
			</p>
		</NavigationMenu.Link>
	</li>
{/snippet}

<div class="hidden w-full sm:block">
	<MenuDesktop />
</div>
<div class="block w-full sm:hidden">
	<MenuMobile />
</div>
