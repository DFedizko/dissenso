import type { ArticleMetaDTO } from "./ArticleMetaDTO";

export interface ArticleDTO {
	id: string;
	title: string;
	coverImage: string | null;
	articleMeta: ArticleMetaDTO;
	content: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}
