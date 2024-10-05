import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "@rneui/themed";

export default function SkeletonEventDetail({ size, color }: any) {
  return (
    <View>
      <Skeleton
        style={{ opacity: 0.3, marginTop: 38, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={420}
      />
      <Skeleton
        style={{ opacity: 0.3, marginTop: 24, borderRadius: 10 }}
        animation="wave"
        width={"100%" as any}
        height={340}
      />
    </View>
  );
}
