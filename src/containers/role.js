import Login from './Login/login'
import Signup from './Login/Signup';
import addProject from './main/addProject';
import User from './User/User_main';
import Home from './Home/Home';
import ChosenCourse from './main/ChosenCourse';
import CourseData from './main/courseData/courseData';
import GroupInfo from './main/courseData/GroupInfo';
import Notification from './main/Notification';
import DepartmentCourse from './main/DepartmentCourse'

const role = {
  route: [
    {path: '/addProject',name: 'AddProject', component: addProject},
    {path: '/user',name: 'User', component: User},
    {path: '/Homepath',name:'Homepath',component: Home},
    {path: '/chosenCourse',name:'chosenCourse',component: ChosenCourse},
    {path: '/CourseData',name:'CourseData',component:CourseData},
    {path: '/GroupInfo', name: 'GroupInfo' , component: GroupInfo}, 
    {path: '/notification', name:'notification', component: Notification},
    {path: '/DepartmentCourse',name:'DepartmentCourse',component: DepartmentCourse},
  ]
}

export default {
  role
};