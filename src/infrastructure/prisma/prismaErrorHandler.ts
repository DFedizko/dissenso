import { Prisma } from "../../../prisma/generated/client";

export const prismaErrorHandler = (error: unknown): never => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.log(error.message);
		console.log(`Prisma error code: ${error.code}`);
	}

	throw error;
}
