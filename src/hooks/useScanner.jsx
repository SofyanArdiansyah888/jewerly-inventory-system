import { useEffect, useState } from "react";
import useAlert from "./useAlert";
const { ipcRenderer  } = window.require('electron');

export default function useScanner(){
    const [rfids, setRfids] = useState([])
    const { setAlert } = useAlert();

    useEffect(() => {
      ipcRenderer.send('net-open');
  
      ipcRenderer.on('net-data',(_,{data}) => {
        if(data){
            setRfids(data)
        }

   
          
      });
  
      ipcRenderer.on('net-status',(_,data) => {
        console.log(data)
        if(!data){
          setAlert('Scanner Not Detected !','error')
        }
      });
  
      () => ipcRenderer.on('net-close');
      
    },[])

    return rfids
}