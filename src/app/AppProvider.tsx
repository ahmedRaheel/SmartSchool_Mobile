import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types/models";
type Context={user:User|null;ready:boolean;login:(email:string,password:string)=>Promise<boolean>;logout:()=>Promise<void>;toast:string;notify:(x:string)=>void};
const C=createContext<Context|undefined>(undefined);
const demo:User={id:"1",name:"Raheel Ahmed",email:"admin@smartschool.demo",role:"Admin",initials:"RA"};
export function AppProvider({children}:{children:ReactNode}){
 const[user,setUser]=useState<User|null>(null);const[ready,setReady]=useState(false);const[toast,setToast]=useState("");
 useEffect(()=>{AsyncStorage.getItem("smartschool.user").then(x=>{if(x)setUser(JSON.parse(x));setReady(true)})},[]);
 const value=useMemo<Context>(()=>({user,ready,toast,notify:(x)=>{setToast(x);setTimeout(()=>setToast(""),2200)},login:async(email,password)=>{if(email==="admin@smartschool.demo"&&password==="SmartSchool@2026"){setUser(demo);await AsyncStorage.setItem("smartschool.user",JSON.stringify(demo));return true}return false},logout:async()=>{setUser(null);await AsyncStorage.removeItem("smartschool.user")}}),[user,ready,toast]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export function useApp(){const c=useContext(C);if(!c)throw new Error("AppProvider required");return c}
