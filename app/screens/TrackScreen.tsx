import { Text, View, StyleSheet, ScrollView } from "react-native";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import { exitIcon } from "../components/icons";
import { colors } from "../config/styles";
function TrackScreen() {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text>TrackScreen</Text>
      <Dialog
        closeOnBackdropPress={false}
        enableCloseGesture={false}
        trigger={({ open }) => (
          <Button variant="primary" onPress={open}>
            Visa Modal
          </Button>
        )}
      >
        {({ close }) => (
          <ScrollView>
            <Button variant="icon" icon={exitIcon(34)} onPress={close}></Button>
            <Text>HejHoppTestKnapp</Text>
            <View>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
              <Text>HejHoppTestKnapp</Text>
            </View>
          </ScrollView>
        )}
      </Dialog>
    </View>
  );
}

export default TrackScreen;
