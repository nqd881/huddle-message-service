import { Module } from "@nestjs/common";
import {
  IDomainServiceRegistry,
  IRepoRegistry,
} from "application/abstractions";
import { App } from "application/app";
import { DomainServiceRegistryModule } from "../domain-service-registry";
import { RepoRegistryModule } from "../repo-registry";

@Module({
  imports: [RepoRegistryModule, DomainServiceRegistryModule],
  providers: [
    {
      provide: AppCoreModule.APP_CORE,
      useFactory: (
        repoRegistry: IRepoRegistry,
        domainServiceRegistry: IDomainServiceRegistry
      ) => {
        const app = new App(repoRegistry, domainServiceRegistry);

        return app;
      },
      inject: [
        RepoRegistryModule.REGISTRY,
        DomainServiceRegistryModule.REGISTRY,
      ],
    },
  ],
  exports: [AppCoreModule.APP_CORE],
})
export class AppCoreModule {
  static readonly APP_CORE = Symbol.for("APP_CORE");
}
