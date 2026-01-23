export interface IStreamingService {
  emitToRoom<T>(room: string, event: string, data: T): Promise<void>;

  emitToUser<T>(userId: string, event: string, data: T): Promise<void>;

  broadcast<T>(event: string, data: T): Promise<void>;

  joinRoom(userId: string, room: string): Promise<void>;

  leaveRoom(userId: string, room: string): Promise<void>;

  getConnectedUsers(): Promise<string[]>;

  isUserOnline(userId: string): Promise<boolean>;
}
