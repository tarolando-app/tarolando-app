import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons"; // Ícone de check
import { Skeleton } from "@rneui/themed"; // Importando o Skeleton
import { fetchSuggestedImage } from "../services/googleService";
import TextGeneric from "./TextGeneric";

export default function PhotoSelect({
  googlePlacesImages = [],
  onSelected,
}: any) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingMap, setLoadingMap] = useState<string[]>([]);
  const [suggestedImages, setSuggestedImages] = useState([]);
  const [showGoogleImages, setShowGoogleImages] = useState(true);
  const [hideGoogleButton, setHideGoogleButton] = useState(false);

  const startImages = (suggested = []) => {
    console.log(googlePlacesImages.length);
    if (googlePlacesImages.length > 0) {
      const firstImage = googlePlacesImages[0];
      setHideGoogleButton(false);
      setShowGoogleImages(true);
      handleSelect(firstImage, true);
    } else {
      const firstImage = suggested[0];
      console.log(firstImage);
      setHideGoogleButton(true);
      setShowGoogleImages(false);
      handleSelect(firstImage, false);
    }
  };

  const getSuggestedImages = async () => {
    const response = await fetchSuggestedImage();
    setSuggestedImages(response.data);
    startImages(response.data);
  };

  useEffect(() => {
    getSuggestedImages();
  }, []);

  const handleSelect = (item: any, isGoogle: boolean) => {
    const selected = {
      id: isGoogle ? item.googlePlaceImageId : item?.suggestedImageId,
      urlImage: item?.urlImage,
      isGoogle,
    };
    setSelectedImage(selected);
    onSelected && onSelected(selected);
  };

  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  const handleMapImageLoad = (id: string) => {
    setLoadingMap((prev) => prev.filter((imgId) => imgId !== id));
  };

  const handleMapImageLoading = (id: string) => {
    setLoadingMap((prev) => [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: 180, borderRadius: 10 }}
        source={{
          uri: selectedImage?.urlImage,
        }}
        onLoad={handleImageLoad}
      />

      {!hideGoogleButton && (
        <View style={styles.buttonContainer}>
          <Button
            title="Google"
            onPress={() => setShowGoogleImages(true)}
            color={showGoogleImages ? "#4DC2FF" : "#ccc"} // Cor diferente para indicar a seleção
          />
          <Button
            title="Sugeridas"
            onPress={() => setShowGoogleImages(false)}
            color={!showGoogleImages ? "#4DC2FF" : "#ccc"}
          />
        </View>
      )}

      {showGoogleImages && (
        <>
          <View style={styles.suggestedLabel}>
            <TextGeneric>Imagens do Google</TextGeneric>
          </View>
          <View style={styles.images}>
            {googlePlacesImages.map((item: any) => {
              const isSelected =
                selectedImage?.id === item.googlePlaceImageId &&
                selectedImage.isGoogle;
              const isLoading = loadingMap.includes(item.googlePlaceImageId);
              return (
                <View
                  key={item.googlePlaceImageId}
                  style={{ flex: 0.3, minWidth: 100 }}
                >
                  <TouchableOpacity onPress={() => handleSelect(item, true)}>
                    {isLoading && (
                      <Skeleton
                        style={{ width: "100%", height: 120, borderRadius: 10 }}
                      />
                    )}
                    <Image
                      style={[
                        styles.imageItem,
                        isSelected && styles.selectedImage,
                        { display: isLoading ? "none" : "flex" },
                      ]}
                      source={{ uri: item.urlImage }}
                      onLoadStart={() =>
                        handleMapImageLoading(item.googlePlaceImageId)
                      }
                      onLoad={() => handleMapImageLoad(item.googlePlaceImageId)}
                    />
                    {isSelected && (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="white"
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </>
      )}

      {!showGoogleImages && suggestedImages.length > 0 && (
        <>
          <View style={styles.suggestedLabel}>
            <TextGeneric>Imagens Sugeridas</TextGeneric>
            <TextGeneric style={{ marginTop: 10 }} size={14} weight={300}>
              Se não encontrar a imagem ideal, você pode escolher uma destas
              opções sugeridas.
            </TextGeneric>
          </View>

          <View style={styles.images}>
            {suggestedImages.map((item: any) => {
              const isSelected =
                selectedImage?.id === item.suggestedImageId &&
                !selectedImage.isGoogle;
              return (
                <View
                  key={item.suggestedImageId}
                  style={{ flex: 0.3, minWidth: 100 }}
                >
                  <TouchableOpacity onPress={() => handleSelect(item, false)}>
                    <Image
                      style={[
                        styles.imageItem,
                        isSelected && styles.selectedImage,
                      ]}
                      source={{ uri: item.urlImage }}
                    />
                    {isSelected && (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="white"
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  images: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  imageItem: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  selectedImage: {
    borderColor: "#4DC2FF",
    borderWidth: 2,
  },
  checkIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  suggestedLabel: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold",
  },
});
