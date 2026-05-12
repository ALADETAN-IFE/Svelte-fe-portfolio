export interface Skill {
	name: string;
	icon: string;
}

export interface SkillCategory {
	title: string;
	icon: string;
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		title: 'Frontend',
		icon: '🎨',
		skills: [
			{ name: 'React', icon: '⚛️' },
			{ name: 'Next.js', icon: '▲' },
			{ name: 'Svelte', icon: '🔥' },
			{ name: 'TypeScript', icon: '📘' },
			{ name: 'TailwindCSS', icon: '💨' },
			{ name: 'HTML/CSS', icon: '🌐' }
		]
	},
	{
		title: 'Mobile',
		icon: '📱',
		skills: [
			{ name: 'React Native', icon: '📲' },
			{ name: 'Expo', icon: '🚀' },
			{ name: 'NativeWind', icon: '💨' }
		]
	},
	{
		title: 'Backend',
		icon: '⚙️',
		skills: [
			{ name: 'Node.js', icon: '🟢' },
			{ name: 'Express.js', icon: '🛤️' },
			{ name: 'PostgreSQL', icon: '🐘' },
			{ name: 'MongoDB', icon: '🍃' },
			{ name: 'Prisma', icon: '💎' },
			{ name: 'Supabase', icon: '⚡' }
		]
	},
	{
		title: 'DevOps',
		icon: '🛠️',
		skills: [
			{ name: 'Linux', icon: '🐧' },
			{ name: 'Nginx', icon: '🌊' },
			{ name: 'SSL/TLS', icon: '🔒' },
			{ name: 'CI/CD', icon: '🔄' },
			{ name: 'Docker', icon: '🐳' },
			{ name: 'Git', icon: '📦' }
		]
	}
];
