<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import Sun from './icons/Sun.svelte';
	import Moon from './icons/Moon.svelte';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let activeSection = $state('');

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Terminal', href: '#terminal' },
		{ label: 'Contact', href: '#contact' }
	];

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		const observerOptions = {
			root: null,
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		const sections = document.querySelectorAll('section[id], #hero');
		sections.forEach((section) => observer.observe(section));

		return () => {
			window.removeEventListener('scroll', handleScroll);
			sections.forEach((section) => observer.unobserve(section));
		};
	});

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-[100] px-6 transition-all duration-300 ease-in-out {scrolled
		? 'border-b border-border bg-bg-primary/85 py-3 glass'
		: 'py-4'}"
	aria-label="Main navigation"
	id="main-nav"
>
	<div class="mx-auto flex max-w-[1200px] items-center justify-between">
		<a
			href="#hero"
			class="flex gap-[2px] font-mono text-xl font-bold text-text-primary no-underline transition-colors duration-200"
			aria-label="IfeCodes Home"
		>
			<span class="text-accent">&lt;</span>
			<span>Ife</span>
			<span class="text-accent">/&gt;</span>
		</a>

		<div class="hidden gap-8 md:flex" role="menubar">
			{#each navLinks as link}
				<a
					href={link.href}
					class="relative text-sm font-medium text-text-secondary no-underline transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-accent after:transition-[width] after:duration-300 after:content-[''] hover:text-accent-light {activeSection ===
					link.href.substring(1)
						? 'text-accent-light after:w-full'
						: 'after:w-0 hover:after:w-full'}"
					role="menuitem">{link.label}</a
				>
			{/each}
		</div>

		<div class="flex items-center gap-3">
			<button
				onclick={toggleTheme}
				class="flex cursor-pointer items-center justify-center rounded-lg border border-border bg-none p-2 text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent-light"
				aria-label="Toggle theme"
				id="theme-toggle-btn"
			>
				{#if $theme === 'dark'}
					<Sun size={20} />
				{:else}
					<Moon size={20} />
				{/if}
			</button>

			<button
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="flex cursor-pointer border-none bg-none p-2 md:hidden"
				aria-label="Toggle mobile menu"
				aria-expanded={mobileMenuOpen}
				id="mobile-menu-btn"
			>
				<span class="flex w-[22px] flex-col gap-[5px]">
					<span
						class="block h-[2px] rounded-[1px] bg-text-primary transition-all duration-300 ease-in-out {mobileMenuOpen
							? 'translate-x-[5px] translate-y-[5px] rotate-45'
							: ''}"
					></span>
					<span
						class="block h-[2px] rounded-[1px] bg-text-primary transition-all duration-300 ease-in-out {mobileMenuOpen
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="block h-[2px] rounded-[1px] bg-text-primary transition-all duration-300 ease-in-out {mobileMenuOpen
							? 'translate-x-[5px] -translate-y-[5px] -rotate-45'
							: ''}"
					></span>
				</span>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="mt-3 flex flex-col gap-2 border-t border-border py-4 md:hidden" role="menu">
			{#each navLinks as link}
				<a
					href={link.href}
					class="py-3 text-base font-medium text-text-secondary no-underline transition-colors duration-200 hover:text-accent-light {activeSection ===
					link.href.substring(1)
						? 'text-accent-light'
						: ''}"
					role="menuitem"
					onclick={closeMobileMenu}>{link.label}</a
				>
			{/each}
		</div>
	{/if}
</nav>
