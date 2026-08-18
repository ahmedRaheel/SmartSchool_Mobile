import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { DashboardScreen } from "../screens/DashboardScreen";
import { StudentsScreen } from "../screens/StudentsScreen";import { ModulesScreen } from "../screens/ModulesScreen";import { AiScreen } from "../screens/AiScreen";import { ProfileScreen } from "../screens/ProfileScreen";import { theme } from "../theme/theme";
const Tab=createBottomTabNavigator();
const icons:Record<string,keyof typeof Ionicons.glyphMap>={Home:"home-outline",Students:"people-outline",Modules:"grid-outline",AI:"sparkles-outline",Profile:"person-outline"};
export function MainTabs(){return <Tab.Navigator screenOptions={({route})=>({headerShown:false,tabBarActiveTintColor:theme.colors.primary,tabBarInactiveTintColor:theme.colors.muted,tabBarStyle:{height:66,paddingTop:7,paddingBottom:8},tabBarIcon:({color,size})=><Ionicons name={icons[route.name]} color={color} size={size}/>})}><Tab.Screen name="Home" component={DashboardScreen}/><Tab.Screen name="Students" component={StudentsScreen}/><Tab.Screen name="Modules" component={ModulesScreen}/><Tab.Screen name="AI" component={AiScreen}/><Tab.Screen name="Profile" component={ProfileScreen}/></Tab.Navigator>}
