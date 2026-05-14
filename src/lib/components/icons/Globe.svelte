<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
	}
	let { size = 24, class: className = '' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="lucide lucide-globe {className}"
>
	<circle cx="12" cy="12" r="10" />
	<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
	<path d="M2 12h20" />
</svg>
