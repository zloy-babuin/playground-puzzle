export interface WSMessage <T>{
  type: string;
  data: T | null;
}
