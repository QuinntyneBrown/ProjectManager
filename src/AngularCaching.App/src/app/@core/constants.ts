import { InjectionToken } from "@angular/core";

export const storageKey = 'angularCaching';
export const accessTokenKey = `${storageKey}:accessTokenKey`;
export const usernameKey = `${storageKey}:usernameKey`;
export const currentUserKey = `${storageKey}:currentUserKey`;
export const loginCredentialsKey = `${storageKey}:loginCredentialsKey`;
export const BASE_URL = new InjectionToken("baseUrl");
