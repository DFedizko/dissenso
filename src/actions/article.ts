import { defineAction } from "astro:actions";
import { createArticleSchema } from "../schemas/article/createArticleSchema";
import { ArticleService } from "@/services/ArticleService";
import { ArticleRepository } from "@/infrastructure/repositorys/ArticleRepository";

const articleService = new ArticleService(new ArticleRepository());

export const article = {
	// getArticle: defineAction({
	// 	handler: async () => {
	// 		return await articleService.getArticles();
	// 	},
	// }),
	createArticle: defineAction({
		accept: "json",
		input: createArticleSchema,
		handler: async (article) => {
			try {
				await articleService.createArticle(article);
			} catch (error) {
				throw new Error("Falha ao criar artigo.");
			}
		},
	}),
};
