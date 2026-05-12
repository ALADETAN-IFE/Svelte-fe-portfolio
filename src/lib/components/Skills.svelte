<script lang="ts">
	import { onMount } from 'svelte';
	import { skillCategories } from '$lib/data/skills';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.skill-category',
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				stagger: 0.15,
				scrollTrigger: {
					trigger: '#skills',
					start: 'top 75%',
					toggleActions: 'play none none reverse'
				}
			}
		);

		gsap.fromTo('.skill-item',
			{ opacity: 0, scale: 0.8 },
			{
				opacity: 1,
				scale: 1,
				duration: 0.4,
				stagger: 0.05,
				scrollTrigger: {
					trigger: '#skills',
					start: 'top 70%',
					toggleActions: 'play none none reverse'
				}
			}
		);
	});
</script>

<section id="skills" class="skills section-padding" aria-label="Skills section">
	<div class="skills-inner">
		<div class="section-header">
			<span class="section-number">02.</span>
			<h2 class="section-title">Skills & Tech</h2>
			<div class="section-line"></div>
		</div>

		<div class="skills-grid">
			{#each skillCategories as category}
				<div class="skill-category" style="opacity: 0;">
					<div class="category-header">
						<span class="category-icon">{category.icon}</span>
						<h3 class="category-title">{category.title}</h3>
					</div>
					<div class="skill-list">
						{#each category.skills as skill}
							<div class="skill-item" style="opacity: 0;">
								<span class="skill-icon">{skill.icon}</span>
								<span class="skill-name">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-inner {
		max-width: 1000px;
		margin: 0 auto;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 3rem;
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

	.skills-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.skills-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.skill-category {
		padding: 1.75rem;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		transition: all 0.3s ease;
	}

	.skill-category:hover {
		border-color: var(--color-accent);
		box-shadow: 0 8px 30px var(--color-accent-glow);
		transform: translateY(-4px);
	}

	:global([data-theme='light']) .skill-category {
		background: var(--color-light-bg-card);
		border-color: var(--color-light-border);
	}

	:global([data-theme='light']) .skill-category:hover {
		border-color: var(--color-accent);
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.category-icon {
		font-size: 1.5rem;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-accent-subtle);
		border-radius: 10px;
	}

	.category-title {
		font-size: 1.15rem;
		font-weight: 700;
	}

	:global([data-theme='light']) .category-title {
		color: var(--color-light-text-primary);
	}

	.skill-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.skill-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		background: var(--color-bg-tertiary);
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		transition: all 0.2s ease;
	}

	.skill-item:hover {
		background: var(--color-accent-subtle);
		color: var(--color-accent-light);
		transform: translateY(-2px);
	}

	:global([data-theme='light']) .skill-item {
		background: var(--color-light-bg-tertiary);
		color: var(--color-light-text-secondary);
	}

	:global([data-theme='light']) .skill-item:hover {
		background: rgba(124, 58, 237, 0.1);
		color: var(--color-accent);
	}

	.skill-icon {
		font-size: 1rem;
	}

	.skill-name {
		font-size: 0.82rem;
	}
</style>
