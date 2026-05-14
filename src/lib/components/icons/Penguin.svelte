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
	class="custom-penguin {className}"
>
	<circle cx="12" cy="8" r="4" />
	<ellipse cx="12" cy="15" rx="5" ry="6" />
	<circle cx="10.5" cy="7" r="0.8" />
	<circle cx="13.5" cy="7" r="0.8" />
	<path d="M 12 8.5 L 11.5 9.5 L 12.5 9.5 Z" />
	<path d="M 7 13 Q 4 14 4 16" />
	<path d="M 17 13 Q 20 14 20 16" />
	<line x1="10" y1="21" x2="10" y2="22" />
	<line x1="14" y1="21" x2="14" y2="22" />
</svg>
