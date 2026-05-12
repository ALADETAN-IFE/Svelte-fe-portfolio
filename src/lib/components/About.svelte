<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.about-content', 
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

		gsap.fromTo('.about-highlight',
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

<section id="about" class="about section-padding" aria-label="About section">
	<div class="about-inner">
		<div class="section-header">
			<span class="section-number">01.</span>
			<h2 class="section-title">About Me</h2>
			<div class="section-line"></div>
		</div>

		<div class="about-content" style="opacity: 0;">
			<div class="about-text">
				<p>
					I'm <strong>Ife</strong>, a full-stack developer who started with a simple question: 
					<em>"How do websites actually work?"</em> That curiosity turned into a passion 
					for building things that live on the internet — and beyond.
				</p>
				<p>
					I work across the stack with <strong>React Native (Expo)</strong> for mobile, 
					<strong>Next.js</strong> and <strong>React</strong> for web, and <strong>Node.js</strong> 
					for backend services. Recently, I've been diving deep into <strong>DevOps</strong> — 
					configuring Linux servers, setting up Nginx reverse proxies, SSL certificates, 
					and CI/CD pipelines.
				</p>
				<p>
					I'm currently participating in the <strong>HNG Internship i14</strong>, 
					where I'm sharpening my craft by building production-grade applications 
					under real-world constraints. Every project is a chance to learn something new 
					and push the boundaries of what I can create.
				</p>
			</div>

			<div class="about-highlights">
				<div class="about-highlight" style="opacity: 0;">
					<div class="highlight-icon">🚀</div>
					<div>
						<h3>Full-Stack</h3>
						<p>Frontend to backend, I build complete solutions</p>
					</div>
				</div>
				<div class="about-highlight" style="opacity: 0;">
					<div class="highlight-icon">📱</div>
					<div>
						<h3>Mobile</h3>
						<p>Cross-platform apps with React Native & Expo</p>
					</div>
				</div>
				<div class="about-highlight" style="opacity: 0;">
					<div class="highlight-icon">⚙️</div>
					<div>
						<h3>DevOps</h3>
						<p>Linux, Nginx, SSL, CI/CD — infrastructure that scales</p>
					</div>
				</div>
				<div class="about-highlight" style="opacity: 0;">
					<div class="highlight-icon">🎓</div>
					<div>
						<h3>HNG i14</h3>
						<p>Currently leveling up in the HNG Internship</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		position: relative;
	}

	.about-inner {
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

	.about-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 768px) {
		.about-content {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	.about-text p {
		color: var(--color-text-secondary);
		line-height: 1.8;
		margin-bottom: 1.25rem;
		font-size: 1rem;
	}

	:global([data-theme='light']) .about-text p {
		color: var(--color-light-text-secondary);
	}

	.about-text strong {
		color: var(--color-text-primary);
		font-weight: 600;
	}

	:global([data-theme='light']) .about-text strong {
		color: var(--color-light-text-primary);
	}

	.about-text em {
		color: var(--color-accent-light);
		font-style: italic;
	}

	.about-highlights {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.about-highlight {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.about-highlight:hover {
		border-color: var(--color-accent);
		transform: translateX(8px);
		box-shadow: 0 4px 20px var(--color-accent-glow);
	}

	:global([data-theme='light']) .about-highlight {
		background: var(--color-light-bg-card);
		border-color: var(--color-light-border);
	}

	:global([data-theme='light']) .about-highlight:hover {
		border-color: var(--color-accent);
	}

	.highlight-icon {
		font-size: 1.75rem;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-accent-subtle);
		border-radius: 10px;
		flex-shrink: 0;
	}

	.about-highlight h3 {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 0.2rem;
	}

	:global([data-theme='light']) .about-highlight h3 {
		color: var(--color-light-text-primary);
	}

	.about-highlight p {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	:global([data-theme='light']) .about-highlight p {
		color: var(--color-light-text-muted);
	}
</style>
