<script lang="ts">
	import { currentUser } from "$lib/stores/authStore";
	import { Avatar } from 'bits-ui';
</script>

<div class="flex flex-col items-center justify-center min-h-[60vh] p-4">
	<div class="w-full max-w-md p-6 rounded-2xl shadow-lg bg-background flex flex-col items-center">
		<Avatar.Root delayMs={200} class="mb-4 h-24 w-24 rounded-full border-2 border-primary bg-muted">
			<div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent">
				<Avatar.Image src={"http://localhost:8090/api/files/users/" + $currentUser?.id + "/" + $currentUser?.avatar} alt="avatar" />				
			</div>
		</Avatar.Root>
		<h1 class="text-2xl font-bold text-primary mb-1">{$currentUser?.name}</h1>
		<span class={"mb-2 px-3 py-1 rounded-full text-xs font-semibold " + ($currentUser?.verified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
			{$currentUser?.verified ? 'Verificado' : 'No verificado'}
		</span>
		<div class="w-full mt-2 space-y-2">
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground font-medium">Email:</span>
				<span>{$currentUser?.email}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground font-medium">ID:</span>
				<span class="truncate max-w-[160px]">{$currentUser?.id}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground font-medium">Email visible:</span>
				<span>{$currentUser?.emailVisibility ? 'Sí' : 'No'}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground font-medium">Creado:</span>
				<span>{new Date($currentUser?.created).toLocaleString()}</span>
			</div>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground font-medium">Actualizado:</span>
				<span>{new Date($currentUser?.updated).toLocaleString()}</span>
			</div>
		</div>
	</div>
</div>