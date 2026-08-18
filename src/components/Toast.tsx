import { StyleSheet,Text,View } from "react-native";import { useApp } from "../app/AppProvider";import { theme } from "../theme/theme";
export function Toast(){const{toast}=useApp();if(!toast)return null;return <View style={s.box}><Text style={s.text}>{toast}</Text></View>}
const s=StyleSheet.create({box:{position:"absolute",left:20,right:20,bottom:20,backgroundColor:theme.colors.navy,padding:14,borderRadius:12},text:{color:"white",fontWeight:"700",textAlign:"center"}})
