import { z } from "astro/zod";

export const createArticleSchema = z.object({
	title: z
		.string({ required_error: "É necessário ter um título no artigo." })
		.trim()
		.min(3, "O título do artigo precisa ter pelo menos 3 caracteres.")
		.max(100, "O título do artigo deve ter no máximo 100 caracteres."),
	coverImage: z
		.string({
			required_error: "É necessário que o artigo tenha uma imagem.",
		})
		.trim()
		.min(5, "É necessário que a url da imagem tenha pelo menos 5 caracteres."),
	content: z.coerce.string({
		required_error: "O conteúdo do artigo é necessário.",
	})
	.trim()
	.min(3, "O conteúdo precisa ter alguns caracteres."),
});

export type CreateArticleInput = z.input<typeof createArticleSchema>;
