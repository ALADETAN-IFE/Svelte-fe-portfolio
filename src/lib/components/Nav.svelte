<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

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
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav
	class="nav"
	class:nav-scrolled={scrolled}
	aria-label="Main navigation"
	id="main-nav"
>
	<div class="nav-inner">
		<a href="#hero" class="nav-logo" aria-label="IfeCodes Home">
			<span class="logo-bracket">&lt;</span>
			<span class="logo-text">Ife</span>
			<span class="logo-bracket">/&gt;</span>
		</a>

		<div class="nav-links" role="menubar">
			{#each navLinks as link}
				<a href={link.href} class="nav-link" role="menuitem">{link.label}</a>
			{/each}
		</div>

		<div class="nav-actions">
			<button
				onclick={toggleTheme}
				class="theme-toggle"
				aria-label="Toggle theme"
				id="theme-toggle-btn"
			>
				{#if $theme === 'dark'}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
				{/if}
			</button>

			<button
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="mobile-toggle"
				aria-label="Toggle mobile menu"
				aria-expanded={mobileMenuOpen}
				id="mobile-menu-btn"
			>
				<span class="hamburger" class:open={mobileMenuOpen}>
					<span></span>
					<span></span>
					<span></span>
				</span>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="mobile-menu" role="menu">
			{#each navLinks as link}
				<a href={link.href} class="mobile-link" role="menuitem" onclick={closeMobileMenu}>{link.label}</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1rem 1.5rem;
		transition: all 0.3s ease;
	}

	.nav-scrolled {
		background: rgba(10, 10, 15, 0.85);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--color-border);
		padding: 0.75rem 1.5rem;
	}

	:global([data-theme='light']) .nav-scrolled {
		background: rgba(250, 250, 254, 0.9);
		border-bottom-color: var(--color-light-border);
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		display: flex;
		gap: 2px;
		transition: color 0.2s;
	}

	:global([data-theme='light']) .nav-logo {
		color: var(--color-light-text-primary);
	}

	.logo-bracket {
		color: var(--color-accent);
	}

	.logo-text {
		color: var(--color-text-primary);
	}

	:global([data-theme='light']) .logo-text {
		color: var(--color-light-text-primary);
	}

	.nav-links {
		display: none;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.nav-links {
			display: flex;
		}
	}

	.nav-link {
		text-decoration: none;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
		transition: color 0.2s;
		position: relative;
	}

	.nav-link:hover {
		color: var(--color-accent-light);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--color-accent);
		transition: width 0.3s ease;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	:global([data-theme='light']) .nav-link {
		color: var(--color-light-text-secondary);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.theme-toggle {
		background: none;
		border: 1px solid var(--color-border);
		color: var(--color-text-secondary);
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.theme-toggle:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-light);
	}

	:global([data-theme='light']) .theme-toggle {
		border-color: var(--color-light-border);
		color: var(--color-light-text-secondary);
	}

	.mobile-toggle {
		display: flex;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	@media (min-width: 768px) {
		.mobile-toggle {
			display: none;
		}
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 22px;
	}

	.hamburger span {
		display: block;
		height: 2px;
		background: var(--color-text-primary);
		border-radius: 1px;
		transition: all 0.3s ease;
	}

	:global([data-theme='light']) .hamburger span {
		background: var(--color-light-text-primary);
	}

	.hamburger.open span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	.mobile-menu {
		display: flex;
		flex-direction: column;
		padding: 1rem 0;
		gap: 0.5rem;
		border-top: 1px solid var(--color-border);
		margin-top: 0.75rem;
	}

	.mobile-link {
		text-decoration: none;
		color: var(--color-text-secondary);
		font-size: 1rem;
		font-weight: 500;
		padding: 0.75rem 0;
		transition: color 0.2s;
	}

	.mobile-link:hover {
		color: var(--color-accent-light);
	}

	:global([data-theme='light']) .mobile-link {
		color: var(--color-light-text-secondary);
	}
</style>
