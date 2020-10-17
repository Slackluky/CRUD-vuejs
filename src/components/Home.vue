<template>
  <div>
    <b-container class="container-home">
      <b-card class="new-form">
        <div v-if="loggedIn">
          <b-form @submit.prevent="handlePost">
            <b-form-group label="What's all about?">
              <b-form-input
                name="post_title"
                v-model="post.post_title"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="What's in your mind?:"
              label-for="input-2"
            >
              <b-form-textarea
                name="post_content"
                v-model="post.post_content"
                required
                placeholder="Enter name"
              >
              </b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </div>
        <div class="alert" v-else>
          Login to join the community
          <b-button component="router-link" to="/login">Login</b-button>
        </div>
        <p>{{ message }}</p>
      </b-card>
      <b-row>
        <b-col
          lg="4"
          md="6"
          sm="10"
          :key="content.id"
          v-for="content in contents"
        >
          <b-card
            tag="article"
            class="content-card"
            @click="Navigate(content.id)"
          >
            <b-card-title>
              <p v-if="content.post_title.length < 12">
                {{ content.post_title }}
              </p>
              <p v-else>
                {{ content.post_title.substring(0, 12) + "..." }}
              </p>
            </b-card-title>
            <b-card-text>
              <p v-if="content.post_content.length < 180">
                {{ content.post_content }}
              </p>
              <p v-else>
                {{ content.post_content.substring(0, 180) + "..." }}
              </p>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <div class="additional">
        <b-button
          v-if="postsRange.id_b >= 0 && loggedIn"
          @click="handleShowMore"
          >More</b-button
        >
        <p v-else>Nothing</p>
        <modal />
      </div>
    </b-container>
  </div>
</template>

<script type="text/javascript">
import contentService from "../services/content.service";
import Content from "../models/content";
export default {
  name: "Home",
  data() {
    return {
      post: new Content("", ""),
      contents: [],
      message: "",
      isMorePosts: true,
      postsRange: {
        id_a: "",
        id_b: ""
      },
      isModalVisible: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    contentService.getMaxId().then(response => {
      this.postsRange.id_a = response.data.maxid + 1;
      this.postsRange.id_b = this.postsRange.id_a - 9;
      this.initialPosts();
    });
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    timeModal() {
      this.isModalVisible = true;
      setTimeout(() => {
        this.isModalVisible = false;
      }, 2000);
    },
    initialPosts: async function() {
      await contentService.getSomePosts(this.postsRange).then(response => {
        this.contents = response.data;
      });
    },
    Navigate: async function(coId) {
      await this.$router.push(`/postdetail/` + coId);
    },
    handleShowMore: function() {
      this.postsRange.id_a = this.postsRange.id_b - 1;

      if (this.postsRange.id_b > 0) {
        this.postsRange.id_b = this.postsRange.id_b - 9;
      } else {
        (this.isMorePosts = false), (this.postsRange.id_b = 0);
      }
      this.getPosts();
    },
    getId: function() {
      this.post.userId = this.$store.state.auth.user.id;
    },
    getPosts: async function() {
      // const data =
      await contentService.getSomePosts(this.postsRange).then(response => {
        this.contents.push(...response.data);
      });
    },

    handlePost: async function() {
      this.getId();
      await contentService.postContent(this.post).then(response => {
        if (response.data.post) {
          this.contents.unshift(response.data.post);
          this.post.post_title = "";
          this.post.post_content = "";
          this.$store.dispatch("user/modalShow", {
            image: "success",
            title: "Success!",
            timer: 3000
          });
        } else {
          console.log("salah");
        }
      });
    },
    handleEdit: function(id) {
      this.$router.push(`/edit/` + id);
    }
  }
};
</script>
<style scoped>
.full-image {
  width: 100%;
  height: 100vh;
  padding-right: 0;
  padding-left: 0;
}

.card-title {
  font-family: "Bellerose";
  font-size: 40px;
  margin-bottom: 1.5rem;
}

.additional {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}

.new-form {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: #8bafa5;
  border: white 1px;
  -webkit-box-shadow: 10px 10px 0px 0px rgb(232, 120, 44);
  -moz-box-shadow: 10px 10px 0px 0px rgb(232, 120, 44);
  box-shadow: 10px 10px 0px 0px rgb(232, 120, 44);
}

.alert {
  text-align: center;
}

@media (max-width: 1023.98px) {
  .col-sm-10 {
    margin: 0 auto;
  }
}
</style>
