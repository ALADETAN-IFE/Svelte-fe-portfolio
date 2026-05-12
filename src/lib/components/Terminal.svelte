<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types/project';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	interface TerminalLine {
		type: 'input' | 'output';
		text: string;
	}

	let lines = $state<TerminalLine[]>([
		{ type: 'output', text: 'Welcome to IfeCodes Terminal v1.0.0' },
		{ type: 'output', text: 'Type "help" to see available commands.' },
		{ type: 'output', text: '' }
	]);

	let currentInput = $state('');
	let inputEl: HTMLInputElement;
	let terminalEl: HTMLDivElement;

	let featuredProjects = $derived(
		projects
			.filter(p => p.featured)
			.slice(0, 5)
			.map(p => p.title)
	);

	const commands: Record<string, () => string[]> = {
		whoami: () => [
			"╔══════════════════════════════════════╗",
			"║           ABOUT IFE                  ║",
			"╚══════════════════════════════════════╝",
			"",
			"  Full-Stack & Mobile Developer",
			"  Currently in HNG Internship i14",
			"  Passionate about building web &",
			"  mobile applications that solve",
			"  real problems.",
			"",
			"  \"I asked how websites work.",
			"   Now I build them.\"",
		],
		skills: () => [
			"╔══════════════════════════════════════╗",
			"║          SKILL CATEGORIES            ║",
			"╚══════════════════════════════════════╝",
			"",
			"  🎨 Frontend  → React, Next.js, Svelte, TailwindCSS",
			"  📱 Mobile    → React Native, Expo",
			"  ⚙️  Backend   → Node.js, PostgreSQL, Prisma, Supabase",
			"  🛠️  DevOps    → Linux, Nginx, SSL, CI/CD, Docker",
		],
		projects: () => [
			"╔══════════════════════════════════════╗",
			"║        TOP FEATURED PROJECTS         ║",
			"╚══════════════════════════════════════╝",
			"",
			...featuredProjects.map((p, i) => `  ${i + 1}. ${p}`),
			"",
			"  → Scroll to Projects section for more",
		],
		contact: () => [
			"╔══════════════════════════════════════╗",
			"║          CONTACT INFO                ║",
			"╚══════════════════════════════════════╝",
			"",
			"  📧 Email    → hello@ifecodes.xyz",
			"  🐙 GitHub   → github.com/ALADETAN-IFE",
			"  📝 Dev.to   → dev.to/ifecodes",
			"  🐦 X        → x.com/ifecodes",
			"  📸 Insta    → instagram.com/ifecodes",
		],
		help: () => [
			"Available commands:",
			"",
			"  whoami    — Who is Ife?",
			"  skills    — List skill categories",
			"  projects  — Show top featured projects",
			"  contact   — Display contact info",
			"  help      — Show this help message",
			"  clear     — Clear terminal output",
		],
	};

	function handleCommand() {
		const cmd = currentInput.trim().toLowerCase();
		lines = [...lines, { type: 'input', text: cmd }];

		if (cmd === 'clear') {
			lines = [];
		} else if (cmd === '') {
			// do nothing
		} else if (commands[cmd]) {
			const output = commands[cmd]();
			lines = [...lines, ...output.map(text => ({ type: 'output' as const, text })), { type: 'output', text: '' }];
		} else {
			lines = [...lines,
				{ type: 'output', text: `Command not found: "${cmd}". Type "help" for available commands.` },
				{ type: 'output', text: '' }
			];
		}

		currentInput = '';
		requestAnimationFrame(() => {
			if (terminalEl) {
				terminalEl.scrollTop = terminalEl.scrollHeight;
			}
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleCommand();
		}
	}

	function focusInput() {
		inputEl?.focus();
	}

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.terminal-wrapper',
			{ opacity: 0, y: 50, scale: 0.95 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.8,
				scrollTrigger: {
					trigger: '#terminal',
					start: 'top 75%',
					toggleActions: 'play none none reverse'
				}
			}
		);
	});
</script>

<section id="terminal" class="terminal-section section-padding" aria-label="Interactive terminal">
	<div class="terminal-inner">
		<div class="section-header">
			<span class="section-number">04.</span>
			<h2 class="section-title">Terminal</h2>
			<div class="section-line"></div>
		</div>

		<div class="terminal-wrapper" style="opacity: 0;">
			<div class="terminal-titlebar">
				<div class="terminal-dots">
					<span class="dot dot-red"></span>
					<span class="dot dot-yellow"></span>
					<span class="dot dot-green"></span>
				</div>
				<span class="terminal-title">ifecodes@portfolio ~ </span>
				<div class="terminal-dots" style="visibility: hidden;">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
			</div>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="terminal-body" bind:this={terminalEl} onclick={focusInput}>
				{#each lines as line}
					{#if line.type === 'input'}
						<div class="terminal-line">
							<span class="prompt">❯</span>
							<span class="input-text">{line.text}</span>
						</div>
					{:else}
						<div class="terminal-line output-line">{line.text}</div>
					{/if}
				{/each}

				<div class="terminal-line input-line">
					<span class="prompt">❯</span>
					<input
						bind:this={inputEl}
						bind:value={currentInput}
						onkeydown={handleKeydown}
						class="terminal-input"
						type="text"
						aria-label="Terminal command input"
						autocomplete="off"
						spellcheck="false"
						id="terminal-input"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.terminal-inner {
		max-width: 750px;
		margin: 0 auto;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2.5rem;
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

	.terminal-wrapper {
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--color-border);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	}

	:global([data-theme='light']) .terminal-wrapper {
		border-color: var(--color-light-border);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
	}

	.terminal-titlebar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: #1a1a2a;
		border-bottom: 1px solid #2a2a3a;
	}

	:global([data-theme='light']) .terminal-titlebar {
		background: #e8e8f0;
		border-bottom-color: #d0d0e0;
	}

	.terminal-dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.dot-red { background: #ff5f56; }
	.dot-yellow { background: #ffbd2e; }
	.dot-green { background: #27c93f; }

	.terminal-title {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	:global([data-theme='light']) .terminal-title {
		color: var(--color-light-text-muted);
	}

	.terminal-body {
		background: #0d0d18;
		padding: 1.25rem;
		min-height: 320px;
		max-height: 420px;
		overflow-y: auto;
		cursor: text;
	}

	:global([data-theme='light']) .terminal-body {
		background: #1e1e2e;
	}

	.terminal-line {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		line-height: 1.7;
		color: #e0e0f0;
		white-space: pre;
		display: flex;
		align-items: flex-start;
	}

	.output-line {
		color: #a0a0c0;
	}

	.prompt {
		color: var(--color-accent-light);
		margin-right: 0.5rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.input-text {
		color: #e0e0f0;
	}

	.input-line {
		display: flex;
		align-items: center;
	}

	.terminal-input {
		background: none;
		border: none;
		outline: none;
		color: #e0e0f0;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		flex: 1;
		caret-color: var(--color-accent-light);
	}

	.terminal-input::placeholder {
		color: #4a4a6a;
	}

	/* Blinking cursor effect */
	.terminal-input {
		animation: blink-caret 1s step-end infinite;
	}

	@keyframes blink-caret {
		from, to { border-right: 2px solid var(--color-accent-light); }
		50% { border-right: 2px solid transparent; }
	}
</style>
