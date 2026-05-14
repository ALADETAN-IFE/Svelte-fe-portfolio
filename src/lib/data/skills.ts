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
		icon: 'palette',
		skills: [
			{ name: 'HTML/CSS', icon: 'globe' },
			{ name: 'TailwindCSS', icon: 'wind' },
			{ name: 'TypeScript', icon: 'book' },
			{ name: 'React', icon: 'atom' },
			{ name: 'Next.js', icon: 'triangle' },
			{ name: 'Vue.js', icon: 'triangle' },
			{ name: 'Svelte', icon: 'flame' }
		]
	},
	{
		title: 'Mobile',
		icon: 'phone',
		skills: [
			{ name: 'React Native', icon: 'phone2' },
			{ name: 'Expo', icon: 'rocket' },
			{ name: 'NativeWind', icon: 'wind' }
		]
	},
	{
		title: 'Backend',
		icon: 'cog',
		skills: [
			{ name: 'Node.js', icon: 'circle' },
			{ name: 'Express.js', icon: 'git' },
			{ name: 'Next.js', icon: 'triangle' },
			{ name: 'PostgreSQL', icon: 'database' },
			{ name: 'MongoDB', icon: 'leaf' },
			{ name: 'Prisma', icon: 'gem' },
			{ name: 'Supabase', icon: 'zap' }
		]
	},
	{
		title: 'DevOps',
		icon: 'wrench',
		skills: [{ name: 'CI/CD', icon: 'rotate' }]
	}
];
