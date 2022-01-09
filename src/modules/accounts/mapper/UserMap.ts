import { IUSerResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
  }: User): IUSerResponseDTO {
    return {
      email,
      name,
      id,
      avatar,
      driver_license,
    };
  }
}

export { UserMap };
