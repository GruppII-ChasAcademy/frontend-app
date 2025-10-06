import { Text, View, StyleSheet, ScrollView } from "react-native";
import Button from "../components/Button";
import { exitIcon } from "../components/icons";
import Dialog from "../components/Dialog";

function ScanScreen() {
  return (
    <ScrollView>
      <Text>ScanScreenbajs</Text>{" "}
      <View>
        <Text>HomeScreenHej</Text>
        <Text>Button Showcase</Text>
        <View>
          <Text>primary</Text>
          <View>
            <Button variant="primary">Primary</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </View>
        </View>
        <View>
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
                <Button
                  variant="icon"
                  icon={exitIcon(34)}
                  onPress={close}
                ></Button>
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
        <View>
          <Text>outline</Text>
          <View>
            <Button variant="outline">Outline</Button>
          </View>
        </View>
        <View>
          <Text>ghost</Text>
          <View>
            <Button variant="ghost">Ghost</Button>
          </View>
        </View>
        <View>
          <Text>icon</Text>
          <View>
            <Button variant="icon" icon={exitIcon(24)} />
            <Button variant="icon" icon={exitIcon(60)} />
          </View>
        </View>
        <View>
          <Text>card</Text>
          <View>
            <Button variant="card">
              <Text>Card content</Text>
            </Button>
          </View>
        </View>
        <View>
          <Text>profile</Text>
          <View>
            <Button variant="profile">
              <Text>AB</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ScanScreen;
