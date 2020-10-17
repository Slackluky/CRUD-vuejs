<template>
  <b-container class="container-login">
    <b-row class="baris align-items-center">
      <b-col lg="6" class="no-gutters pull-right">
        <b-form class="sform " @submit.prevent="handleLogin">
          <h1 class="title">Login!</h1>
          <b-form-group>
            <b-form-input
              required
              placeholder="Username"
              v-model="user.username"
              name="username"
              v-bind:class="{
                'form-control': true,
                'is-invalid': !validUsername(user.username) && usernameBlured,
                'is-valid': validUsername(user.username) && usernameBlured
              }"
              v-on:blur="usernameBlured = true"
            >
              ></b-form-input
            >
            <b-form-invalid-feedback
              >A username at least of 4 characters is
              required</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group>
            <b-form-input
              required
              type="password"
              placeholder="Password"
              v-model="user.password"
              name="password"
              v-bind:class="{
                'form-control': true,
                'is-invalid': !validPasswd(user.password) && passwdBlured,
                'is-valid': validPasswd(user.password) && passwdBlured
              }"
              v-on:blur="passwdBlured = true"
            >
            </b-form-input>
            <b-form-invalid-feedback
              >A valid password must be at least 8
              digits</b-form-invalid-feedback
            >
          </b-form-group>
          <b-button pill type="submit" class="mx-auto" variant="primary">
            <p v-if="!isLoading">
              Login
            </p>
            <b-spinner small v-else label="Loading..."></b-spinner>
          </b-button>
        </b-form>
        <b-alert show variant="danger" v-if="message" role="alert">
          {{ message.message }}
        </b-alert>
      </b-col>

      <b-col lg="6">
        <div class="join align-items-center">
          <div class="sform">
            <h2>Join with us</h2>
            <b-button
              pill
              component="router-link"
              to="/register"
              class="button-daftar"
              variant="light"
              >Register</b-button
            >
          </div>
        </div>
      </b-col>
    </b-row>
    <modal />
  </b-container>
</template>

<script>
import User from "../models/user";
export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      usernameBlured: false,
      passwdBlured: false,
      valid: false,
      message: "",
      isLoading: false
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    showModal() {
      return this.$store.state.user.modal.isShow;
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    goingIn: function() {
      setTimeout(() => {
        this.$router.push("/");
        location.reload();
      }, 3000);
    },
    validate: function() {
      this.usernameBlured = true;
      this.passwdBlured = true;
      if (
        this.validUsername(this.user.username) &&
        this.validPasswd(this.user.password)
      ) {
        this.valid = true;
      } else this.valid = false;
    },
    validPasswd: function() {
      var reg = /^.{8,}$/;
      return reg.test(this.user.password);
    },
    validUsername: function() {
      var re = /^.{4,}$/;
      return re.test(this.user.username);
    },

    async handleLogin() {
      this.validate();
      if (this.valid) {
        this.isLoading = true;
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$store.dispatch("user/modalShow", {
              image: "unauthorized",
              timer: 3000
            });

            this.goingIn();
          },
          error => {
            console.log({ error });
            this.isLoading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.join {
  background-image: url("~@/assets/bg.jpg");
  width: 100%;
  min-height: 500px;
  display: flex;
  border-radius: 0 20px 20px 0;
  border: none;
}
.button-daftar {
  margin: 0;
  color: #007bff;
  margin: 0 auto;
}
.col-lg-6 {
  padding-right: 0;
}
input {
  font-size: 11pt;
  border-radius: 75px;
  border: none;
  -webkit-box-shadow: 11px 15px 39px -13px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 11px 15px 39px -13px rgba(0, 0, 0, 0.35);
  box-shadow: 11px 15px 39px -13px rgba(0, 0, 0, 0.35);
}

@media (max-width: 1023.98px) {
  .col-lg-6 {
    padding-right: 15px;
  }
  input {
    border: #007bff solid 1px;
  }
  .join {
    width: 100%;
    min-height: 20vh;
    display: flex;
    margin-top: 20px;
    border-radius: 0 0 20px 20px;
  }
}
</style>
