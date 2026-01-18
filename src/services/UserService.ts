import type { UserRepository } from "@/infrastructure/repositorys/UserRepository";
import type { User } from "@/../prisma/generated/client";

export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	public getUsers() {
		return this.userRepository.findMany();
	}
}
