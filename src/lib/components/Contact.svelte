<script lang="ts">
	import { onMount } from 'svelte';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import Send from './icons/Send.svelte';

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
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			newErrors.email = 'Please enter a valid email address';

		if (!message.trim()) newErrors.message = 'Please enter a message';
		else if (message.trim().length < 10)
			newErrors.message = 'Message must be at least 10 characters';

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validate()) return;

		sending = true;

		// mailto fallback
		const subject = encodeURIComponent(`Portfolio Contact from ${name.trim()}`);
		const body = encodeURIComponent(
			`Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
		);
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

		gsap.fromTo(
			'.contact-form',
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

<section id="contact" class="section-padding" aria-label="Contact section">
	<div class="mx-auto max-w-250">
		<div class="mb-10 flex items-center justify-start gap-3">
			<span class="shrink-0 font-mono text-sm font-semibold text-accent">05.</span>
			<h2 class="text-[clamp(1.5rem,4vw,2rem)] font-extrabold text-text-primary">Get In Touch</h2>
			<div class="h-px flex-1 bg-border"></div>
		</div>

		<div class="mx-auto max-w-150">
			<div class="mb-10">
				<p class="text-[1.05rem] leading-relaxed text-text-secondary">
					Have a project in mind, a question, or just want to say hi? My inbox is always open. I'll
					do my best to get back to you!
				</p>
			</div>

			<form
				class="contact-form flex flex-col gap-6"
				style="opacity: 0;"
				onsubmit={handleSubmit}
				novalidate
			>
				{#if submitted}
					<div
						class="flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-5 font-medium text-success"
					>
						<CircleCheck size={20} class="shrink-0" />
						<p>Message sent! I'll get back to you soon.</p>
					</div>
				{/if}

				<div class="flex flex-col gap-1.5">
					<label for="contact-name" class="text-sm font-semibold text-text-secondary">Name</label>
					<input
						type="text"
						id="contact-name"
						bind:value={name}
						class="rounded-xl border bg-bg-card p-[0.85rem_1rem] font-sans text-[0.95rem] text-text-primary transition-all duration-300 outline-none placeholder:text-text-muted focus:border-accent focus:ring-3 focus:ring-accent/15 {errors.name
							? 'border-error ring-error/15'
							: 'border-border'}"
						placeholder="Your name"
						autocomplete="name"
					/>
					{#if errors.name}
						<span class="text-[0.8rem] font-medium text-error">{errors.name}</span>
					{/if}
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="contact-email" class="text-sm font-semibold text-text-secondary">Email</label>
					<input
						type="email"
						id="contact-email"
						bind:value={email}
						class="rounded-xl border bg-bg-card p-[0.85rem_1rem] font-sans text-[0.95rem] text-text-primary transition-all duration-300 outline-none placeholder:text-text-muted focus:border-accent focus:ring-3 focus:ring-accent/15 {errors.email
							? 'border-error ring-error/15'
							: 'border-border'}"
						placeholder="you@example.com"
						autocomplete="email"
					/>
					{#if errors.email}
						<span class="text-[0.8rem] font-medium text-error">{errors.email}</span>
					{/if}
				</div>

				<div class="flex flex-col gap-1.5">
					<label for="contact-message" class="text-sm font-semibold text-text-secondary"
						>Message</label
					>
					<textarea
						id="contact-message"
						bind:value={message}
						class="min-h-30 resize-y rounded-xl border bg-bg-card p-[0.85rem_1rem] font-sans text-[0.95rem] text-text-primary transition-all duration-300 outline-none placeholder:text-text-muted focus:border-accent focus:ring-3 focus:ring-accent/15 {errors.message
							? 'border-error ring-error/15'
							: 'border-border'}"
						placeholder="What's on your mind?"
						rows="5"
					></textarea>
					{#if errors.message}
						<span class="text-[0.8rem] font-medium text-error">{errors.message}</span>
					{/if}
				</div>

				<button
					type="submit"
					class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-accent p-[0.9rem_2rem] font-sans text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-[0_8px_25px_var(--color-accent-glow)] disabled:cursor-not-allowed disabled:opacity-60"
					disabled={sending}
					id="contact-submit-btn"
				>
					{#if sending}
						Sending...
					{:else}
						Send Message
						<Send size={18} />
					{/if}
				</button>
			</form>
		</div>
	</div>
</section>
