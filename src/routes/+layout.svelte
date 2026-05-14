<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		document.documentElement.setAttribute('data-theme', $theme);
	});
</script>

<svelte:head>
	<title>IfeCodes - Full-Stack & Mobile Developer</title>
	<meta
		name="description"
		content="IfeCodes - I asked how websites work. Now I build them. Full-Stack & Mobile Developer portfolio."
	/>
</svelte:head>

<div class="app-wrapper" data-theme={$theme}>
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>
