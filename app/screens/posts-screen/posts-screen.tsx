import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import HtmlView from "react-native-htmlview";
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
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
      post :any
    }
  }
}

export const PostsScreen: Component<PostsScreenProps> = observer(function PostsScreen(props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { post } = props.route.params;
  // const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        headerText={post.title.rendered}
        leftIcon={ "back" }
        onLeftPress={ goBack }
        // style={HEADER}
        // titleStyle={HEADER_TITLE}
      />
      <HtmlView value={post.content.rendered}></HtmlView>
    </Screen>
  )
})
