import React, { useEffect, useState } from "react";

import { Button, PermissionsAndroid, StyleSheet, Text, TextInput, View } from 'react-native'
import MapView , {PROVIDER_GOOGLE , Marker} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';

export default App  = ()=>{
  const [latitude,setlatitude] = useState(37.78825);
  const [longitude,setlongitude] = useState(-122.4324);
  const [location,setlocation] = useState({longitude:-122.4324,
                                                latitude:37.78825})
  

  useEffect(()=>{
   
    getPermission().then(()=>{
      Geolocation.getCurrentPosition(
          (position) => {
             // console.log(position);
             // setlatitude(position.coords.latitude)
            //  setlongitude(position.coords.longitude)
              
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
            })
        },[])


  

        const getPermission = async ()=>{
          await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
             
              )
             
              
            }
            
            
            return(
              <View>
              <MapView
      provider={PROVIDER_GOOGLE}
      style={{width:'100%',height:'75%'}}
      region={{
        latitude: latitude,
        longitude: longitude,
        // latitude: latitude,
        // longitude: longitude,
        latitudeDelta: 0.0150,
        longitudeDelta: 0.0121,
      }}
      >
<Marker
  coordinate={{  latitude: latitude,
    longitude: longitude,}}
 // image={{uri: 'custom_pin'}}
/>
 </MapView>
 <View style={{width:"100%",justifyContent:'center',alignItems:'center',backgroundColor:'#ccc'}}>
  <TextInput onChangeText={(text)=>{setlocation((prev)=>({...prev,latitude:text}))}} placeholder="latitude" style={{width:'80%',height:55,borderWidth:1,borderColor:'black',padding:15,borderRadius:8,margin:15}}/>
  <TextInput onChangeText={(text)=>{setlocation((prev)=>({...prev,longitude:text}))}} placeholder="longitude" style={{width:'80%',height:55,borderWidth:1,borderColor:'black',padding:15,borderRadius:8,marginBottom:10}}/>
  <Button title="Update location" onPress={()=>{
    
    setlatitude(parseFloat(location.latitude))
    setlongitude(parseFloat(location.longitude))
    
    
  }} />
 </View>
    
</View>
    

  )
}
const styles = StyleSheet.create({
 
});