import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens

import HomeScreen from "./Navigation/Screens/HomeScreen";
import CreateInvoiceScreen from "./Navigation/Screens/CreateInvoiceScreen";
import InvoiceScreen from "./Navigation/Screens/InvoiceScreen";
import SettingsScreen from "./Navigation/Screens/SettingsScreen";

const homeName = "Home";
const createInvoiceName = "Create Invoice";
const invoiceName = "Invoice";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === createInvoiceName) {
              iconName = focused ? "create-invoice" : "create-outline";
            } else if (rn === invoiceName) {
              iconName = focused ? "invoice" : "document-text-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={createInvoiceName} component={CreateInvoiceScreen} />
        <Tab.Screen name={invoiceName} component={InvoiceScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
