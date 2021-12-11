import React from 'react'
import Paper from '@material-ui/core/Paper'
function chosenCourse(props){
  const { yourCourse } = props

  return (
    <body>
      <div className="container-fluid">
        <section className="home-title">已選課程</section>
        <div className="row">
          {yourCourse.map((item) => {
            return (
              <div className="col-3 chosen-main">
                <Paper className="chosen-block">
                  <section className="chosen-title">{item.name}</section>
                  <section className="chosen-subtitle">組員:</section>
                  {item.member.map((mem) => {
                    return <div className="chosen-member">{mem.username}</div>
                  })}
                  <a href={`/GroupInfo?id=${item.id}&name=${item.name}`} className="more">More...</a>
                </Paper>
              </div>
            )
          })}
        </div>
      </div>
    </body>
  )
}

export default chosenCourse