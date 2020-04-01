
export const requestSuccessInterceptor = config => {  
  const token = localStorage.getItem("token");

  if(token) {  
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;

};

// const responseErrorInterceptor = (error: AxiosError) => {
//   if (error.response && error.response.status === 401) {
//     localStorage.clear();
//     window.location.href = '/';
//   }
//   return error;
// };
