import { Controller, Get, Put, Request, UseGuards } from "@nestjs/common";
import { MatchmakingService } from "./matchmaking.service";
import { Company } from "../company/entities/company.entity";
import { InvestorProfile } from "../investor-profile/entities/investor-profile.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/role.enum";

@UseGuards(JwtAuthGuard)
@Controller('matchmaking')
export class MatchmakingController {
  constructor(
    private matchmakingService: MatchmakingService
  ) {}

  @Roles(Role.Investor)
  @Get('companies')
  async getMatchingCompanies(@Request() req): Promise<Company[]> {
    return this.matchmakingService.getMatchingCompanies(req.user.id);
  }

  @Roles(Role.User)
  @Get('investor-profiles')
  async getMatchingInvestorProfiles(@Request() req): Promise<InvestorProfile[]> {
    return this.matchmakingService.getMatchingInvestorProfiles(req.user.id);
  }
}
