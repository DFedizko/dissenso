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
import { createArticleSchema } from "@/schemas/article/createArticleSchema";
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
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isSubmitting) return;
		localStorage.setItem("article-content", value);
	}, [value, isSubmitting]);

	const form = useForm({
		resolver: zodResolver(createArticleSchema),
		defaultValues: JSON.parse(localStorage.getItem("form-data") || "{}"),
	});

	const watchedValues = form.watch();

	useEffect(() => {
		if (isSubmitting) return;
		localStorage.setItem("form-data", JSON.stringify(watchedValues));
	}, [watchedValues, isSubmitting]);

	const onSubmit = async (formData: z.infer<typeof createArticleSchema>) => {
		setIsSubmitting(true);
		const { error } = await actions.article.createArticle({
			title: formData.title,
			coverImage: formData.coverImage,
			content: formData.content,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		form.reset({
			title: "",
			coverImage: "",
			content: "",
		});
		setValue("");
		localStorage.removeItem("article-content");
		localStorage.removeItem("form-data");
		toast.success("Artigo criado com sucesso.");
		setIsSubmitting(false);
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
										Url da capa do artigo
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
					<Button
						onClick={async () => {
							console.log(await actions.user.getUsers());
						}}
					>
						Get users
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
};

export default ArticleForm;
