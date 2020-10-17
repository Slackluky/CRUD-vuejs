import api from "./api";
import store from "../store";
import router from "../router";
const interceptor = api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    switch (error.response.status) {
      case 400:
        break;

      case 401:
        store.dispatch("user/modalShow", {
          image: "unauthorized",
          timer: 3000,
          title: "Unauthoized",
        });
        store.dispatch("auth/logout");
        router.push(`/login/`);
        break;
      case 403:
        store.dispatch("user/modalShow", {
          image: "Forbidden",
          title: "Forbidden",
          timer: 3000
        });
        store.dispatch("auth/logout");
        router.push(`/login/`);
        break;
      case 404:
        store.dispatch("user/modalShow", {
          image: "404"
        });
        break;
      case 502:
        setTimeout(() => {
          store.dispatch("user/modalShow", {
            image: "404"
          });
        }, 1000);
    }
    return Promise.reject(error.response);
  }
);

export default interceptor;
