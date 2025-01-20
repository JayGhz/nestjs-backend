import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "src/common/enums/role.enum";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "./role.decorator";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}