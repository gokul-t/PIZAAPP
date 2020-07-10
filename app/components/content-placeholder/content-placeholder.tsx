import React, { FunctionComponent as Component } from "react"
import { Text, View } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder";
import { observer, useObserver } from "mobx-react-lite"
// import { useStores } from "../../models"
import { contentPlaceholderStyles as styles } from "./content-placeholder.styles"
import ImageLoad from 'react-native-image-placeholder'
const placeholderImage = require("./thumbnail.png")

export interface ContentPlaceholderProps { }

/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const CardPlaceholder: Component<ContentPlaceholderProps> = props => {
  return <Placeholder
    Animation={Fade}
  >
    <PlaceholderLine width={80} />
    <PlaceholderLine width={30} />
    <ImageLoad source={placeholderImage}></ImageLoad>
  </Placeholder>
}
export const ContentPlaceholder: Component<ContentPlaceholderProps> = React.memo(props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const ContentPlaceholder = observer(function ContentPlaceholder { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()
  const ten = new Array(10).fill(0);
  return <>
    <View style={{ marginTop: 23, padding: 33 }}>
      { ten.map(()=><CardPlaceholder></CardPlaceholder>) }
    </View>
  </>;
})
