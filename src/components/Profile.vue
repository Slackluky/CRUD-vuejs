<template>
  <div class="container">
    <b-card class="profile">
      <b-row>
        <b-col lg="4" md="6" sm="10">
          <b-avatar
            src="https://placekitten.com/300/300"
            size="8rem"
          ></b-avatar>
        </b-col>
        <b-col lg="4" md="6" sm="10">
          <b-card-text>
            <p>Username : {{ userProfile.username }}</p>
            <p>Email :{{ userProfile.email }}</p>
            <p>Joined at:{{ userProfile.createdAt }}</p>
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
    <b-row v-if="contents">
      <b-col
        lg="4"
        md="6"
        sm="10"
        :key="content.id"
        v-for="content in contents"
      >
        <b-card
          tag="article"
          style="max-width: 30rem;"
          class="content-card mb-2"
          v-on:mouseleave="content.hover = false"
          v-on:mouseover="content.hover = true"
          @click="Navigate(content.id)"
        >
          <b-card-title>{{ content.post_title }}</b-card-title>
          <b-card-text>
            <p v-if="content.post_content.length < 180">
              {{ content.post_content }}
            </p>
            <p v-else>
              {{ content.post_content.substring(0, 150) + "..." }}
            </p>
          </b-card-text>
          <template v-slot:footer style="background-color: #e4985a !important;">
            <transition name="fade">
              <b-button
                v-if="content.hover"
                variant="danger"
                @click="deleteModal(content.id)"
                size="sm"
              >
                delete</b-button
              >
            </transition>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <div v-else>MOT</div>
    <div class="additional">
      <b-button v-if="myPosts.id_b >= 0 && loggedIn" @click="handleShowMore"
        >More</b-button
      >
      <div v-else>nothing</div>
    </div>
  </div>
</template>

<script>
import contentService from "../services/content.service";
import Content from "../models/content";
import swal from "sweetalert";
export default {
  name: "Profile",
  data() {
    return {
      post: new Content("", ""),
      contents: [],
      message: "",
      myPosts: {
        id_a: "",
        id_b: ""
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    userProfile() {
      return this.$store.state.auth.user;
    }
  },

  mounted() {
    contentService.getMaxId().then(response => {
      this.myPosts.id_a = response.data.maxid + 1;
      this.myPosts.id_b = this.myPosts.id_a - 9;
      this.initialPosts();
    });
  },

  methods: {
    Navigate: async function(coId) {
      await this.$router.push(`/postdetail/` + coId);
    },
    deleteModal: function(contentId) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(dele => {
        if (dele) {
          this.handleDelete(contentId);
        }
      });
    },
    getMyPosts: async function() {
       await contentService.getMyPosts(this.myPosts).then(response => {
        this.contents.push(...response.data);
         this.contents.forEach(content => {
          this.$set(content, "hover", false);
        });
      });
    },
    initialPosts: async function() {
       await contentService.getMyPosts(this.myPosts).then(response => {
        this.contents = response.data;
         this.contents.forEach(content => {
          this.$set(content, "hover", false);
        });
      });
    },
    handleShowMore: function() {
      this.myPosts.id_a = this.myPosts.id_b - 1;
      if (this.myPosts.id_b > 0) {
        this.myPosts.id_b = this.myPosts.id_b - 9;
      } else {
        (this.myPosts = false), (this.myPosts.id_b = 0);
      }
      this.getMyPosts();
    },
    getId: function() {
      this.post.userId = this.$store.state.auth.user.id;
    },

    handleDelete: async function(contentId) {
      const { data } = await contentService.deleteContent({
        id: contentId
      });
      if (data.status == 200) {
        const findId = this.contents.findIndex(x => x.id === contentId);
        if (findId > -1) {
          this.contents.splice(findId, 1);
        }
      }
    },
    handleEdit: function(id) {
      this.$router.push(`/edit/` + id);
    }
  }
};
</script>
<style scoped>
/* always present */
.expand-transition {
  transition: all 0.3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter,
.expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
.mb-2 {
  height: 240px;
}

.additional {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}

.profile {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 20px;
}

.card-footer {
  border-top: white;
  background-color: #e4985a !important;
}

.alert {
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
