import React, {useState, useEffect} from 'react'
import HomeLayout from '../../components/Home/Home'
import agent from '../../agent'
function Home(){
  const [hotClassList, setHotClassList] = useState([])

  const getHotClass = async () => {
    try{
      const { data } = await agent.Class.getHotClass()
      if(data.success){
        setHotClassList(data.data)
      }

    }
    catch(err){
      console.log(err)
      throw err
    }
    

  }
  useEffect(() => {
    getHotClass()
  },[])
  return (<HomeLayout hotClassList={hotClassList}/>)
}
export default Home