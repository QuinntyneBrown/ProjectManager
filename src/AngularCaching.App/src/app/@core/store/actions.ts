export type Action = string;

export const TO_DOS_CHANGED: Action = "TO_DOS_CHANGED";
export const CURRENT_USER_CHANGED: Action = "CURRENT_USER_CHANGED";
export const CURRENT_USER_PROJECT_CHANGED: Action = "CURRENT_USER_PROJECT_CHANGED";
export const PROJECT_CHANGED: Action = "PROJECT_CHANGED";

export const ALL = [TO_DOS_CHANGED, CURRENT_USER_CHANGED, CURRENT_USER_PROJECT_CHANGED, PROJECT_CHANGED];

