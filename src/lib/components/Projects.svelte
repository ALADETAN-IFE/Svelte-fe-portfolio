<script lang="ts">
	import { onMount } from 'svelte';
	import Palette from '@lucide/svelte/icons/palette';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Wrench from '@lucide/svelte/icons/wrench';
	import Cog from '@lucide/svelte/icons/cog';
	import Star from '@lucide/svelte/icons/star';
	import Github from './icons/Github.svelte';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import { resolve } from '$app/paths';
	import type { Project } from '$lib/types/project';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	let activeFilter = $state('All');
	const filters = ['All', 'Frontend', 'Full Stack', 'Dev Tool'];

	let filteredProjects = $derived.by(() => {
		if (activeFilter === 'All') return sortProjects(projects);
		return sortProjects(projects.filter((p) => p.type === activeFilter));
	});

	function sortProjects(list: Project[]): Project[] {
		return [...list].sort((a, b) => {
			if (a.featured && !b.featured) return -1;
			if (!a.featured && b.featured) return 1;
			return 0;
		});
	}

	function getProjectTypeIcon(type: string) {
		switch (type) {
			case 'Frontend':
				return Palette;
			case 'Full Stack':
				return Rocket;
			case 'Dev Tool':
				return Wrench;
			default:
				return Cog;
		}
	}

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			'.project-card',
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

<section id="projects" class="section-padding" aria-label="Projects section">
	<div class="mx-auto max-w-250">
		<div class="mb-10 flex items-center justify-start gap-3">
			<span class="shrink-0 font-mono text-sm font-semibold text-accent">03.</span>
			<h2 class="text-[clamp(1.5rem,4vw,2rem)] font-extrabold text-text-primary">Projects</h2>
			<div class="h-px flex-1 bg-border"></div>
		</div>

		<div class="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by type">
			{#each filters as filter (filter)}
				<button
					class="cursor-pointer rounded-lg border px-5 py-2 font-sans text-sm font-medium transition-all duration-200 {activeFilter ===
					filter
						? 'border-accent bg-accent text-white'
						: 'border-border bg-transparent text-text-secondary hover:border-accent hover:text-accent-light'}"
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
			<div class="px-8 py-16 text-center text-text-muted">
				<p>No projects found for this category.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects as project (project.projectId)}
					<article
						class="project-card flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_12px_40px_var(--color-accent-glow)]"
						style="opacity: 0;"
					>
						{#if project.preview}
							<div class="relative h-45 overflow-hidden bg-bg-tertiary">
								<img
									src={project.preview}
									alt="Preview of {project.title}"
									loading="lazy"
									class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
								/>
								{#if project.featured}
									<span
										class="absolute top-3 right-3 rounded-md bg-accent/90 px-3 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-[4px]"
										><Star size={12} class="mr-1 inline-block" />Featured</span
									>
								{/if}
							</div>
						{:else}
							<div
								class="relative flex h-45 items-center justify-center overflow-hidden bg-bg-tertiary"
							>
								<div class="text-accent-light opacity-40">
									{@const ProjectIcon = getProjectTypeIcon(project.type)}
									<ProjectIcon size={46} strokeWidth={1.8} />
								</div>
								{#if project.featured}
									<span
										class="absolute top-3 right-3 rounded-md bg-accent/90 px-3 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-[4px]"
										><Star size={12} class="mr-1 inline-block" />Featured</span
									>
								{/if}
							</div>
						{/if}

						<div class="flex flex-1 flex-col p-5">
							<div
								class="mb-2 font-mono text-[0.7rem] font-semibold tracking-wider text-accent uppercase"
							>
								{project.type}
							</div>
							<h3 class="mb-2 text-base leading-snug font-bold text-text-primary">
								{project.title}
							</h3>
							<p
								class="mb-4 line-clamp-2 flex-1 overflow-hidden text-[0.85rem] leading-relaxed text-text-muted"
							>
								{project.description}
							</p>

							<div class="mb-4 flex flex-wrap gap-1.5">
								{#each project.tech.slice(0, 5) as tech (tech)}
									<span
										class="rounded-md bg-accent/8 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-accent-light"
										>{tech}</span
									>
								{/each}
								{#if project.tech.length > 5}
									<span
										class="rounded-md bg-bg-tertiary px-2.5 py-1 font-mono text-[0.7rem] font-medium text-text-muted"
										>+{project.tech.length - 5}</span
									>
								{/if}
							</div>

							<div class="mt-auto flex gap-3">
								{#if project.githubUrl}
									<a
										href={resolve(project.githubUrl)}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-[0.8rem] font-medium text-text-secondary no-underline transition-all duration-200 hover:border-accent hover:text-accent-light"
										aria-label="View {project.title} on GitHub"
									>
										<Github size={18} />
										Code
									</a>
								{/if}
								{#if project.liveUrl}
									<a
										href={resolve(project.liveUrl)}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1.5 rounded-lg border border-accent bg-accent px-4 py-2 text-[0.8rem] font-medium text-white no-underline shadow-sm transition-all duration-200 hover:bg-accent-light"
										aria-label="View live demo of {project.title}"
									>
										<ExternalLink size={18} />
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
