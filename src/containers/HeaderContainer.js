import React, { useState }from 'react'
import New from '../components/Class/New'
import Header from '../components/Header'
import agent from '../agent'
function HeaderContainer(){
  const [openNewClass, setOpenNewClass] = useState(false)
  const handleClose = () => {
    setOpenNewClass(false)
  }

  const createClass = async (params) => {
    try{
      const {data} = await agent.Class.createClass(params)
      if(data.success){
        return
      }
    }
    catch(err){
      console.log(err)
      throw err
    }
  }
  return (
    <React.Fragment>
      <Header
        setOpenNewClass={setOpenNewClass}
      />
      <New openNewClass={openNewClass} handleClose={handleClose} createClass={createClass}/>
    </React.Fragment>
  )
}

export default HeaderContainer