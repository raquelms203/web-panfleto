import React, { useEffect, useState } from "react";
import { apiStates }  from "../../services/api";



export default function Dashboard() {  

  const [cities, setCities] = useState([]);

  useEffect(() => { 
    const names = [];
    const response = apiStates.get().then(response => {  
      response.data.map((item => {  
        names.push(item.nome);
      }));
      
    });
    setCities(names);
    console.log(cities);
    
  }, []);

 

  return (  
    <div style={{background: "#000" , height: "400px"}}></div>
  )
}