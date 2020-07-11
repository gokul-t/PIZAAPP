import React, { FunctionComponent as Component } from "react"
import { Text, View, Alert } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder";
import { observer, useObserver } from "mobx-react-lite"
// import { useStores } from "../../models"
import { contentPlaceholderStyles as styles } from "./content-placeholder.styles"
import ImageLoad from 'react-native-image-placeholder'
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Subheading,
  Title,
  Paragraph,
  List,
  Headline,
} from 'react-native-paper';
const placeholderImage = require("./thumbnail.png")

export interface ContentPlaceholderProps { }

/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const CardPlaceholder: Component<ContentPlaceholderProps> = props => {
  return <Card>
    <Card.Content>
      <Placeholder
        Animation={Fade}
      // Left={PlaceholderMedia}
      // Right={PlaceholderMedia}
      >
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
      <ImageLoad style={{
        width: '100%',
        height: 200,
      }}
        // borderRadius={12}
        loadingStyle={{ size: 'small', color: 'gray' }}
        source={placeholderImage}></ImageLoad>
    </Card.Content>
  </Card>
}
const ten = new Array(10).fill(0);

export const ContentPlaceholder: Component<ContentPlaceholderProps> = React.memo(props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const ContentPlaceholder = observer(function ContentPlaceholder { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()
  return <>
    <View>
      {ten.map((k, i) => <CardPlaceholder key={i.toString()}></CardPlaceholder>)}
    </View>
  </>;
})
