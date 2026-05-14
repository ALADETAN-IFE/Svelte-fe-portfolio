<script lang="ts">
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ label: 'GitHub', href: 'https://github.com/ALADETAN-IFE' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/fortune-ife-aladetan-458ab136a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app`'
		},
		{ label: 'Portfolio', href: 'https://www.ifecodes.xyz' },
		{ label: 'X', href: 'https://x.com/IfeCodes_' },
		{ label: 'Instagram', href: 'https://instagram.com/IfeCodes_' }
	];
</script>

<footer class="border-t border-border p-[2.5rem_1.5rem]" aria-label="Footer">
	<div class="mx-auto flex max-w-250 flex-col items-center gap-5">
		<div class="flex flex-wrap justify-center gap-6">
			{#each socialLinks as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm font-medium text-text-muted no-underline transition-colors duration-200 hover:text-accent-light"
					>{link.label}</a
				>
			{/each}
		</div>

		<div class="h-px w-[60px] bg-border"></div>

		<p class="text-center font-mono text-[0.8rem] text-text-muted">
			Built with <span class="font-semibold text-accent-light">SvelteKit</span> by
			<span class="font-semibold text-accent-light">IfeCodes</span>
			&copy;{currentYear}
		</p>
	</div>
</footer>
