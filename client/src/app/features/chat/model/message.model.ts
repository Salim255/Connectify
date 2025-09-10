export interface Message {
  id: string;                      // unique identifier
  chatId: string;          // which chat/thread this belongs to
  senderId: string;                // user id of the sender
  senderName: string;              // display name of the sender
  content?: string;                // plain text message (optional if it's media)
  mediaUrl?: string;               // optional: image, video, file link
  mediaType?: 'image' | 'video' | 'file' | 'audio'; // kind of media
  replyToMessageId?: string;       // optional: supports replies/threading
  reactions?: { [emoji: string]: string[] }; // emoji -> list of userIds
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'; // delivery state
  timestamp: Date;                 // when the message was created
  edited?: boolean;                // true if the message was edited
  deleted?: boolean;               // true if deleted (can still show "message deleted")
  type: 'text' | 'media' | 'system'; // helps rendering differently
  isOwn: boolean;                 // flag for UI (sender === currentUser)
}
