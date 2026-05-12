<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Contact from '$lib/components/Contact.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>IfeCodes — Full-Stack & Mobile Developer Portfolio</title>
	<meta name="description" content="Hi, I'm Ife — a Full-Stack & Mobile Developer. I asked how websites work. Now I build them. Explore my projects, skills, and get in touch." />
	<meta property="og:title" content="IfeCodes — Full-Stack & Mobile Developer Portfolio" />
	<meta property="og:description" content="I asked how websites work. Now I build them." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="IfeCodes — Full-Stack & Mobile Developer" />
	<meta name="twitter:description" content="I asked how websites work. Now I build them." />
</svelte:head>

<Hero />
<About />
<Skills />

{#if data.error}
	<section id="projects" class="section-padding" aria-label="Projects section">
		<div class="error-container">
			<div class="error-card">
				<span class="error-icon">⚠️</span>
				<h3>Couldn't load projects</h3>
				<p>{data.error}</p>
				<button onclick={() => window.location.reload()} class="retry-btn">
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

<style>
	.error-container {
		max-width: 500px;
		margin: 0 auto;
		text-align: center;
	}

	.error-card {
		padding: 3rem 2rem;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	:global([data-theme='light']) .error-card {
		background: var(--color-light-bg-card);
		border-color: var(--color-light-border);
	}

	.error-icon {
		font-size: 2.5rem;
	}

	.error-card h3 {
		font-size: 1.25rem;
		font-weight: 700;
	}

	:global([data-theme='light']) .error-card h3 {
		color: var(--color-light-text-primary);
	}

	.error-card p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	:global([data-theme='light']) .error-card p {
		color: var(--color-light-text-muted);
	}

	.retry-btn {
		padding: 0.7rem 1.5rem;
		background: var(--color-accent);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		font-family: var(--font-sans);
	}

	.retry-btn:hover {
		background: var(--color-accent-light);
		transform: translateY(-2px);
	}
</style>
