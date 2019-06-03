import React from "react";
import { AsyncStorage, Alert } from "react-native";

export default class DeviceStorage {
  static async lastSavedFastDuration() {
    try {
      const item: string | null = await AsyncStorage.getItem("fastTimeLeft");
      return item ? JSON.parse(item) : undefined;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
