<script lang="ts">
	import { onMount } from 'svelte';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
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
			.filter((p) => p.featured)
			.slice(0, 5)
			.map((p) => p.title)
	);

	const commands: Record<string, () => string[]> = {
		whoami: () => [
			'╔══════════════════════════════════════╗',
			'║           ABOUT IFE                  ║',
			'╚══════════════════════════════════════╝',
			'',
			'  Full-Stack & Mobile Developer',
			'  Currently in HNG Internship i14',
			'  Passionate about building web &',
			'  mobile applications that solve',
			'  real problems.',
			'',
			'  "I asked how websites work.',
			'   Now I build them."'
		],
		skills: () => [
			'----------------------------------------',
			'            SKILL CATEGORIES            ',
			'----------------------------------------',
			'',
			'  [F] Frontend  -> React, Next.js, Svelte, TailwindCSS',
			'  [M] Mobile    -> React Native, Expo',
			'  [B] Backend   -> Node.js, PostgreSQL, Prisma, Supabase',
			'  [D] DevOps    -> Linux, Nginx, SSL, CI/CD, Docker'
		],
		projects: () => [
			'----------------------------------------',
			'          TOP FEATURED PROJECTS         ',
			'----------------------------------------',
			'',
			...featuredProjects.map((p, i) => `  ${i + 1}. ${p}`),
			'',
			'  -> Scroll to Projects section for more'
		],
		contact: () => [
			'----------------------------------------',
			'              CONTACT INFO              ',
			'----------------------------------------',
			'',
			'  [E] Email    -> hello@ifecodes.xyz',
			'  [G] GitHub   -> github.com/ALADETAN-IFE',
			'  [W] Web      -> www.ifecodes.xyz',
			'  [X] X        -> x.com/ifecodes',
			'  [I] Insta    -> instagram.com/ifecodes'
		],
		help: () => [
			'Available commands:',
			'',
			'  whoami    - Who is Ife?',
			'  skills    - List skill categories',
			'  projects  - Show top featured projects',
			'  contact   - Display contact info',
			'  help      - Show this help message',
			'  clear     - Clear terminal output'
		]
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
			lines = [
				...lines,
				...output.map((text) => ({ type: 'output' as const, text })),
				{ type: 'output', text: '' }
			];
		} else {
			lines = [
				...lines,
				{
					type: 'output',
					text: `Command not found: "${cmd}". Type "help" for available commands.`
				},
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

		gsap.fromTo(
			'.terminal-wrapper',
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

<section id="terminal" class="section-padding" aria-label="Interactive terminal">
	<div class="mx-auto max-w-250">
		<div class="mb-10 flex items-center justify-start gap-3">
			<span class="shrink-0 font-mono text-sm font-semibold text-accent">04.</span>
			<h2 class="text-[clamp(1.5rem,4vw,2rem)] font-extrabold text-text-primary">Terminal</h2>
			<div class="h-px flex-1 bg-border"></div>
		</div>
		<div class="mx-auto max-w-187.5">
			<div
				class="terminal-wrapper overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
				style="opacity: 0;"
			>
				<div
					class="flex items-center justify-between border-b border-[#2a2a3a] bg-[#1a1a2a] px-4 py-3"
				>
					<div class="flex gap-1.5">
						<span class="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
						<span class="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
						<span class="h-3 w-3 rounded-full bg-[#27c93f]"></span>
					</div>
					<span class="font-mono text-[0.8rem] text-text-muted">ifecodes@portfolio ~ </span>
					<div class="invisible flex gap-1.5">
						<span class="h-3 w-3 rounded-full"></span>
						<span class="h-3 w-3 rounded-full"></span>
						<span class="h-3 w-3 rounded-full"></span>
					</div>
				</div>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="max-h-105 min-h-80 cursor-text overflow-y-auto bg-[#0d0d18] p-5"
					bind:this={terminalEl}
					onclick={focusInput}
				>
					{#each lines as line, i (i)}
						{#if line.type === 'input'}
							<div
								class="flex items-start font-mono text-[0.85rem] leading-loose whitespace-pre text-[#e0e0f0]"
							>
								<ChevronRight size={14} class="mt-0.75 mr-2 shrink-0 text-accent-light" />
								<span class="text-[#e0e0f0]">{line.text}</span>
							</div>
						{:else}
							<div
								class="flex items-start font-mono text-[0.85rem] leading-loose whitespace-pre text-[#a0a0c0]"
							>
								{line.text}
							</div>
						{/if}
					{/each}

					<div
						class="flex items-center font-mono text-[0.85rem] leading-loose whitespace-pre text-[#e0e0f0]"
					>
						<ChevronRight size={14} class="mr-2 shrink-0 text-accent-light" />
						<input
							bind:this={inputEl}
							bind:value={currentInput}
							onkeydown={handleKeydown}
							class="flex-1 animate-[blink-caret_1s_step-end_infinite] border-none bg-transparent font-mono text-[0.85rem] text-[#e0e0f0] caret-accent-light outline-none"
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
	</div>
</section>

<style>
	@keyframes blink-caret {
		from,
		to {
			border-right: 2px solid var(--color-accent-light);
		}
		50% {
			border-right: 2px solid transparent;
		}
	}
</style>
