import { v4 as uuidv4 } from 'uuid';
export type Action = string;
export const LogoutAction: Action = uuidv4();
