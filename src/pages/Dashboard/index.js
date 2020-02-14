import React, { useEffect, useState, useCallback } from "react";
import { apiStates }  from "../../services/api";



export default function Dashboard() {  

  const [cities, setCities] = useState([]);

  const fetchCities = useCallback(
    async () => {
      if(cities.length === 0) {
        const response = await apiStates.get();
        const names = response.data.map(item =>   
          item.nome
        );
        setCities(names);
      }
    
    },
    [cities],
  );

  useEffect(() => { 
   
   fetchCities();
  
  }, [fetchCities]);

 
 

  return (<div style={{height: "400px"}}>{cities.length}</div>)


}