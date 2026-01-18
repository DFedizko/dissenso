import { prisma } from "@/infrastructure/prisma/prisma";
import type { Article } from "@/../prisma/generated/client";
import { prismaErrorHandler } from "../prisma/prismaErrorHandler";

type OmittedFields = "id" | "tags" | "createdAt" | "updatedAt";
type CreateArticleEntity = Omit<Article, OmittedFields>;

export class ArticleRepository {
	public findMany() {
		return prisma.article.findMany({});
	}

	public findBySlug() {
		// todo add slug in schema
	}

	public async create(article: CreateArticleEntity): Promise<Article> {
		try {
			return await prisma.article.create({
				data: {
					title: article.title,
					coverImage: article.coverImage,
					readingTime: article.readingTime,
					content: article.content,
					slug: article.slug,
					userId: article.userId,
				},
			});
		} catch (error) {
			return prismaErrorHandler(error);
		}
	}
}
