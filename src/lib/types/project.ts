export interface Project {
	projectId: string;
	title: string;
	description: string;
	githubUrl: string;
	liveUrl?: string;
	tech: string[];
	preview: string | null;
	type: 'Frontend' | 'Mobile' | 'Backend' | 'Full Stack' | 'Dev Tool';
	featured: boolean;
	contribution: string;
	context: string;
	features?: string[];
	difficulty?: string;
	skillsDemonstrated?: string[];
	deleted: boolean;
}

export interface ProjectsResponse {
	projects: Project[];
}
