export type ActionType = 'add' | 'update' | 'delete';

export interface Action<T> {
  payload:T,
  type: ActionType
}
