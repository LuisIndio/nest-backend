import { SetMetadata } from "@nestjs/common/decorators/core";
import { Role } from "../../Common/enums/rol.enum";

export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);