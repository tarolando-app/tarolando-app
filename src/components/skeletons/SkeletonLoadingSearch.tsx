import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "@rneui/themed";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function SkeletonLoadingSearch({ size, color }: any) {
  return (
    <View>
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 12, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={70}
      />
    </View>
  );
}
