import axios from "axios";

const API_URL = "http://localhost:8088/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    axios.defaults.headers.common = {
      Authorization: undefined
    };
  }

  async register(user) {
    return axios.post(
      API_URL + "signup",
      {
        username: user.username,
        email: user.email,
        password: user.password
      },
      { timeout: 60000 }
    );
  }
}

export default new AuthService();
