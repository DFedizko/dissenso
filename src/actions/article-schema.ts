import { z } from "astro/zod";

export const createArticleSchema = z.object({
	title: z
		.string({ required_error: "É necessário ter um título no artigo." })
		.min(3, "O título do artigo precisa ter pelo menos 3 caracteres.")
		.max(100, "O título do artigo deve ter no máximo 100 caracteres."),

	coverImage: z.string().optional(),
	content: z.string({ required_error: "O conteúdo do artigo é necessário." }),
});
