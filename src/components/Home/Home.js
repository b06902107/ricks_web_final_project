import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import HotClass from './Hotclass'



function Home(props){
  const { hotClassList } = props
  useEffect(() => {
    console.log(hotClassList)
  },[hotClassList])
  return(
    <body>
      <div className="container-fluid home-main">
        <section className="home-title">
          熱門課程
        </section>
        <div className="row">
          {hotClassList && hotClassList.map((college) => {
            return <HotClass college={college} />
          })}
        </div>
      </div>
    </body>
  )
}

export default Home;