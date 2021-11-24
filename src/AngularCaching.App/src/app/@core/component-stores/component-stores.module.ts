import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from './auth.component-store';
import { ProjectStore } from './project.component-store';
import { PromotionStore } from './promotion.component-store';
import { ToDoStore } from './to-do.component-store';
import { UserStore } from './user.component-store';
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
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentStoresModule { }
