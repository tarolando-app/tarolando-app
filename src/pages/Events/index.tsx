import { createStackNavigator } from "@react-navigation/stack";
import EventDetails from "../EventDetails";
import Home from "../Home";

const Stack = createStackNavigator();

export default function EventsRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
