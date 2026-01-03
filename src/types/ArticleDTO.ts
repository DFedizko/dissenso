import type { ArticleMetaDTO } from "./ArticleMetaDTO";

export interface ArticleDTO {
	title: string;
	coverImage: string;
	articleMeta: ArticleMetaDTO;
	content: any;
	tags: string[];
}
