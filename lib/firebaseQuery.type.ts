import { type Timestamp, type DocumentSnapshot } from "firebase/firestore";

export type TCommentData = {
  id: string;
  userId: string;
  userName: string;
  content: string;
  userDisplayPicture: string;
  createdAt: string;
};

export type TPaginatedCommentsResult = {
  comments: TCommentData[];
  lastVisible: DocumentSnapshot | null;
  hasMore: boolean;
};
