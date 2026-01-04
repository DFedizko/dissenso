import { defineAction } from "astro:actions";
import { createArticleSchema } from "./article-schema";

export const article = {
	createArticle: defineAction({
		accept: "json",
		input: createArticleSchema,
		handler: async ({ title, coverImage, content }) => {
			console.log(title, coverImage, content);
		},
	}),
};
