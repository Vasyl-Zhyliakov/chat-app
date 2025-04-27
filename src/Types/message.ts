export interface Message {
  id: number;
  text: string;
  sender: Users;
}

export enum Users {
  user = 'user',
  chatBot = 'chatBot',
}
