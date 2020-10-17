const initialState = {
  isShow: false,
  image: "success",
  title: "Success!",
  timer: 1000
};
export const user = {
  namespaced: true,
  state: initialState,

  actions: {
    modalShow({ commit }, modal) {
      commit("modalShow", modal);
    },
    modalStop({ commit }) {
      commit("modalStop");
    }
  },

  mutations: {
    modalShow(state, modal) {
      state.isShow = true;
      state.image = modal.image;
      state.title = modal.title;
      if (modal.timer) {
        state.timer = modal.timer;
        setTimeout(() => {
          state.isShow = false;
        }, modal.timer);
      } else state.isShow = true;
    },
    modalStop(state) {
      state.isShow = false;
      state.image = "";
    }
  }
};
