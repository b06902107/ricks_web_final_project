import React, { useState, useEffect } from "react";
import Layout from "../../components/Class/chosenCourse";
import agent from "../../agent";
function ChosenCourse() {
  const [yourCourse, setYourCourse] = useState([]);
  const getCourse = async () => {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const params = {
      email: user.email,
    };
    try {
      const {data} = await agent.Class.chosenCourse(params);
      if(data.success){
          setYourCourse(data.data)
      }
    } catch (err) {
      console.log(err);
      throw err
    }
  };

  useEffect(() => {
    getCourse()
  },[])
  return <Layout yourCourse={yourCourse}/>;
}

export default ChosenCourse;
