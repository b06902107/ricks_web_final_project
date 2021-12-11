import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function HotClass(props) {

  const { college } = props;
  return (
    <div className="col-4 home-block-main">
      <Paper className="home-block">
        <div className="department-name"> {college.name} </div>
        <div className="home-subtitle">Top 5</div>
          {college.hotClass.map((items, index) => {
            return (
              <div className="home-block-item">
                <div className="home-block-label">{index+1}.</div>
                <Link to={"/courseData?className=" + items.className + "&departmentName=" + items.department} className="home-block-link">
                  {items.department} {items.className} 
                </Link>
                <div className="link-right">
                  剩餘 {items.groupNum} 組
                </div>
              </div>
            );
          })}
        <div className="more">
          <a href={`/DepartmentCourse?college=${college.name}`}>More...</a>
        </div>
      </Paper>
    </div>
  );
}

export default HotClass;
