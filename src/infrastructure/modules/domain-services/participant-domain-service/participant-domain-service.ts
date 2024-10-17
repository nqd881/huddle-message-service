import { Inject, Injectable } from "@nestjs/common";
import { IPermissionService, ParticipantService } from "domain/services";
import { PermissionDomainServiceModule } from "../permission-domain-service";

@Injectable()
export class ParticipantDomainService extends ParticipantService {
  constructor(
    @Inject(PermissionDomainServiceModule.SERVICE)
    permissionService: IPermissionService
  ) {
    super(permissionService);
  }
}
