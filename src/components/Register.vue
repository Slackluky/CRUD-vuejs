<template>
  <b-container class="container-login">
    <b-row class="baris align-items-center flex-row-reverse">
      <b-col lg="6" class="no-gutters pull-right">
        <b-form class="sform " @submit.prevent="handleRegister">
          <h1 class="title">Register!</h1>
          <b-form-group>
            <b-form-input
              required
              name="username"
              placeholder="Username"
              v-model="user.username"
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
              placeholder="Email"
              required
              name="email"
              v-model="user.email"
              v-bind:class="{
                'form-control': true,
                'is-invalid': !validEmail(user.email) && emailBlured,
                'is-valid': validEmail(user.email) && emailBlured
              }"
              v-on:blur="emailBlured = true"
            >
              ></b-form-input
            >
            <b-form-invalid-feedback
              >A valid email is required</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group>
            <b-form-input
              type="password"
              name="password"
              placeholder="Password"
              v-model="user.password"
              v-bind:class="{
                'form-control': true,
                'is-invalid': !validPasswd(user.password) && passwdBlured,
                'is-valid': validPasswd(user.password) && passwdBlured
              }"
              v-on:blur="passwdBlured = true"
            >
            </b-form-input>
            <b-form-invalid-feedback
              >A good password must be between 8 to 15 characters which contain
              at least one numeric digit and a special
              character</b-form-invalid-feedback
            >
          </b-form-group>
          <b-button class="mx-auto" pill type="submit" variant="primary">
            <p v-if="!submitted">
              Register
            </p>
            <b-spinner small v-else label="Loading..."></b-spinner>
          </b-button>
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message.message }}
          </div>
        </b-form>
      </b-col>
      <b-col lg="6">
        <div class="tologin align-items-center">
          <div class="welcome">
            <h2>Already have an account?</h2>
            <b-button
              pill
              component="router-link"
              to="/login"
              class="button-daftar"
              variant="light"
              >Login</b-button
            >
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import User from "../models/user";
export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      usernameBlured: false,
      emailBlured: false,
      passwdBlured: false,
      submitted: false,
      valid: false,
      successful: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    validate: function() {
      this.emailBlured = true;
      this.usernameBlured = true;
      this.passwdBlured = true;
      if (
        this.validEmail(this.user.email) &&
        this.validUsername(this.user.username) &&
        this.validPasswd(this.user.password)
      ) {
        this.valid = true;
      } else this.valid = false;
    },
    validUsername: function() {
      var re = /^.{4,}$/;
      return re.test(this.user.username);
    },

    validEmail: function() {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      return re.test(this.user.email.toLowerCase());
    },
    validPasswd: function() {
      var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
      return reg.test(this.user.password);
    },
    handleRegister: async function() {
      this.message = "";
      this.validate();
      if (this.valid) {
        this.submitted = true;
        await this.$store.dispatch("auth/register", this.user).then(
          data => {
            this.message = data.message;
            this.successful = true;
             this.$store.dispatch("user/modalShow", {
            image: "unauthorized",
            timer: 1000
          }),
          setTimeout(() => {
             this.$router.push("/login");
          }, 1000);
           
          },

         
          error => {
            (this.submitted = false),
              (this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString());
            this.successful = false;
            console.log(this.message);
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.tologin {
  background-image: url("~@/assets/bg.jpg");
  width: 100%;
  min-height: 500px;
  display: flex;
  border-radius: 0 20px 20px 0;
  border: none;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.col-lg-6 {
  padding-left: 0;
}

.button-daftar {
  margin: 0;
  color: #007bff;
  margin: 0 auto;
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
  input {
    border: #007bff solid 1px;
  }
  .col-lg-6 {
    padding-left: 15px;
  }
  .tologin {
    width: 100%;
    min-height: 20vh;
    display: flex;
    margin-top: 20px;
    border-radius: 20px 20px 0 0;
  }
}
</style>
