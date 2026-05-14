<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
	<h1 class="mb-4 font-mono text-7xl font-black text-accent dark:text-accent-light">
		{page.status}
	</h1>
	<p class="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
		{page.error?.message || 'Page Not Found'}
	</p>
	<a
		href={resolve('/')}
		class="rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-accent-light hover:shadow-[0_12px_30px_rgba(20,184,166,0.3)]"
	>
		Go back home
	</a>
</div>
