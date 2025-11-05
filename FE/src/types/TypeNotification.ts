export interface TypeNotification {
  senderId: string;
  receiverId: string;
  deviceTokenId: string;
  title: string;
  body: string;
  isRead: boolean;
}
