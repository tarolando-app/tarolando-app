import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "@rneui/themed";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function SkeletonLoadingHome({ size, color }: any) {
  return (
    <View style={{ margin: 15 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Skeleton
          style={{ opacity: 0.3 }}
          animation="wave"
          width={150}
          height={30}
        />

        <Skeleton
          style={{ opacity: 0.3 }}
          animation="wave"
          width={80}
          height={30}
        />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Skeleton
          style={{
            opacity: 0.3,
            marginTop: 20,
            borderRadius: 10,
            marginRight: 20,
          }}
          animation="wave"
          width={240}
          height={230}
        />
        <Skeleton
          style={{
            opacity: 0.3,
            marginTop: 20,
            borderRadius: 10,
            marginRight: 20,
          }}
          animation="wave"
          width={240}
          height={230}
        />
        <Skeleton
          style={{
            opacity: 0.3,
            marginTop: 20,
            borderRadius: 10,
            marginRight: 20,
          }}
          animation="wave"
          width={240}
          height={230}
        />
      </ScrollView>

      <View
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Skeleton
          style={{ opacity: 0.3 }}
          animation="wave"
          width={150}
          height={30}
        />

        <Skeleton
          style={{ opacity: 0.3 }}
          animation="wave"
          width={80}
          height={30}
        />
      </View>

      <Skeleton
        style={{
          opacity: 0.3,
          marginTop: 20,
          borderRadius: 10,
          marginRight: 20,
        }}
        animation="wave"
        width={screenWidth - 30}
        height={110}
      />

      <Skeleton
        style={{
          opacity: 0.3,
          marginTop: 20,
          borderRadius: 10,
          marginRight: 20,
        }}
        animation="wave"
        width={screenWidth - 30}
        height={110}
      />
    </View>
  );
}
