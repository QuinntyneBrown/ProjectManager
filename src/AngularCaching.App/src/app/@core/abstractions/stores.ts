import { InjectionToken } from "@angular/core";
import { Project, Promotion, ToDo, User } from "@api/models";
import { Observable } from "rxjs";

export const AUTH_STORE = new InjectionToken("AUTH_STORE");
export const PROJECT_STORE = new InjectionToken("PROJECT_STORE");
export const PROMOTION_STORE = new InjectionToken("PROMOTION_STORE");
export const TO_DO_STORE = new InjectionToken("TO_DO_STORE");
export const USER_STORE = new InjectionToken("USER_STORE");

export interface IQueryStore {
  select<T>(cacheKey: string): Observable<T>;
}

export interface IAuthStore extends IQueryStore {
  tryToLogout():void;
  tryToLogin(options: { username: string, password: string }): Observable<any>;
}

export interface IProjectStore extends IQueryStore {
  getCurrentUserProject(): Observable<Project>;
  getProjects(): Observable<Project[]>;
  update(options: { project: Project});
}

export interface IPromotionStore extends IQueryStore {
  getPromotionsByProjectId(projectId: string): Observable<Promotion[]>;
}
export interface IUserStore extends IQueryStore {
  getCurrent(): Observable<User>;
  update (options: { user: User }): Observable<{ user: User}>
}

export interface IToDoStore extends IQueryStore {
  getToDoById(options: { toDoId: string }): Observable<ToDo>;
  getToDosByProjectName(options: {projectName: string }): Observable<ToDo[]>;
  create(options: { toDo: ToDo }): Observable<{ toDo: ToDo }>;
  update(options: { toDo: ToDo }): Observable<{ toDo: ToDo }>;
  delete(options: { toDo: ToDo }): Observable<void>;
}
