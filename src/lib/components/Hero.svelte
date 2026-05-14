<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowRight from './icons/ArrowRight.svelte';
	import Download from './icons/Download.svelte';
	import Github from './icons/Github.svelte';
	import Globe from './icons/Globe.svelte';
	import X from './icons/X.svelte';
	import Instagram from './icons/Instagram.svelte';
	import LinkedIn from './icons/LinkedIn.svelte';
	import { resolve } from '$app/paths';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let displayedName = $state('');
	const fullName = 'IfeCodes.';

	const socialLinks = [
		{ label: 'GitHub', href: 'https://github.com/ALADETAN-IFE', icon: 'github' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/fortune-ife-aladetan-458ab136a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			icon: 'linkedIn'
		},
		{ label: 'Portfolio', href: 'https://www.ifecodes.xyz', icon: 'portfolio' },
		{ label: 'X', href: 'https://x.com/IfeCodes_', icon: 'x' },
		{ label: 'Instagram', href: 'https://instagram.com/IfeCodes_', icon: 'instagram' }
	];

	const taglineWords = 'I asked how websites work. Now I build them.'.split(' ');

	onMount(() => {
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
				ctx.fillStyle = `rgba(20, 184, 166, ${p.opacity})`;
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
						ctx.strokeStyle = `rgba(20, 184, 166, ${0.08 * (1 - dist / 120)})`;
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
		void (async () => {
			const { gsap } = await import('gsap');

			gsap.fromTo(
				'.hero-greeting',
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
			);
			// Typewriter effect
			let charIndex = 0;
			const typeWriter = () => {
				if (charIndex < fullName.length) {
					displayedName += fullName[charIndex];
					charIndex++;
					setTimeout(typeWriter, 100);
				}
			};
			setTimeout(typeWriter, 500);

			gsap.fromTo(
				'.hero-title',
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.7, delay: 0.6 }
			);

			gsap.fromTo(
				'.tagline-word',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.9 }
			);

			gsap.fromTo(
				'.hero-cta',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 1.5 }
			);

			gsap.fromTo(
				'.hero-social',
				{ opacity: 0, scale: 0.8 },
				{ opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, delay: 1.8 }
			);
		})();

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
	class="relative flex min-h-screen items-center justify-center overflow-hidden"
	id="hero"
	aria-label="Hero section"
	onmousemove={handleMouseMove}
>
	<canvas bind:this={canvas} class="pointer-events-none absolute inset-0 h-full w-full"></canvas>

	<div class="relative z-2 max-w-200 px-6 text-center">
		<p
			class="hero-greeting mb-4 font-mono text-base tracking-wider text-accent-light"
			style="opacity: 0;"
		>
			Hi, my name is
		</p>
		<h1
			class="hero-name mb-2 text-[clamp(3rem,10vw,6rem)] leading-none font-black tracking-tighter text-text-primary"
		>
			{displayedName}<span class="cursor">&nbsp;</span>
		</h1>
		<p
			class="hero-title mb-6 text-[clamp(1.1rem,3vw,1.5rem)] font-medium text-text-secondary"
			style="opacity: 0;"
		>
			Full-Stack & Mobile Developer
		</p>

		<p class="mb-10 text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-text-muted">
			{#each taglineWords as word, i (i)}
				<span class="tagline-word" style="opacity: 0; display: inline-block; margin-right: 0.35em;"
					>{word}</span
				>
			{/each}
		</p>

		<div class="mb-12 flex flex-wrap justify-center gap-4">
			<a
				href={resolve('/#projects')}
				class="hero-cta inline-flex cursor-pointer items-center gap-2 rounded-xl border border-accent bg-accent px-7 py-3 text-[0.95rem] font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-[0_8px_25px_var(--color-accent-glow)]"
				style="opacity: 0;"
			>
				View My Work
				<ArrowRight size={18} />
			</a>
			<a
				href='https://www.ifecodes.xyz'
				class="hero-cta inline-flex cursor-pointer items-center gap-2 rounded-xl border border-accent bg-transparent px-7 py-3 text-[0.95rem] font-semibold text-accent-light no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/8"
				style="opacity: 0;"
				target="_blank"
				rel="noopener noreferrer"
			>
				Download Resume
				<Download size={18} />
			</a>
		</div>

		<div class="flex justify-center gap-4">
			{#each socialLinks as link (link.label)}
				<a
					href={link.href}
					class="hero-social flex items-center justify-center rounded-xl border border-border p-2.5 text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent-light hover:shadow-[0_4px_15px_var(--color-accent-glow)]"
					style="opacity: 0;"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={link.label}
				>
					{#if link.icon === 'github'}
						<Github size={22} />
					{:else if link.icon === 'portfolio'}
						<Globe size={22} />
					{:else if link.icon === 'x'}
						<X size={20} />
					{:else if link.icon === 'instagram'}
						<Instagram size={22} />
					{:else if link.icon === 'linkedIn'}
						<LinkedIn size={22} />
					{/if}
				</a>
			{/each}
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
		<div
			class="h-12.5 w-px animate-[scrollPulse_2s_ease-in-out_infinite] bg-linear-to-b from-accent-light via-accent to-transparent"
		></div>
	</div>
</section>

<style>
	@keyframes scrollPulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scaleY(0.6);
		}
		50% {
			opacity: 1;
			transform: scaleY(1);
		}
	}

	.cursor {
		display: inline-block;
		width: 3px;
		background-color: var(--color-accent);
		margin-left: 4px;
		animation: blink 1s ease-in-out infinite;
		font-weight: 200;
	}

	@keyframes blink {
		from,
		to {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
