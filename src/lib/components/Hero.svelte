<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let heroReady = $state(false);

	const socialLinks = [
		{ label: 'GitHub', href: 'https://github.com/ALADETAN-IFE', icon: 'github' },
		{ label: 'Dev.to', href: 'https://dev.to/ifecodes', icon: 'devto' },
		{ label: 'X', href: 'https://x.com/ifecodes', icon: 'x' },
		{ label: 'Instagram', href: 'https://instagram.com/ifecodes', icon: 'instagram' }
	];

	const taglineWords = "I asked how websites work. Now I build them.".split(' ');

	onMount(async () => {
		heroReady = true;

		// Particle canvas
		if (!canvas || !browser) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = window.innerWidth;
		let height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			opacity: number;
		}

		const particles: Particle[] = [];
		const particleCount = Math.min(80, Math.floor(width / 15));

		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				size: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.1
			});
		}

		let animationId: number;

		function animate() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			particles.forEach((p) => {
				// Mouse influence
				const dx = mouseX - p.x;
				const dy = mouseY - p.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 200) {
					const force = (200 - dist) / 200;
					p.vx += (dx / dist) * force * 0.01;
					p.vy += (dy / dist) * force * 0.01;
				}

				p.x += p.vx;
				p.y += p.vy;

				// Damping
				p.vx *= 0.99;
				p.vy *= 0.99;

				// Wrap
				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				if (p.y < 0) p.y = height;
				if (p.y > height) p.y = 0;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
				ctx.fill();
			});

			// Draw connections
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) {
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}

			animationId = requestAnimationFrame(animate);
		}

		animate();

		const handleResize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
		};

		window.addEventListener('resize', handleResize);

		// GSAP animations
		const { gsap } = await import('gsap');

		gsap.fromTo('.hero-greeting', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
		gsap.fromTo('.hero-name', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
		gsap.fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6 });

		gsap.fromTo('.tagline-word',
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.9 }
		);

		gsap.fromTo('.hero-cta',
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 1.5 }
		);

		gsap.fromTo('.hero-social',
			{ opacity: 0, scale: 0.8 },
			{ opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, delay: 1.8 }
		);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
		};
	});

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
</script>

<section
	class="hero"
	id="hero"
	aria-label="Hero section"
	onmousemove={handleMouseMove}
>
	<canvas bind:this={canvas} class="hero-canvas"></canvas>

	<div class="hero-content">
		<p class="hero-greeting" style="opacity: 0;">Hi, my name is</p>
		<h1 class="hero-name" style="opacity: 0;">Ife<span class="accent">.</span></h1>
		<p class="hero-title" style="opacity: 0;">Full-Stack & Mobile Developer</p>

		<p class="hero-tagline">
			{#each taglineWords as word, i}
				<span class="tagline-word" style="opacity: 0; display: inline-block; margin-right: 0.35em;">{word}</span>
			{/each}
		</p>

		<div class="hero-actions">
			<a href="#projects" class="hero-cta btn-primary" style="opacity: 0;">
				View My Work
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
			</a>
			<a href="/resume.pdf" class="hero-cta btn-outline" style="opacity: 0;" target="_blank" rel="noopener noreferrer">
				Download Resume
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
			</a>
		</div>

		<div class="hero-socials">
			{#each socialLinks as link}
				<a href={link.href} class="hero-social" style="opacity: 0;" target="_blank" rel="noopener noreferrer" aria-label={link.label}>
					{#if link.icon === 'github'}
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
					{:else if link.icon === 'devto'}
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .65-.08.84-.23.2-.16.3-.46.3-.81v-2.29c0-.36-.1-.65-.3-.8zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.29 2.72 0 2.24-.02 2.72-.44 3.15zm4.99-3.21c0 .69-.39 1.15-1 1.15-.35 0-.62-.15-.79-.46v3.33h-1.4V9.97h1.4v.44c.17-.3.44-.46.79-.46.61 0 1 .46 1 1.15v.99zm6.71-.06c-.06.78-.42 1.34-1.04 1.65-.44.22-.94.22-1.6.22h-.84V15.3h-1.4V8.53h1.94c.73 0 1.31.07 1.72.29.64.35 1.02.94 1.08 1.74.02.18.02.48.02.76 0 .24 0 .52-.02.71h.14zm-2.3-1.28c-.19 0-.35.07-.44.22v2.47c.09.15.25.22.44.22.25 0 .37-.19.37-.58v-1.75c0-.39-.12-.58-.37-.58z"/></svg>
					{:else if link.icon === 'x'}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
					{:else if link.icon === 'instagram'}
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
					{/if}
				</a>
			{/each}
		</div>
	</div>

	<div class="scroll-indicator">
		<div class="scroll-line"></div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.hero-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		max-width: 800px;
		padding: 0 1.5rem;
	}

	.hero-greeting {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--color-accent-light);
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
	}

	.hero-name {
		font-size: clamp(3rem, 10vw, 6rem);
		font-weight: 900;
		line-height: 1;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	:global([data-theme='light']) .hero-name {
		color: var(--color-light-text-primary);
	}

	.accent {
		color: var(--color-accent);
	}

	.hero-title {
		font-size: clamp(1.1rem, 3vw, 1.5rem);
		color: var(--color-text-secondary);
		margin-bottom: 1.5rem;
		font-weight: 500;
	}

	:global([data-theme='light']) .hero-title {
		color: var(--color-light-text-secondary);
	}

	.hero-tagline {
		font-size: clamp(0.95rem, 2vw, 1.15rem);
		color: var(--color-text-muted);
		margin-bottom: 2.5rem;
		line-height: 1.6;
	}

	:global([data-theme='light']) .hero-tagline {
		color: var(--color-light-text-muted);
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 3rem;
	}

	.btn-primary,
	.btn-outline {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1.75rem;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.btn-primary {
		background: var(--color-accent);
		color: white;
		border: 1px solid var(--color-accent);
	}

	.btn-primary:hover {
		background: var(--color-accent-light);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px var(--color-accent-glow);
	}

	.btn-outline {
		background: transparent;
		color: var(--color-accent-light);
		border: 1px solid var(--color-accent);
	}

	.btn-outline:hover {
		background: var(--color-accent-subtle);
		transform: translateY(-2px);
	}

	.hero-socials {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.hero-social {
		color: var(--color-text-muted);
		padding: 0.65rem;
		border-radius: 10px;
		border: 1px solid var(--color-border);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-social:hover {
		color: var(--color-accent-light);
		border-color: var(--color-accent);
		transform: translateY(-3px);
		box-shadow: 0 4px 15px var(--color-accent-glow);
	}

	:global([data-theme='light']) .hero-social {
		border-color: var(--color-light-border);
		color: var(--color-light-text-muted);
	}

	:global([data-theme='light']) .hero-social:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.scroll-line {
		width: 1px;
		height: 50px;
		background: linear-gradient(to bottom, var(--color-accent), transparent);
		animation: scrollPulse 2s ease-in-out infinite;
	}

	@keyframes scrollPulse {
		0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
		50% { opacity: 1; transform: scaleY(1); }
	}
</style>
