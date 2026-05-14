import type { PageServerLoad } from './$types';
import type { Project, ProjectsResponse } from '$lib/types/project';

const API_URL = 'https://www.api.ifecodes.xyz/api/projects';

const ALLOWED_FULL_STACK_TITLES = [
	'Whisperbox E2e (Hng Stage 4 I14)',
	'Onboarding Widget Manager',
	'QuizNova AI',
	'Hng Stage2 Fe Multi Framework Ticket App',
	'Hng Stage8 Be Wallet Service With Paystack JWT API Keys'
];

export const load: PageServerLoad = async () => {
	try {
		const response = await fetch(API_URL, {
			headers: {
				Accept: 'application/json',
				'User-Agent': 'IfeCodes-Portfolio/1.0 (SvelteKit)'
			}
		});

		if (!response.ok) {
			return {
				projects: [] as Project[],
				error: `Failed to fetch projects (${response.status})`
			};
		}

		const data: ProjectsResponse = await response.json();

		// Filter: Frontend projects + specific Full Stack projects with visible frontends + Dev Tools
		const filtered = data.projects.filter((project) => {
			if (project.deleted) return false;
			if (project.type === 'Frontend') return true;
			if (project.type === 'Dev Tool') return true;
			if (project.type === 'Full Stack') {
				return ALLOWED_FULL_STACK_TITLES.some(
					(title) => project.title.toLowerCase() === title.toLowerCase()
				);
			}
			return false;
		});

		return {
			projects: filtered,
			error: null
		};
	} catch (err) {
		console.error('Failed to fetch projects:', err);
		return {
			projects: [] as Project[],
			error: 'Could not connect to the projects API. Please try again later.'
		};
	}
};
