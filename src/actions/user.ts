import { UserRepository } from "@/infrastructure/repositorys/UserRepository";
import { UserService } from "@/services/UserService";
import { defineAction } from "astro:actions";

const userService = new UserService(new UserRepository());

export const user = {
	getUsers: defineAction({
		handler: () => {
			try {
				const res = userService.getUsers();

				console.log(res);

				return res;
			} catch (error) {
				console.error(error);
			}
		},
	}),
};
