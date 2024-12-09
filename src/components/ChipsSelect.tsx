import { Text } from "@rneui/base";
import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import TextGeneric from "./TextGeneric";

import { useState } from "react";

export default function ChipsSelect({
  style,
  text = "",
  items,
  idName,
  multiple = false,
  selectionChange = () => {},
}: any) {
  const [selectedIds, setSelectedIds] = useState<any>(multiple ? [] : null);

  const handleSelect = (item: any) => {
    const itemId = item[idName];

    if (multiple) {
      if (selectedIds?.includes(itemId)) {
        const select = selectedIds.filter((id: any) => id !== itemId);
        setSelectedIds(select);
        selectionChange(select);
      } else {
        const select = [...selectedIds, itemId];
        setSelectedIds(select);
        selectionChange(select);
      }
    } else {
      const select = itemId === selectedIds ? null : itemId;
      setSelectedIds(select);
      selectionChange(select);
    }
  };

  const isSelected = (itemId: any) => {
    return multiple ? selectedIds.includes(itemId) : selectedIds === itemId;
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <TextGeneric weight={500}>{text}teste</TextGeneric>
      <View style={styles.chips}>
        {items.map((item: any) => {
          const itemId = item[idName];
          const selected = isSelected(itemId);

          console.log(item)

          return (
            <TouchableOpacity
              key={itemId}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => handleSelect(item)}
            >
              <TextGeneric color={selected ? "#FFF" : "#D5D6D9"} size={14} weight={500}>
                {item.name}
              </TextGeneric>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  chips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: "#D5D6D9",
    borderWidth: 1,
    borderRadius: 10,
  },
  chipSelected: {
    borderColor: "#4DC2FF",
    backgroundColor: "#00324D",
  },
});
