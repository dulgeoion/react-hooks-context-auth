import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import Cookies from "js-cookie";
// import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);
const ROOT = process.env.REACT_APP_URL;
const API_ROOT = `${ROOT}/api/v1`;
const ADMIN_ROOT = `${ROOT}/api/admin`;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    // authStore.logout();
    console.log(err);
  }
  return err;
};

const responseBody = res => {
  if (res.headers["x-total-count"])
    res.body.__proto__.count = res.headers["x-total-count"];
  return res.body;
};

const tokenPlugin = req => {
  const jwt = Cookies.get("jwt");
  console.log("TCL: jwt", jwt)
  if (jwt) {
    req.set("Authorization", `Bearer ${jwt}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: (url, root = API_ROOT, addCount) =>
    superagent
      .get(`${root}${url}`)
      .use(tokenPlugin)
      .set(
        "Access-Control-Expose-Headers",
        "X-Total-Count,X-Total-count"
      )
      .end(handleErrors)
      .then(res => responseBody(res, addCount)),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  patch: (url, body, root = API_ROOT) =>
    superagent
      .patch(`${root}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  delete: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
};

const Auth = {
  
  current: () => requests.get("/user/me"),
  login: (email, password) =>
    requests.post("/user_token", { user: { email, password } }),
  register: params =>
    requests.post("/registration", {
      user: params
    }),
  verify: token => requests.patch("/users/confirm", { token }),
  save: user => requests.put("/user", { user })
};

const User = {
  get: () => requests.get("/profiles"),
  update: body => requests.patch("/profiles", body),
  getMyArticles: () => requests.get("/profiles/my_posts"),
  getProfile: id => requests.get(`/profiles/${id}`),
  getUsersAdmin: ({limit = 15, offset = 0,search = null}) =>
    requests.get(`/users?limit=${limit}&offset=${offset}${search? `&searh=${search}`: ''}`, ADMIN_ROOT),
  updateAdmin: (id, params) =>
    requests.patch(`/users/${id}}`, params, ADMIN_ROOT)
};

const Words = {
  getAllDialectWords: () => requests.get("/dialect_words"),
  getAllOfficialWords: () => requests.get("/official_words"),
  getWords: search => requests.get(`/words/${search}`),
  saveWordPair: (word, region = false) => {
    if (region) {
      return requests.post("/words/bulk_create", word);
    } else {
      return requests.post("/words", word);
    }
  },
  deleteExactWord: (id, type = "dialect") =>
    requests.delete(
      `/${type === "dialect" ? "dialect_words" : "official_words"}/${id}`
    ),
  bulkDelete: id => requests.delete(`/dialect_words/${id}/bulk_delete`),
  bulkUpdate: (id, body) =>
    requests.patch(`/dialect_words/${id}/bulk_update`, body),
  update: (id, body) => requests.patch(`/dialect_words/${id}`, body),
  updateOfficial: (id, body) => requests.patch(`/official_words/${id}`, body),
  getList: ({
    limit = 10,
    offset = 0,
    verified = null,
    created_at = "asc",
    search = null,
    official_word = false,
    dialect_word = true,
    name=null,
    official=null
  }) =>
    requests.get(
      `/words?limit=${limit}&offset=${offset}&created_at=${created_at}&verified=${verified}&dialect_word=${dialect_word}&official_word=${official_word}${
        search ? `&search=${search}` : ""
      }${
        name ? `&name=${name}` : ""
      }${
        official ? `&official=${official}` : ""
      }`
    ),
  getUsers: (userId, limit = null) =>
    requests.get(`/users/${userId}/words?${limit ? `limit=${limit}` : ""}`),
  getOfficialWordByName: (name) =>  requests.get(`/official_words?name=${name}`),

  
};

const Places = {
  getCities: () => requests.get("/cities"),
  getDistricts: () => requests.get("/districts"),
  getRegions: () => requests.get("/regions"),
  getCity: slug => requests.get(`/cities/${slug}`),
  getDistrict: slug => requests.get(`/districts/${slug}`),
  getRegion: slug => requests.get(`/regions/${slug}`),
  getCitiesTranscription: (name, transcription) =>
    requests.get(
      `/cities/find_by_word?name=${name}&transcription=${transcription}`
    )
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const Articles = {
  all: (page, lim = 10) => requests.get(`/posts`),
  create: payload => requests.post(`/posts`, payload),
  get: slug => requests.get(`/posts/${slug}`),
  update: (id, payload) => requests.patch(`/posts/${id}`, payload),
  delete: id => requests.delete(`/posts/${id}`),
  adminList: ({ title = null, limit = 5, offset = 0 }) =>
    requests.get(
      `/posts?limit=${limit}&offset=${offset}${title ? `&title=${title}` : ""}`,
      ADMIN_ROOT
    ),
  getUsers: userId => requests.get(`/users/${userId}/posts`)
};

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  User,
  Profile,
  Words,
  Places
};
