import { Roles } from "@/auth/decorators/role.decorator";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { Role } from "@/shared/enums/role.enum";
import { applyDecorators, UseGuards } from "@nestjs/common";


export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}