<script lang="ts">
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ label: 'GitHub', href: 'https://github.com/ALADETAN-IFE' },
		{ label: 'Dev.to', href: 'https://dev.to/ifecodes' },
		{ label: 'X', href: 'https://x.com/ifecodes' },
		{ label: 'Instagram', href: 'https://instagram.com/ifecodes' }
	];
</script>

<footer class="footer" aria-label="Footer">
	<div class="footer-inner">
		<div class="footer-links">
			{#each socialLinks as link}
				<a href={link.href} target="_blank" rel="noopener noreferrer" class="footer-link">{link.label}</a>
			{/each}
		</div>

		<div class="footer-divider"></div>

		<p class="footer-credit">
			Built with <span class="accent">SvelteKit</span> by <span class="accent">IfeCodes</span> &copy; {currentYear}
		</p>
	</div>
</footer>

<style>
	.footer {
		padding: 2.5rem 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	:global([data-theme='light']) .footer {
		border-top-color: var(--color-light-border);
	}

	.footer-inner {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.footer-link {
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		transition: color 0.2s;
	}

	.footer-link:hover {
		color: var(--color-accent-light);
	}

	:global([data-theme='light']) .footer-link {
		color: var(--color-light-text-muted);
	}

	.footer-divider {
		width: 60px;
		height: 1px;
		background: var(--color-border);
	}

	:global([data-theme='light']) .footer-divider {
		background: var(--color-light-border);
	}

	.footer-credit {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		text-align: center;
		font-family: var(--font-mono);
	}

	:global([data-theme='light']) .footer-credit {
		color: var(--color-light-text-muted);
	}

	.accent {
		color: var(--color-accent-light);
		font-weight: 600;
	}
</style>
