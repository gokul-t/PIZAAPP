import { ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"

export const postCardStyles = {
  WRAPPER: {
    justifyContent: 'center',
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primary
  } as TextStyle,
  CARD :{
    shadowOffset: { width: 5, height: 5 },
    width: '100%',
    // borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10,
  } as any
}
