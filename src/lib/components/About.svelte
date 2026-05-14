<script lang="ts">
	import { onMount } from 'svelte';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Settings from '@lucide/svelte/icons/settings';
	import BookOpen from '@lucide/svelte/icons/book-open';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			'.about-content',
			{ opacity: 0, y: 60 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				scrollTrigger: {
					trigger: '#about',
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		);

		gsap.fromTo(
			'.about-highlight',
			{ opacity: 0, x: -30 },
			{
				opacity: 1,
				x: 0,
				duration: 0.6,
				stagger: 0.1,
				scrollTrigger: {
					trigger: '.about-highlights',
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			}
		);
	});
</script>

<section id="about" class="relative section-padding" aria-label="About section">
	<div class="mx-auto max-w-250">
		<div class="mb-10 flex items-center justify-start gap-3">
			<span class="shrink-0 font-mono text-sm font-semibold text-accent">01.</span>
			<h2 class="text-[clamp(1.5rem,4vw,2rem)] font-extrabold text-text-primary">About Me</h2>
			<div class="h-px flex-1 bg-border"></div>
		</div>

		<div class="about-content grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr]" style="opacity: 0;">
			<div class="about-text">
				<p class="mb-5 text-base leading-relaxed text-text-secondary">
					I'm <strong class="font-semibold text-text-primary">Ife</strong>, a full-stack developer
					who started with a simple question:
					<em class="text-accent-light italic">"How do websites actually work?"</em> That curiosity turned
					into a passion for building things that live on the internet - and beyond.
				</p>
				<p class="mb-5 text-base leading-relaxed text-text-secondary">
					I work across the stack with <strong class="font-semibold text-text-primary"
						>React Native (Expo)</strong
					>
					for mobile,
					<strong class="font-semibold text-text-primary">Next.js</strong> and
					<strong class="font-semibold text-text-primary">React</strong>
					for web, and <strong class="font-semibold text-text-primary">Node.js</strong>
					for backend services. Recently, I've been diving deep into
					<strong class="font-semibold text-text-primary">DevOps</strong> - configuring Linux servers,
					setting up Nginx reverse proxies, SSL certificates, and CI/CD pipelines.
				</p>
				<p class="mb-5 text-base leading-relaxed text-text-secondary">
					I'm currently participating in the <strong class="font-semibold text-text-primary"
						>HNG Internship i14</strong
					>, where I'm sharpening my craft by building production-grade applications under
					real-world constraints. Every project is a chance to learn something new and push the
					boundaries of what I can create.
				</p>
			</div>

			<div class="about-highlights flex flex-col gap-5">
				<div
					class="about-highlight flex items-center gap-4 rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:translate-x-2 hover:border-accent hover:shadow-[0_4px_20px_var(--color-accent-glow)]"
					style="opacity: 0;"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-accent/8 text-accent-light"
					>
						<Rocket size={20} />
					</div>
					<div>
						<h3 class="mb-1 text-base font-bold text-text-primary">Full-Stack</h3>
						<p class="m-0 text-[0.85rem] text-text-muted">
							Frontend to backend, I build complete solutions
						</p>
					</div>
				</div>
				<div
					class="about-highlight flex items-center gap-4 rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:translate-x-2 hover:border-accent hover:shadow-[0_4px_20px_var(--color-accent-glow)]"
					style="opacity: 0;"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-accent/8 text-accent-light"
					>
						<Smartphone size={20} />
					</div>
					<div>
						<h3 class="mb-1 text-base font-bold text-text-primary">Mobile</h3>
						<p class="m-0 text-[0.85rem] text-text-muted">
							Cross-platform apps with React Native & Expo
						</p>
					</div>
				</div>
				<div
					class="about-highlight flex items-center gap-4 rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:translate-x-2 hover:border-accent hover:shadow-[0_4px_20px_var(--color-accent-glow)]"
					style="opacity: 0;"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-accent/8 text-accent-light"
					>
						<Settings size={20} />
					</div>
					<div>
						<h3 class="mb-1 text-base font-bold text-text-primary">DevOps</h3>
						<p class="m-0 text-[0.85rem] text-text-muted">
							Linux, Nginx, SSL, CI/CD - infrastructure that scales
						</p>
					</div>
				</div>
				<div
					class="about-highlight flex items-center gap-4 rounded-xl border border-border bg-bg-card p-5 transition-all duration-300 hover:translate-x-2 hover:border-accent hover:shadow-[0_4px_20px_var(--color-accent-glow)]"
					style="opacity: 0;"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-accent/8 text-accent-light"
					>
						<BookOpen size={20} />
					</div>
					<div>
						<h3 class="mb-1 text-base font-bold text-text-primary">HNG i14</h3>
						<p class="m-0 text-[0.85rem] text-text-muted">
							Currently leveling up in the HNG Internship
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
