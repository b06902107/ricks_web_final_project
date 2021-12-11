import React, { useState } from 'react';

function User(){
	const data = JSON.parse(window.sessionStorage.getItem('user'));
	console.log(data);
	var average_score = 0
	for(let i=0 ; i<data.score.length ; i++){
		average_score += data.score[i]
	}
	average_score /= data.score.length
    return (
        <div className="container_user" id="page">
            <div className="header_user">
				<div className="menu_user">
					<ul className='ul_user'>
						<li><a href="#"> {data.username}</a></li>
						<li className="current_page_item"><a href="#">{data.department} {data.grade}年級</a></li>
						<li><a href="#">Email : {data.email}</a></li>
						<li><a href="#">My Score : {average_score}</a></li>
					</ul>
				</div>
        	</div>     
		</div>)
}


export default User