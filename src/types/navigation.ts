import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Feed: undefined;
  Post: { postId: number; title: string };
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};
