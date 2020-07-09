import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
type PostsScreenProps = {
  route: {
    key:string
    name : string,
    params : {
      categoryId :string
    }
  }
}

export const PostsScreen: Component<PostsScreenProps> = observer(function PostsScreen({ route }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  const category = rootStore.categoryStore.categories.find(c=>c.id===route.params.categoryId)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text={category.name}/>
    </Screen>
  )
})
