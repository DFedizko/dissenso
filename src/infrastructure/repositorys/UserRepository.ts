import type { User } from "@/../prisma/generated/client";
import { prisma } from "@/infrastructure/prisma/prisma";

export class UserRepository {
	public async findMany(): Promise<User[]> {
		return prisma.user.findMany({});
	}
}
