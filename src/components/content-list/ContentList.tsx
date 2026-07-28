import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { places } from "./mockData";
import { Row } from "./Row";

function ListHeader() {
  return <Text style={styles.header}>Places in Rome</Text>;
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function ContentList() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlashList
        data={places}
        renderItem={({ item }) => <Row item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
  },
  separator: {
    height: 12,
  },
});
