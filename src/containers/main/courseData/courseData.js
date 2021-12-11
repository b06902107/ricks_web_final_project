import { Paper, FormGroup } from "@material-ui/core";
import agent from "../../../agent";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
const queryString = require("query-string");

function CourseData(props) {
  let history = useHistory();
  const location = useLocation();
  const [theclass, setClass] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentInfo, setDepartmentInfo] = useState([]);
  useEffect(() => {
    const params = queryString.parse(location.search);
    setClass(params.className);
    setDepartment(params.departmentName);
    console.log(params.className);
    handleDepartment(params.className);
  }, [location.search]);

  const handleDepartment = async (className) => {
    const params = {
      className: className,
    };
    try {
      const { data } = await agent.Group.getGroups(params);
      if (data.success) {
        setDepartmentInfo(data.data);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <body>
      <div className="container-fluid">
        <section className="home-title">Course Information</section>
        <div className="courseName">Course: {theclass}</div>
        <div className="teacherName">Department：{department}</div>
        <div className="row">
          {departmentInfo &&
            departmentInfo.map((item, index) => {
              return (
                <div className="col-3 chosen-main">
                  <Paper className="chosen-block">
                    <section className="chosen-subtitle">組員:</section>
                    {item.member.map((mem) => {
                      return (
                        <div className="chosen-member">{mem.name}</div>
                      );
                    })}
                    <a
                      href={`/GroupInfo?id=${item.id}&name=${theclass}`}
                      className="more"
                    >
                      More...
                    </a>
                  </Paper>
                </div>
              );
            })}
        </div>
      </div>
    </body>
  );
}

export default CourseData;
