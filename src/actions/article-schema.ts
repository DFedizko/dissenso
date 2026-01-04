import { z } from "astro/zod";

export const createArticleSchema = z.object({
	title: z
		.string()
		.min(3, "O título do artigo precisa ter pelo menos 3 caracteres.")
		.max(100, "O título do artigo deve ter no máximo 100 caracteres."),
	coverImage: z.string().optional(),
	content: z.string(),
});
