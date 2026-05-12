<script lang="ts">
	import { onMount } from 'svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let errors = $state<{ name?: string; email?: string; message?: string }>({});
	let submitted = $state(false);
	let sending = $state(false);

	function validate(): boolean {
		const newErrors: typeof errors = {};

		if (!name.trim()) newErrors.name = 'Please enter your name';
		else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

		if (!email.trim()) newErrors.email = 'Please enter your email';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address';

		if (!message.trim()) newErrors.message = 'Please enter a message';
		else if (message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validate()) return;

		sending = true;

		// mailto fallback
		const subject = encodeURIComponent(`Portfolio Contact from ${name.trim()}`);
		const body = encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`);
		window.location.href = `mailto:fortuneifealadetan01@gmail.com?subject=${subject}&body=${body}`;

		setTimeout(() => {
			sending = false;
			submitted = true;
			name = '';
			email = '';
			message = '';

			setTimeout(() => {
				submitted = false;
			}, 5000);
		}, 500);
	}

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo('.contact-form',
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				scrollTrigger: {
					trigger: '#contact',
					start: 'top 75%',
					toggleActions: 'play none none reverse'
				}
			}
		);
	});
</script>

<section id="contact" class="contact section-padding" aria-label="Contact section">
	<div class="contact-inner">
		<div class="section-header">
			<span class="section-number">05.</span>
			<h2 class="section-title">Get In Touch</h2>
			<div class="section-line"></div>
		</div>

		<div class="contact-intro">
			<p>Have a project in mind, a question, or just want to say hi? My inbox is always open. I'll do my best to get back to you!</p>
		</div>

		<form class="contact-form" style="opacity: 0;" onsubmit={handleSubmit} novalidate>
			{#if submitted}
				<div class="success-msg">
					<span class="success-icon">✅</span>
					<p>Message sent! I'll get back to you soon.</p>
				</div>
			{/if}

			<div class="form-group">
				<label for="contact-name" class="form-label">Name</label>
				<input
					type="text"
					id="contact-name"
					bind:value={name}
					class="form-input"
					class:form-error={errors.name}
					placeholder="Your name"
					autocomplete="name"
				/>
				{#if errors.name}
					<span class="error-text">{errors.name}</span>
				{/if}
			</div>

			<div class="form-group">
				<label for="contact-email" class="form-label">Email</label>
				<input
					type="email"
					id="contact-email"
					bind:value={email}
					class="form-input"
					class:form-error={errors.email}
					placeholder="you@example.com"
					autocomplete="email"
				/>
				{#if errors.email}
					<span class="error-text">{errors.email}</span>
				{/if}
			</div>

			<div class="form-group">
				<label for="contact-message" class="form-label">Message</label>
				<textarea
					id="contact-message"
					bind:value={message}
					class="form-input form-textarea"
					class:form-error={errors.message}
					placeholder="What's on your mind?"
					rows="5"
				></textarea>
				{#if errors.message}
					<span class="error-text">{errors.message}</span>
				{/if}
			</div>

			<button type="submit" class="submit-btn" disabled={sending} id="contact-submit-btn">
				{#if sending}
					Sending...
				{:else}
					Send Message
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
				{/if}
			</button>
		</form>
	</div>
</section>

<style>
	.contact-inner {
		max-width: 600px;
		margin: 0 auto;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
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

	.contact-intro {
		margin-bottom: 2.5rem;
	}

	.contact-intro p {
		color: var(--color-text-secondary);
		font-size: 1.05rem;
		line-height: 1.7;
	}

	:global([data-theme='light']) .contact-intro p {
		color: var(--color-light-text-secondary);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	:global([data-theme='light']) .form-label {
		color: var(--color-light-text-secondary);
	}

	.form-input {
		padding: 0.85rem 1rem;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		color: var(--color-text-primary);
		font-size: 0.95rem;
		font-family: var(--font-sans);
		transition: all 0.3s ease;
		outline: none;
	}

	.form-input:focus {
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px var(--color-accent-glow);
	}

	.form-input::placeholder {
		color: var(--color-text-muted);
	}

	.form-error {
		border-color: var(--color-error) !important;
	}

	.form-error:focus {
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
	}

	:global([data-theme='light']) .form-input {
		background: var(--color-light-bg-card);
		border-color: var(--color-light-border);
		color: var(--color-light-text-primary);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.error-text {
		font-size: 0.8rem;
		color: var(--color-error);
		font-weight: 500;
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.9rem 2rem;
		background: var(--color-accent);
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: var(--font-sans);
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--color-accent-light);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px var(--color-accent-glow);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.success-msg {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 10px;
		color: var(--color-success);
		font-weight: 500;
	}

	.success-icon {
		font-size: 1.25rem;
	}
</style>
