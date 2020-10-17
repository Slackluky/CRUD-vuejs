<template>
  <div>
    <b-container>
      <b-card
        style="max-width: 600px; margin: 0 auto; margin-top: 50px; position: relative; "
      >
        <div v-if="isEditing">
          <b-form @submit.prevent="handlePost">
            <b-form-group label="What's all about?">
              <b-form-input
                name="post_title"
                v-model="post_title"
                required
                :value="content.post_title"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="What's in your mind?:"
              label-for="input-2"
            >
              <b-form-textarea
                name="post_content"
                v-model="post_content"
                required
                :value="content.post_content"
              >
              </b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </div>
        <div v-else>
          <p>{{ content.post_title }}</p>
          <p>{{ content.post_content }}</p>
          <p>{{ content.updatedAt }}</p>
        </div>
        <div v-if="userProfile.id === content.userId">
          <b-button @click="editMode()">{{ editBtn }}</b-button>
        </div>
      </b-card>
      <modal/>
    </b-container>
  </div>
</template>
<script type="text/javascript">
import contentService from "../services/content.service";
export default {
  name: "PostDetail",
  data() {
    return {
      edit: {},
      post_title: "",
      post_content: "",
      idPost: "",
      isEditing: false,
      content: "",
      editBtn: "Edit",
      user_id: ""
    };
  },
  computed: {
    userProfile() {
      if (this.$store.state.auth.user) return this.$store.state.auth.user;
      else return 0;
    }
  },
  mounted() {
    contentService.getPost(this.$route.params.id).then(response => {
      this.content = response.data;
      console.log(this.content);
    });
  },
  methods: {
    editMode() {
      if (!this.isEditing) {
        this.isEditing = true;
        this.post_title = this.content.post_title;
        this.post_content = this.content.post_content;
        this.editBtn = "Cancel";
      } else {
        this.isEditing = false;
        this.editBtn = "Edit";
      }
    },
    handlePost: async function() {
      await contentService
        .editContent({
          post_title: this.post_title,
          post_content: this.post_content,
          idPost: parseInt(this.$route.params.id)
        })
        .then(response => {
          if (response.data) {
            this.content.post_title = this.post_title;
            this.content.post_content = this.post_content;
            this.editBtn = "Edit";
            this.isEditing = false;
          this.$store.dispatch("user/modalShow", {
            image: "success",
            timer: 3000
          });
          } else {
            console.log("salah");
          }
        });
    }
  }
};
</script>
