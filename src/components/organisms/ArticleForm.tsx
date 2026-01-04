import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArticleSchema } from "@/actions/article-schema";
import type { z } from "astro/zod";
import { actions } from "astro:actions";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@remirror/react-editors/markdown";
import { OnChangeJSON } from "@remirror/react";
import { useCallback, useState } from "react";
import type { RemirrorJSON } from "remirror";

const STORAGE_KEY = "remirror-editor-content";

const ArticleForm = () => {
	const [articleContent, setArticleContent] = useState<
		RemirrorJSON | undefined
	>(() => {
		const content = window.localStorage.getItem(STORAGE_KEY);
		return content ? JSON.parse(content) : undefined;
	});

	const form = useForm({
		resolver: zodResolver(createArticleSchema),
		defaultValues: {
			title: "",
			content: "",
			coverImage: "",
		},
	});

	const handleEditorChange = useCallback(
		(json: RemirrorJSON) => {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
			setArticleContent(json);
			form.setValue("content", JSON.stringify(json), {
				shouldDirty: true,
				shouldValidate: true,
			});
		},
		[form.setValue],
	);

	const onSubmit = async (formData: z.infer<typeof createArticleSchema>) => {
		const hasContent =
			articleContent?.content?.[1]?.content
				?.map((c) => c.text)
				.filter((c) => c !== undefined).length ||
			articleContent?.content?.[0].content?.[0].text;

		if (!hasContent) {
			form.setError("content", {
				type: "required",
				message: "O artigo precisa de pelo menos um caracter.",
			});
			return;
		}

		const { error } = await actions.article.createArticle({
			title: formData.title,
			coverImage: formData.coverImage,
			content: JSON.stringify(articleContent?.content),
		});

		if (error) {
			toast.error("Falha ao criar artigo.");
			console.error(error);
			return;
		}

		toast.success("Artigo criado com sucesso.");
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Publicar artigo</CardTitle>
				<CardDescription>Publique seu artigo.</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="article-form"
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					<FieldGroup>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="article-title">
										Título
									</FieldLabel>
									<Input
										{...field}
										id="article-title"
										aria-invalid={fieldState.invalid}
										placeholder="Digite o título do artigo"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
					<FieldGroup>
						<Controller
							name="coverImage"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="article-cover-image">
										Url da capa do artigo (opcional)
									</FieldLabel>
									<Input
										{...field}
										id="article-cover-image"
										aria-invalid={fieldState.invalid}
										placeholder="https://picsum.photos/1200/300"
										autoComplete="off"
									/>
								</Field>
							)}
						/>
					</FieldGroup>
					<FieldGroup>
						<Controller
							name="content"
							control={form.control}
							render={({ fieldState }) => (
								<Field>
									<MarkdownEditor
										placeholder="Descreva seu artigo..."
										initialContent={articleContent}
									>
										<OnChangeJSON
											onChange={handleEditorChange}
										/>
									</MarkdownEditor>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field>
					<Button type="submit" form="article-form">
						Publicar
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
};

export default ArticleForm;
