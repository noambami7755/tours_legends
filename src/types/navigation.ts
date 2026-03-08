import { NavigatorScreenParams } from '@react-navigation/native';
import { CleanPost } from './index';

export type RootStackParamList = {
  Feed: undefined;
  Post: { postId: number; title: string };
  TriviaIntro: undefined;
  TriviaGame: undefined;
  TriviaSummary: { score: number; mistakes: CleanPost[]; total: number };
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};
