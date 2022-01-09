import { inject, injectable } from "tsyringe";

import { IUSerResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<IUSerResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
