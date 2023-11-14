import { Conversation, Friendship, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type FullFriendshipType = Friendship & {
  userA: User; // Friendship에 연결된 UserA의 정보
  userB: User; // Friendship에 연결된 UserB의 정보
  // 기타 필요한 정보들을 추가로 정의
};
