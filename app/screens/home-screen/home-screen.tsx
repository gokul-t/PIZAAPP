import React, { FunctionComponent as Component, useEffect, useState, useCallback } from "react"
import { View, ViewStyle, TextStyle, FlatList, Alert } from 'react-native';
import _ from "lodash";
import { useNavigation } from "@react-navigation/native"
import { BulletItem, Header, Text, Screen, PostCard } from "../../components"
import { ContentPlaceholder } from "../../components"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { observer, useObserver } from "mobx-react-lite"


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
      categoryName: string
    }
  },
  refreshing: boolean,
  loading: boolean
}
export const HomeScreen: Component<HomeScreenProps> = observer(function HomeScreen(props) {
  const { route, refreshing = false, loading = false } = props;
  const fetching = refreshing || loading;
  const categoryId = _.get(route, "params.categoryId")
  const categoryName = _.get(route, "params.categoryName")
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const goCategoryScreen = () => navigation.navigate("categoriesTab")
  const goPostsScreen = (post) => navigation.navigate(categoryId ? "categoryPost" : "posts", {
    postId: post.id,
  })

  const posts = rootStore.postStore.posts;

  const fetchPosts = useCallback(async () => {
    if (!fetching) {
      rootStore.postStore.getPosts({ categoryId });
    }
  }, [categoryId, refreshing, loading]);

  const handleLoadMore = useCallback(async () => {
    if (!fetching) {
      rootStore.postStore.loadMorePosts();
    }
  }, [categoryId, refreshing, loading]);

  const renderFooter = useCallback(() => {
    if (fetching) return <ContentPlaceholder></ContentPlaceholder>;
    return null;
  }, [refreshing, loading]);

  useEffect(() => {
    fetchPosts();
  }, [categoryId])

  const renderItem = useCallback((props) => {
    return <PostCard key={props.item.id} {...props} onPress={() => goPostsScreen(props.item)} />;
  }, []);
  // alert(refreshing)
  // alert(categoryId)
  __DEV__ && console.tron.log("category", categoryId);

  return (
    <View style={FULL}>
      <Header
        headerText={categoryId ? categoryName : "Home"}
        leftIcon={categoryId ? "back" : "menu"}
        onLeftPress={categoryId ? goBack : goCategoryScreen}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <FlatList
        key={categoryId ? categoryName : "Home"}
        data={posts}
        onRefresh={fetchPosts}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={10}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={posts}
      />
    </View>
  );
})
