<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import CircleAlert from '@lucide/svelte/icons/circle-alert';

	let { data } = $props();
</script>

<svelte:head>
	<title>IfeCodes - Full-Stack & Mobile Developer Portfolio</title>
	<meta
		name="description"
		content="Hi, I'm Ife - a Full-Stack & Mobile Developer. I asked how websites work. Now I build them. Explore my projects, skills, and get in touch."
	/>
	<meta property="og:title" content="IfeCodes - Full-Stack & Mobile Developer Portfolio" />
	<meta property="og:description" content="I asked how websites work. Now I build them." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="IfeCodes - Full-Stack & Mobile Developer" />
	<meta name="twitter:description" content="I asked how websites work. Now I build them." />
</svelte:head>

<Hero />
<About />
<Skills />

{#if data.error}
	<section id="projects" class="section-padding" aria-label="Projects section">
		<div class="mx-auto max-w-[500px] text-center">
			<div
				class="flex flex-col items-center gap-4 rounded-2xl border border-border bg-bg-card p-[3rem_2rem]"
			>
				<CircleAlert size={40} class="text-accent" />
				<h3 class="text-[1.25rem] font-bold text-text-primary">Couldn't load projects</h3>
				<p class="text-[0.95rem] text-text-muted">{data.error}</p>
				<button
					onclick={() => window.location.reload()}
					class="cursor-pointer rounded-lg border-none bg-accent px-6 py-2.5 font-sans text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-light"
				>
					Try Again
				</button>
			</div>
		</div>
	</section>
{:else}
	<Projects projects={data.projects} />
{/if}

<Terminal projects={data.projects} />
<Contact />
