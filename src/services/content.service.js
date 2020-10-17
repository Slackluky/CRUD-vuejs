import authHeader from "./auth-header";
const API_URL = "http://localhost:8088/api/";
import api from "../services/api";

class contentService {
  postContent(post) {
    return api.post(
      API_URL + "post",
      {
        post_title: post.post_title,
        post_content: post.post_content,
        userId: post.userId
      },
      { headers: authHeader() }
    );
  }

  editContent(edit) {
    return api.put(
      API_URL + "post/edit",
      {
        id : edit.idPost,
        post_title: edit.post_title,
        post_content: edit.post_content
      },
      { headers: authHeader() }
    );
  }

  async getSomePosts(postsRange) {
    return api.post(`${API_URL}post/some`, {
      postsRange
    });
  }

  async getMyPosts(myPosts) {
    return api.post(
      `${API_URL}content/mine`,
      {
        myPosts
      },
      { headers: authHeader() }
    );
  }
  async deleteContent(delreq) {
    return api.post(
      `${API_URL}post/delete`,
      {
        delreq
      },
      { headers: authHeader() }
    );
  }

  async getMaxId() {
    return api.get(`${API_URL}content/maxid`, { headers: authHeader() });
  }
  async getPost(id) {
    return api.get(`${API_URL}post/` + id);
  }
}

export default new contentService();
