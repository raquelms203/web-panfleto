
export const requestSuccessInterceptor = config => {  
  const token = localStorage.getItem("token");

  if(token) {  
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;

};
