import { fonts, colors } from "./theme";


export const tabScreenOptions = {
  tabBarStyle: {
    backgroundColor: colors.secondary,
    borderTopWidth: 0,
    height: 65,
  },
  tabBarLabelStyle: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.white,
  headerShown: false,
};