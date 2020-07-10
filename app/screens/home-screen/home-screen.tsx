import React, { FunctionComponent as Component, useEffect, useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, FlatList, Alert } from 'react-native';
import _ from "lodash";
import { useNavigation } from "@react-navigation/native"
import { BulletItem, Header, Text, Screen, PostCard } from "../../components"
import { ContentPlaceholder } from "../../components"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.black
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
type HomeScreenProps = {
  route: {
    key: string
    name: string,
    params: {
      categoryId: string
    }
  },
  refreshing: boolean,
  loading: boolean
}
export const HomeScreen: Component<HomeScreenProps> = observer(function HomeScreen(props) {
  const { route, refreshing = false, loading = false } = props;
  const fetching = refreshing || loading;
  const categoryId = _.get(route, "params.categoryId");
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const goCategoryScreen = () => navigation.navigate("categories")
  const posts = rootStore.postStore.posts;
  const fetchPosts = useCallback(async () => {
    if (!fetching) {
      await rootStore.postStore.getPosts({ categoryId });
    }
  }, [categoryId, fetching]);

  const handleLoadMore = useCallback(async () => {
    if (!fetching) {
      await rootStore.postStore.loadMorePosts();
    }
  }, [categoryId, fetching]);

  const renderFooter = useCallback(() => {
    if (loading) return <ContentPlaceholder></ContentPlaceholder>;
    return null;
  }, [loading]);

  useEffect(() => {
    fetchPosts();
  }, [categoryId])

  const renderItem = useCallback((props) => {
    return <PostCard key={props.item.id} {...props} />;
  }, []);

  return (
    <View style={FULL}>
      <Header
        headerTx="demoScreen.howTo"
        leftIcon={categoryId ? "back" : "menu"}
        onLeftPress={categoryId ? goBack : goCategoryScreen}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <FlatList
        data={posts}
        onRefresh={fetchPosts}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={10}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
})
