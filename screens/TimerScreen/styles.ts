import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContent: {
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20
  },
  button: {
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 45
  },
  circularProgress: {
    marginTop: 20,
    transform: [{ scaleX: -1 }]
  },
  progressChildren: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scaleX: -1 }]
  },
  progressSubtitle: {
    fontSize: 15,
    color: Colors.brownGrey
  },
  progressTitle: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: "500"
  },
  text: {
    fontSize: 14
  }
});

export default styles;
