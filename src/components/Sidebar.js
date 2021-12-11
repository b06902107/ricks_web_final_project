import React from 'react'

function Main_Sidebar({open}){

  return (
    <div className="sidebar" style={{'top': (!open) ? '60px': '0px'}}>
      <input  placeholder="Search..." searchText="This is initial search text" className="sidebarSearch" onKeyDown={(e) => {
          if (e.key === 'Enter') {
            console.log(1212)
          }
        }}/>
        <ul>
            <li className="sidebar-element"><a href="/user" className="sidebarFont">Personal Data</a></li>
            <li className="sidebar-element"><a href="/chosenCourse" className="sidebarFont">Chosen course</a></li>
            <li className="sidebar-element" ><a href="/notification" className="sidebarFont">Notifications</a></li>
            <li className="sidebar-element"><a href="/Homepath" className="sidebarFont">Home</a></li>
        </ul>
      <div className="sidebarLogout" > <a href="/login" className="sidebarFont">Logout </a></div>
    </div>

  )
}

export default Main_Sidebar