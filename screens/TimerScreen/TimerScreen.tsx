import moment from "moment";
import React from "react";
import { Text, View, AsyncStorage } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { withTheme } from "react-native-elements";
import { Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import styles from "./styles";
import DeviceStorage from "../../api/DeviceStorage";
import BackgroundTimer from "react-native-background-timer";

const ENCOURAGEMENT_TEXT = "Get ready to fast";

const TYPE_OF_FAST = "Fast Type";
const FAST_PROGRAM = "16 : 8 Fasting Program";
const START_FAST = "Start Fast";

const STOP_FAST = "Stop Fast";

interface Props {
  theme: any;
}
interface State {
  fill: number;
  timeLeft: any;
  fastDuration: number;
  fastStarted: boolean;
}

class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  interval: number = 0;

  state = {
    fill: 0,
    timeLeft: 0,
    fastDuration: 0,
    fastStarted: false
  };

  componentDidMount() {
    this._setFastDuration();
  }

  _setFastDuration = () => {
    const hours = 16;
    this.setState({
      fastDuration: hours * 60 * 60
    });
  };

  _getLastFastTime = () => {
    this.setState({});
  };

  _getLastSavedFastTime = async () => {
    const lastSavedDuration = await DeviceStorage.lastSavedFastDuration();

    if (!lastSavedDuration) return;

    this.setState({ fastDuration: lastSavedDuration });
  };

  _startCountdownTimer = (totalSeconds: number) => {
    console.log(totalSeconds);

    let secondsLeft = totalSeconds;

    BackgroundTimer.runBackgroundTimer(() => {
      if (secondsLeft-- < 0) {
        secondsLeft = totalSeconds;
      }
      console.log("Seconds left is: " + secondsLeft);
      const percentage = (secondsLeft / totalSeconds) * 100;
      console.log(percentage);
      this.setState({
        fill: percentage,
        timeLeft: secondsLeft,
        fastStarted: true
      });
    }, 1000);
  };

  _stopCountdownTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
    this.setState({
      fastStarted: false
    });
  };

  _formattedTime = (totalSeconds: number): string => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  render() {
    const { colors } = this.props.theme;
    const { fill, fastDuration, fastStarted, timeLeft } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.progressSubtitle}>{ENCOURAGEMENT_TEXT}!</Text>
        <Button
          icon="edit"
          mode="outlined"
          color={Colors.Secondary}
          onPress={() => console.log("Pressed")}
          contentStyle={styles.buttonContent}
          style={styles.button}
          theme={this.props.theme}
        >
          {FAST_PROGRAM}
        </Button>
        <AnimatedCircularProgress
          size={200}
          linecap="round"
          width={20}
          rotation={360}
          fill={fill}
          tintColor={Colors.Primary}
          backgroundColor={colors.background}
          style={styles.circularProgress}
        >
          {(fill: any) => (
            <View style={styles.progressChildren}>
              <Text style={styles.progressSubtitle}>
                {fill > 0 ? `Remaining ${Math.floor(fill)}%` : "Current Goal"}
              </Text>
              <Text style={styles.progressTitle}>
                {fill > 0
                  ? this._formattedTime(timeLeft)
                  : `${fastDuration / 60 / 60} hours`}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <Button
          color="#8EA2FF"
          mode="contained"
          onPress={() =>
            fastStarted
              ? this._stopCountdownTimer()
              : this._startCountdownTimer(
                  timeLeft > 0 ? timeLeft : fastDuration
                )
          }
          contentStyle={styles.buttonContent}
          style={styles.button}
          theme={this.props.theme}
        >
          {fastStarted ? STOP_FAST : START_FAST}
        </Button>
      </View>
    );
  }
}

export default withTheme(HomeScreen as any);
