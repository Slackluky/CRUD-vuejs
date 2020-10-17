<script>
export default {
  name: "modal",
  data() {
    return {
      image: "success",
      show: false,
      timer: 3000,
    };
  },
  computed: {
    isActive() {
      return this.$store.state.user.isShow;
    },
    cImage() {
      return this.$store.state.user.image;
    },
    cTitle(){
      return this.$store.state.user.title 
    }
  },
  methods: {
    close() {
      this.$store.dispatch("user/modalStop");
    }
  }
};
</script>
<template>
  <transition name="swing-in-top-fw">
    <div v-show="isActive" class="modal-backdrop" @click="close()">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <img v-if="cImage == 'success'" src="../assets/success.png" />
          <img v-if="cImage == 'forbidden'" src="../assets/forbidden.png" />
          <img
            v-if="cImage == 'unauthorized'"
            src="../assets/unauthorized.png"
          />
          <img v-if="cImage == '404'" src="../assets/404.png" />
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            {{cTitle}}
          </slot>
        </section>
        <!-- <footer class="modal-footer">
          <slot name="footer">
            I'm the default footer!

            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close me!
            </button>
          </slot>
        </footer> -->
      </div>
    </div>
  </transition>
</template>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.modal {
  background: transparent;
  /* box-shadow: 2px 2px 20px 1px; */
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  animation: 1s ease 0s jello-horizontal;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.modal-header {
  /* border-bottom: 1px solid #eeeeee; */
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 46pt;
  color: #eeeeee;
  position: relative;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
