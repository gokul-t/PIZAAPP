import React, { FunctionComponent as Component, useEffect, useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { BulletItem, Header, Text, Screen } from "../../components"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"



const FULL: ViewStyle = { flex: 1, backgroundColor: color.palette.black, }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export const CategoriesScreen: Component = observer(function CategoriesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const goHomeScreen = (item) => navigation.navigate("home", {
    categoryId: item.id
  })

  const [refreshing, setRefreshing] = useState(false)

  const fetchCategories = useCallback(() => {
    if (!refreshing) {
      setRefreshing(true)
      rootStore.categoryStore.getCategories()
        .then(() => setRefreshing(false))
        .catch(() => setRefreshing(false))
    }
  }, [refreshing])

  useEffect(() => {
    fetchCategories()
  }, [])

  const renderItem = (item) => <TouchableOpacity key={item.id} onPress={() => goHomeScreen(item)}>
    <BulletItem text={item.name} />
  </TouchableOpacity>

  const renderList = () => {
    if (rootStore.categoryStore.categories.length === 0) {
      return (
        // <Box center f={1}>
        <Text>Categories Empty</Text>
        // </Box>
      )
    }
    return rootStore.categoryStore.categories.map(renderItem)
  }

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="categoriesScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        {renderList()}
      </Screen>
    </View>
  )
})
