<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types/project';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	let activeFilter = $state('All');
	const filters = ['All', 'Frontend', 'Full Stack', 'Dev Tool'];

	let filteredProjects = $derived.by(() => {
		if (activeFilter === 'All') return sortProjects(projects);
		return sortProjects(projects.filter(p => p.type === activeFilter));
	});

	function sortProjects(list: Project[]): Project[] {
		return [...list].sort((a, b) => {
			if (a.featured && !b.featured) return -1;
			if (!a.featured && b.featured) return 1;
			return 0;
		});
	}

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.project-card',
			{ opacity: 0, y: 40 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.08,
				scrollTrigger: {
					trigger: '#projects',
					start: 'top 70%',
					toggleActions: 'play none none reverse'
				}
			}
		);
	});
</script>

<section id="projects" class="projects section-padding" aria-label="Projects section">
	<div class="projects-inner">
		<div class="section-header">
			<span class="section-number">03.</span>
			<h2 class="section-title">Projects</h2>
			<div class="section-line"></div>
		</div>

		<div class="filter-bar" role="tablist" aria-label="Filter projects by type">
			{#each filters as filter}
				<button
					class="filter-btn"
					class:active={activeFilter === filter}
					onclick={() => (activeFilter = filter)}
					role="tab"
					aria-selected={activeFilter === filter}
					id="filter-{filter.toLowerCase().replace(' ', '-')}"
				>
					{filter}
				</button>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="empty-state">
				<p>No projects found for this category.</p>
			</div>
		{:else}
			<div class="projects-grid">
				{#each filteredProjects as project (project.projectId)}
					<article class="project-card" style="opacity: 0;">
						{#if project.preview}
							<div class="card-preview">
								<img
									src={project.preview}
									alt="Preview of {project.title}"
									loading="lazy"
									class="preview-img"
								/>
								{#if project.featured}
									<span class="featured-badge">⭐ Featured</span>
								{/if}
							</div>
						{:else}
							<div class="card-preview card-preview-placeholder">
								<div class="placeholder-icon">
									{#if project.type === 'Frontend'}🎨
									{:else if project.type === 'Full Stack'}🚀
									{:else if project.type === 'Dev Tool'}🛠️
									{:else if project.type === 'Backend'}⚙️
									{:else}📱
									{/if}
								</div>
								{#if project.featured}
									<span class="featured-badge">⭐ Featured</span>
								{/if}
							</div>
						{/if}

						<div class="card-body">
							<div class="card-type-badge">{project.type}</div>
							<h3 class="card-title">{project.title}</h3>
							<p class="card-description">{project.description}</p>

							<div class="card-tech">
								{#each project.tech.slice(0, 5) as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
								{#if project.tech.length > 5}
									<span class="tech-tag tech-more">+{project.tech.length - 5}</span>
								{/if}
							</div>

							<div class="card-links">
								{#if project.githubUrl}
									<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="card-link" aria-label="View {project.title} on GitHub">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
										Code
									</a>
								{/if}
								{#if project.liveUrl}
									<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="card-link card-link-primary" aria-label="View live demo of {project.title}">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
										Live Demo
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.projects-inner {
		max-width: 1100px;
		margin: 0 auto;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.section-number {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--color-accent);
		font-weight: 600;
	}

	.section-title {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 800;
		white-space: nowrap;
	}

	:global([data-theme='light']) .section-title {
		color: var(--color-light-text-primary);
	}

	.section-line {
		flex: 1;
		height: 1px;
		background: var(--color-border);
	}

	:global([data-theme='light']) .section-line {
		background: var(--color-light-border);
	}

	.filter-bar {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 2.5rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		padding: 0.55rem 1.25rem;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text-secondary);
		border-radius: 8px;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: var(--font-sans);
	}

	.filter-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-light);
	}

	.filter-btn.active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	:global([data-theme='light']) .filter-btn {
		border-color: var(--color-light-border);
		color: var(--color-light-text-secondary);
	}

	:global([data-theme='light']) .filter-btn.active {
		background: var(--color-accent);
		color: white;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.projects-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.project-card {
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.project-card:hover {
		border-color: var(--color-accent);
		transform: translateY(-6px);
		box-shadow: 0 12px 40px var(--color-accent-glow);
	}

	:global([data-theme='light']) .project-card {
		background: var(--color-light-bg-card);
		border-color: var(--color-light-border);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	:global([data-theme='light']) .project-card:hover {
		border-color: var(--color-accent);
		box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
	}

	.card-preview {
		position: relative;
		height: 180px;
		overflow: hidden;
		background: var(--color-bg-tertiary);
	}

	.card-preview-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.placeholder-icon {
		font-size: 3rem;
		opacity: 0.3;
	}

	.preview-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.project-card:hover .preview-img {
		transform: scale(1.05);
	}

	.featured-badge {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		padding: 0.3rem 0.7rem;
		background: rgba(124, 58, 237, 0.9);
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		border-radius: 6px;
		backdrop-filter: blur(4px);
	}

	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.card-type-badge {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-accent);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
	}

	.card-title {
		font-size: 1.05rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	:global([data-theme='light']) .card-title {
		color: var(--color-light-text-primary);
	}

	.card-description {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		line-height: 1.5;
		margin-bottom: 1rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		flex: 1;
	}

	:global([data-theme='light']) .card-description {
		color: var(--color-light-text-muted);
	}

	.card-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-bottom: 1rem;
	}

	.tech-tag {
		padding: 0.25rem 0.6rem;
		background: var(--color-accent-subtle);
		color: var(--color-accent-light);
		font-size: 0.7rem;
		font-weight: 500;
		border-radius: 5px;
		font-family: var(--font-mono);
	}

	.tech-more {
		background: var(--color-bg-tertiary);
		color: var(--color-text-muted);
	}

	:global([data-theme='light']) .tech-tag {
		background: rgba(124, 58, 237, 0.08);
	}

	.card-links {
		display: flex;
		gap: 0.75rem;
		margin-top: auto;
	}

	.card-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		color: var(--color-text-secondary);
		font-size: 0.8rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.card-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-light);
	}

	.card-link-primary {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.card-link-primary:hover {
		background: var(--color-accent-light);
		color: white;
	}

	:global([data-theme='light']) .card-link {
		border-color: var(--color-light-border);
		color: var(--color-light-text-secondary);
	}

	:global([data-theme='light']) .card-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--color-text-muted);
	}
</style>
