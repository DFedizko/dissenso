import type { CreateArticleInput } from "@/schemas/article/createArticleSchema";
import type { ArticleRepository } from "@/infrastructure/repositorys/ArticleRepository";
import { slugParser } from "@/utils/slugParser";

export class ArticleService {
	constructor(private readonly articleRepository: ArticleRepository) {}

	public getArticles() {
		return this.articleRepository.findMany();
	}

	public getArticleBySlug(slug: string) {
		// call repository(slug)
	}

	public createArticle(article: CreateArticleInput) {
		const userId = "aee6f719-6600-4ce8-8998-83cccf15ca01";
		const readingTime = 5;
		const slug = slugParser(article.title);

		console.log({ slug });
		return this.articleRepository.create({
			title: article.title,
			coverImage: article.coverImage,
			readingTime,
			content: article.content,
			userId,
			slug,
		});
	}

	public updateArticleBySlug(slug: string) {
		// call repository(slug)
	}

	public deleteArticleBySlug(slug: string) {
		// call repository
	}
}
