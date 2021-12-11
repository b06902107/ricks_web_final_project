import { Paper, FormGroup } from '@material-ui/core'
import agent from '../../agent'
import React, { useEffect, useState } from 'react';
import {useHistory,useLocation} from 'react-router-dom'
const queryString = require('query-string')
function DepartmentCourse(props) {
    const [data1,setData] = useState([])
    const fetchClass = async (college) => {
        console.log(college)
        const params = {
			college:college
        }
        try{
          const {data} = await agent.Class.getClass(params)
          if(data.success){
            setData(data)
            console.log(data)
          }
        }
        catch(err){
          console.log(err)
          throw err
        }
      }

    const location = useLocation()
    useEffect(() => {
        const params = queryString.parse(location.search)
        console.log(params.college)
        fetchClass(params.college)
        
        
    },[location.search])
    let history = useHistory()
    console.log(props)
    const handleDepartment = async (item) => {

            history.push(
            '/CourseData?className=' + item.className + '&departmentName=' + item.depmartment
            )
      }
    return (
       <div>
        <h1 className="home-title">Department Courses</h1>
        <div className="row">
            {
                console.log(data1.data)
            }
        {
            data1.data &&
            data1.data.map((item) => {
            return <div className="col-4">
            
            <Paper className="course-block" onClick={() => handleDepartment(item)}>
                    <div className="department-course-class">{item.className}</div>
                    <div className="department-course-department"> {item.depmartment}</div>
                    <div className="department-course-group">{item.groupNum}</div>
            </Paper>
            </div>
            })
        }
       </div>
        </div>
)
}

export default DepartmentCourse;