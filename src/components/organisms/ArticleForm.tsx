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
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const ArticleForm = () => {
	const [value, setValue] = useState<string>(
		() => localStorage.getItem("article-content") ?? "",
	);

	useEffect(() => {
		localStorage.setItem("article-content", value);
	}, [value]);

	const form = useForm({
		resolver: zodResolver(createArticleSchema),
		defaultValues: JSON.parse(localStorage.getItem("form-data") || "{}"),
	});

	const watchedValues = form.watch();

	useEffect(() => {
		localStorage.setItem("form-data", JSON.stringify(watchedValues));
	}, [watchedValues]);

	const onSubmit = async (formData: z.infer<typeof createArticleSchema>) => {
		const { error } = await actions.article.createArticle({
			title: formData.title,
			coverImage: formData.coverImage,
			content: formData.content,
		});

		if (error) {
			toast.error("Falha ao criar artigo.");
			console.error(error);
			return;
		}

		localStorage.setItem("article-content", "");
		localStorage.setItem("form-data", JSON.stringify({}));

		toast.success("Artigo criado com sucesso.");
	};

	return (
		<Card className="w-full mb-6">
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
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<div className="md-editor">
										<MDEditor
											{...field}
											value={value}
											onChange={(value) => {
												field.onChange(value ?? "");
												setValue(value ?? "");
											}}
											preview="edit"
										/>
									</div>
									<div className="md-preview">
										<MDEditor.Markdown source={value} />
									</div>
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
