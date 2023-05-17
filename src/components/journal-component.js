import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JournalService from "../services/journal.service";

const JournalComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [journalData, setJournalData] = useState(null);
  useEffect(() => {
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    if (currentUser.user.role == "admin") {
      JournalService.get(_id)
        .then((data) => {
          console.log(data);
          setJournalData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role == "user") {
      window.alert("You are not allow to see journals");
      // CourseService.getEnrolledCourses(_id)
      //   .then((data) => {
      //     console.log(data);
      //     setCourseData(data.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login before seeing your journals.</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "admin" && (
        <div>
          <h1>Welcome to admin page.</h1>
        </div>
      )}
      {/* {currentUser && currentUser.user.role == "user" && (
        <div>
          <h1>Welcome !</h1>
        </div>
      )} */}
      {currentUser && journalData && journalData.length != 0 && (
        <div>
          <p>Here's the data we got back from server.</p>
          {journalData.map((journal) => (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{journal.title}</h5>
                <p className="card-text">{journal.description}</p>
                {/* <p>Student Count: {course.students.length}</p> */}
                {/* <button className="btn btn-primary">{course.price}</button> */}
                <br />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalComponent;
