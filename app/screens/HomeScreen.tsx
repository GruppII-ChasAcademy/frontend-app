import { Text, View, StyleSheet } from "react-native";
import Button from "../components/Button";
import { exitIcon } from "../components/icons";
import { fontSizes, FontSizes } from "../config/styles";

function HomeScreen() {
  return (
    <View>
      <View style={styles.warningContainer}>
        <Text>Detta ska rendera en varning från sensorerna</Text>
      </View>
      <View style={styles.dashboardContainer}>
        <Text style={styles.heading}>DashBoard</Text>
        <Text>Renderar ut hur många pacakges som skickas</Text>
        <Text>Rendera ut hur många du utlevererat idag</Text>
        <Text>Renderar ut hur många paket du har levererat totalt</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: { fontFamily: "bold", fontSize: fontSizes.lg },
  warningContainer: { backgroundColor: "red" },
  dashboardContainer: { backgroundColor: "lightblue" },
});
export default HomeScreen;
