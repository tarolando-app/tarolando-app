import { StyleSheet, View } from "react-native";
import GradientImage from "../../../components/GradientImage";
import CardWrapper from "../../../components/CardWrapper";
import GradientView from "../../../components/GradientView";
import TextGeneric from "../../../components/TextGeneric";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import SkeletonEventDetail from "../../../components/skeletons/SkeletonEventDetail";

export default function AboutEvent({ event }: any) {
  if (!event) {
    return <SkeletonEventDetail />
  }

  var moment = require("moment/min/moment-with-locales");
  moment.locale("pt-br");

  const formattedStartDate = moment(event.dateAndTime).format(
    "ddd, D MMM • HH[h]"
  );
  const formattedEndDate = moment(event.closingDate).format(
    "ddd, D MMM • HH[h]"
  );

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const [like, setLike] = useState(false);

  return (
    <View style={{ marginTop: 38 }}>
      <View>
        <GradientImage
          height={230}
          width={"100%"}
          url={event.urlCoverPhoto}
          styleImage={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
        ></GradientImage>
        <GradientView height={"auto"} width={"100%"}>
          <View
            style={{
              zIndex: 2,
              padding: 16,
            }}
          >
            <View style={{ ...styles.dFlex }}>
              <TextGeneric size={26}>
                {truncateText(event.name, 20)}
              </TextGeneric>
              <TouchableOpacity
                onPress={() => {
                  setLike(!like);
                }}
              >
                <MaterialCommunityIcons
                  name={like ? "heart" : "heart-outline"}
                  size={32}
                  color={like ? "red" : "#FFF"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.dFlex2, gap: 5, marginTop: 20 }}>
              <MaterialCommunityIcons name="fire" size={26} color={"#f2721c"} />
              <TextGeneric size={16} weight={500}>
                Muitas pessoas demonstraram interesse
              </TextGeneric>
            </View>
            <View style={{ ...styles.dFlex2, gap: 5, marginTop: 20 }}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={26}
                color={"#FFF"}
              />
              <View></View>
              <TextGeneric size={16} weight={500}>
                {truncateText(event.googlePlace.name, 21)}
              </TextGeneric>
              <TextGeneric color="#00A8FF" size={16} weight={600}>
                • {event.distanceInKm} km
              </TextGeneric>
            </View>
            <View style={{ ...styles.dFlex2, gap: 5, marginTop: 20 }}>
              <MaterialCommunityIcons
                name="calendar-outline"
                size={24}
                color={"#FFF"}
              />
              <View></View>
              <TextGeneric color="#00A8FF" size={16} weight={700}>
                {capitalizeFirstLetter(formattedStartDate)} {">"}{" "}
                {capitalizeFirstLetter(formattedEndDate)}
              </TextGeneric>
            </View>
          </View>
        </GradientView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dFlex2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
