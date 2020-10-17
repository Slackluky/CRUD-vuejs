<template>
  <div id="app">
    <div>
      <b-navbar
        class="fixed-top"
        :class="{ 'navbar--hidden': !showNavbar }"
        toggleable="lg"
        type="dark"
      >
        <b-navbar-brand component="router-link" to="/">Home</b-navbar-brand>

        <b-navbar-toggle
          target="nav-collapse"
          style="z-index: 90; margin-right : 40px"
        >
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content class="pull-right">
                <em v-if="loggedIn">{{ currentUser.username }}</em>
                <em v-else>User</em>
              </template>
              <b-dropdown-item
                v-if="!loggedIn"
                component="router-link"
                to="/login"
              >
                Login</b-dropdown-item
              >
              <b-dropdown-item
                v-if="!loggedIn"
                component="router-link"
                to="/register"
                >Register</b-dropdown-item
              >
              <div v-else>
                <b-dropdown-item href @click.prevent="logOut"
                  >Log Out</b-dropdown-item
                >
                <b-dropdown-item component="router-link" to="/profile"
                  >Profile</b-dropdown-item
                >
              </div>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <transition :name="transitionName" mode="out-in">
      <!-- <img src="./assets/clouds.svg"> -->
      <router-view> </router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
const DEFAULT_TRANSITION = "fade";
export default {
  name: "App",

  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      showNavbar: true,
      lastScrollPosition: 0
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }
};
</script>
<style lang="scss">
@font-face {
  font-family: "Bellerose";

  src: local("Bellerose"), url(./assets/fonts/Bellerose.ttf) format("truetype");
}

@font-face {
  font-family: "Demode-Negative";
  src: local("Demode-Negative"),
    url(./assets/fonts/Demode-Negative.ttf) format("truetype");
}

.navbar {
  padding-right: 40px;
  max-height: 210px;
  width: 100vw;
  margin-right: 20px;
  background: #176b8d;
  position: fixed;
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}

.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
.navbar-brand {
  font-family: "Demode-Negative";
  font-size: 2rem !important;
}
.rounded-pill {
  width: 120px;
  height: 40px;
}

.title {
  margin-bottom: 40px;
}

.baris {
  min-height: 466px;
}

.container-login {
  margin-top: 50px;
  margin-bottom: 50px;
  min-height: 500px;
  max-width: 80%;
  text-align: center;
  border-radius: 20px;
  -webkit-box-shadow: 30px 30px 25px -13px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 30px 30px 25px -13px rgba(0, 0, 0, 0.35);
  box-shadow: 30px 30px 25px -13px rgba(0, 0, 0, 0.35);
  background-color: #f3f3f3;
}

.button-daftar {
  margin: 0;
  color: #007bff;
  margin: 0 auto;
}

.alert {
  margin-top: 20px;
}

.sform {
  position: relative;
  margin: 0 auto;
  max-width: 360px;
  text-align: center;
}

.welcome {
  position: relative;
  margin: 0 auto;
  max-width: 360px;
  text-align: center;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

input {
  font-size: 11pt;
  border-radius: 75px;
  border: none;
  -webkit-box-shadow: 11px 15px 39px -13px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 11px 15px 39px -13px rgba(0, 0, 0, 0.35);
  box-shadow: 11px 15px 39px -13px rgba(0, 0, 0, 0.35);
}
.container-home {
  padding-bottom: 40px;
}

.navbar-dark .navbar-collapse {
  padding-right: 50px;
}

.navbar-dark .navbar-brand {
  color: #fff;
  padding-left: 50px;
}
.col-sm-10 {
  margin-bottom: 40px !important;
}
.content-card {
  height: 300px;
  background-color: #e4985a !important;
  border: white 1px;
  -webkit-box-shadow: 10px 10px 0px 0px rgba(139, 175, 165, 1);
  -moz-box-shadow: 10px 10px 0px 0px rgba(139, 175, 165, 1);
  box-shadow: 10px 10px 0px 0px rgba(139, 175, 165, 1);
  color: white;
  max-width: 30rem;
  cursor: pointer;
}

#app {
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
  background-image: url("./assets/clouds.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.69s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 1, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(0, 6em);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(0, 6em);
}

@media (max-width: 1023.98px) {
  .container-home {
    max-width: 100%;
  }

  .container-login {
    margin-top: 50px;
    text-align: center;
    border-radius: 20px;
    min-height: 40vh;
    background-color: #eddab0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    background-color: none;
  }

  .baris {
    max-height: 466px;
  }

  input {
    font-size: 11pt;
    border-radius: 75px;
    border: #007bff solid 1px;
  }
}
@media (maxwi) {
}
</style>
