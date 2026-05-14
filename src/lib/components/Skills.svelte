<script lang="ts">
	import { onMount } from 'svelte';
	import { skillCategories } from '$lib/data/skills';
	import Palette from '@lucide/svelte/icons/palette';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Cog from '@lucide/svelte/icons/cog';
	import Wrench from '@lucide/svelte/icons/wrench';
	import Atom from '@lucide/svelte/icons/atom';
	import Triangle from '@lucide/svelte/icons/triangle';
	import Flame from '@lucide/svelte/icons/flame';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Wind from '@lucide/svelte/icons/wind';
	import Globe from '@lucide/svelte/icons/globe';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Circle from '@lucide/svelte/icons/circle';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Database from '@lucide/svelte/icons/database';
	import Leaf from '@lucide/svelte/icons/leaf';
	import Gem from '@lucide/svelte/icons/gem';
	import Zap from '@lucide/svelte/icons/zap';
	import Penguin from './icons/Penguin.svelte';
	import Waves from '@lucide/svelte/icons/waves';
	import Lock from '@lucide/svelte/icons/lock';
	import RotateCw from '@lucide/svelte/icons/rotate-cw';
	import Ship from '@lucide/svelte/icons/ship';
	import Package from '@lucide/svelte/icons/package';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			'.skill-category',
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

		gsap.fromTo(
			'.skill-item',
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

<section id="skills" class="section-padding" aria-label="Skills section">
	<div class="mx-auto max-w-250">
		<div class="mb-10 flex items-center justify-start gap-3">
			<span class="shrink-0 font-mono text-sm font-semibold text-accent">02.</span>
			<h2 class="text-[clamp(1.5rem,4vw,2rem)] font-extrabold text-text-primary">Skills & Tech</h2>
			<div class="h-px flex-1 bg-border"></div>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each skillCategories as category}
				<div
					class="skill-category rounded-[16px] border border-border bg-bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_8px_30px_var(--color-accent-glow)]"
					style="opacity: 0;"
				>
					<div class="mb-5 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent/8 text-accent-light"
						>
							{#if category.icon === 'palette'}
								<Palette size={18} />
							{:else if category.icon === 'phone'}
								<Smartphone size={18} />
							{:else if category.icon === 'cog'}
								<Cog size={18} />
							{:else if category.icon === 'wrench'}
								<Wrench size={18} />
							{/if}
						</div>
						<h3 class="text-[1.15rem] font-bold text-text-primary">{category.title}</h3>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<div
								class="skill-item flex items-center gap-[0.4rem] rounded-lg bg-bg-tertiary px-[0.85rem] py-2 text-[0.85rem] font-medium text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/8 hover:text-accent-light"
								style="opacity: 0;"
							>
								{#key skill.icon}
									<div class="flex items-center justify-center text-accent-light">
										{#if skill.icon === 'palette'}
											<Palette size={14} />
										{:else if skill.icon === 'atom'}
											<Atom size={14} />
										{:else if skill.icon === 'triangle'}
											<Triangle size={14} />
										{:else if skill.icon === 'flame'}
											<Flame size={14} />
										{:else if skill.icon === 'book'}
											<BookOpen size={14} />
										{:else if skill.icon === 'wind'}
											<Wind size={14} />
										{:else if skill.icon === 'globe'}
											<Globe size={14} />
										{:else if skill.icon === 'rocket'}
											<Rocket size={14} />
										{:else if skill.icon === 'circle'}
											<Circle size={14} />
										{:else if skill.icon === 'git'}
											<GitBranch size={14} />
										{:else if skill.icon === 'database'}
											<Database size={14} />
										{:else if skill.icon === 'leaf'}
											<Leaf size={14} />
										{:else if skill.icon === 'gem'}
											<Gem size={14} />
										{:else if skill.icon === 'zap'}
											<Zap size={14} />
										{:else if skill.icon === 'penguin'}
											<Penguin size={14} />
										{:else if skill.icon === 'waves'}
											<Waves size={14} />
										{:else if skill.icon === 'lock'}
											<Lock size={14} />
										{:else if skill.icon === 'rotate'}
											<RotateCw size={14} />
										{:else if skill.icon === 'ship'}
											<Ship size={14} />
										{:else if skill.icon === 'package'}
											<Package size={14} />
										{:else if skill.icon === 'phone'}
											<Smartphone size={14} />
										{:else if skill.icon === 'phone2'}
											<Smartphone size={14} />
										{:else if skill.icon === 'cog'}
											<Cog size={14} />
										{:else if skill.icon === 'wrench'}
											<Wrench size={14} />
										{/if}
									</div>
								{/key}
								<span class="text-[0.82rem]">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
