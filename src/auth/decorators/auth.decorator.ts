import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "src/shared/enums/role.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { Roles } from "./role.decorator";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}