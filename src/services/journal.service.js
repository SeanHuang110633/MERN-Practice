import axios from "axios";
const API_URL = "http://localhost:8080/api/journal";

class JournalService {
  post(title, description) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { title, description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // getEnrolledCourses(_id) {
  //   let token;
  //   if (localStorage.getItem("user")) {
  //     token = JSON.parse(localStorage.getItem("user")).token;
  //   } else {
  //     token = "";
  //   }

  //   return axios.get(API_URL + "/student/" + _id, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   });
  // }

  // getCourseByName(name) {
  //   let token;
  //   if (localStorage.getItem("user")) {
  //     token = JSON.parse(localStorage.getItem("user")).token;
  //   } else {
  //     token = "";
  //   }

  //   return axios.get(API_URL + "/findByName/" + name, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   });
  // }

  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/admin/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // enroll(_id, user_id) {
  //   let token;
  //   if (localStorage.getItem("user")) {
  //     token = JSON.parse(localStorage.getItem("user")).token;
  //   } else {
  //     token = "";
  //   }

  //   return axios.post(
  //     API_URL + "/enroll/" + _id,
  //     { user_id },
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   );
  // }
}

export default new JournalService();
