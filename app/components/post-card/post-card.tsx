import React, { FunctionComponent as Component, useCallback } from "react"
import ImageLoad from 'react-native-image-placeholder';
import { View, TouchableOpacity } from "react-native"
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
import { Text } from "../"
// import { observer } from "mobx-react-lite"
// import { useStores } from "../../models"
import { postCardStyles as styles } from "./post-card.styles"
const placeholderImage = require("../content-placeholder/thumbnail.png")

export interface PostCardProps {
  item: any,
  onPress:any 
}

const getImageUrl = i => {
  if (i.featured_media.length) {
    const media = i.featured_media.find(m => m.source_url);
    return media.medium || media.thumbnail || media.source_url;
  }
  return null;
}
/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const PostCard: Component<PostCardProps> = React.memo(props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const PostCard = observer(function PostCard { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()
  const { item , onPress } = props;

  const imageUrl = getImageUrl(item);

  return <TouchableOpacity onPress={onPress}>
    <Card style={styles.CARD}>
      <Card.Content>
        <Subheading>{item.title.rendered}</Subheading>
      </Card.Content>
      <ImageLoad
        style={{
          width: '100%',
          height: 200,
        }}
        // borderRadius={12}
        loadingStyle={{ size: 'small', color: 'gray' }}
        source={imageUrl ? {
          uri: imageUrl
        } : placeholderImage}
      />
      {/* <Card.Cover
      source={imageUrl ? {
        uri: imageUrl
      } : placeholderImage}
    /> */}
    </Card>
  </TouchableOpacity>
})
