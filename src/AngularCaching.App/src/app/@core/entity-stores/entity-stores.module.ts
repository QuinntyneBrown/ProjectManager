import { NgModule } from '@angular/core';
import { AuthStore } from './auth.store';
import { ProjectStore } from './project.store';
import { PromotionStore } from './promotion.store';
import { ToDoStore } from './to-do.store';
import { UserStore } from './user.store';
import { AUTH_STORE, PROJECT_STORE, PROMOTION_STORE, TO_DO_STORE, USER_STORE } from '@core/abstractions/stores';


@NgModule({
  providers: [
    {
      provide: AUTH_STORE,
      useClass: AuthStore
    },
    {
      provide: PROJECT_STORE,
      useClass: ProjectStore
    },
    {
      provide: PROMOTION_STORE,
      useClass: PromotionStore
    },
    {
      provide: TO_DO_STORE,
      useClass: ToDoStore
    },
    {
      provide: USER_STORE,
      useClass: UserStore
    }
  ]
})
export class EntityStoresModule { }
