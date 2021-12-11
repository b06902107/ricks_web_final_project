import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useLocation } from "react-router-dom";
import agent from "../../../agent";
import StarIcon from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import StarHalf from '@material-ui/icons/StarHalf'
import { Button, Dialog, DialogContent, DialogTitle, Slider, DialogActions, Snackbar} from "@material-ui/core";
const queryString = require("query-string");
function GroupInfo() {
  const location = useLocation();
  const [info, setInfo] = useState(null);
  const [groupId, setGroupId] = useState('')
  const [scoreOpen, setScoreOpen] = useState('')
  const [className, setClassName] = useState('')
  const [score, setScore] = useState(0)
  const [scoreUser, setScoreUser] = useState('')
  const [ifJoin, setIfJoin] = useState(true)
  const handleJoin = async () => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const params = {
      className: className,
      groupId: groupId,
      user: user.email
    }
    try{
      await agent.Group.joinGroup(params)
      setScore(0)
    }
    catch(err){
      console.log(err)
      throw err
    }
  }
  const handleScore = (e) => {
    console.log(e.target)
    setScoreUser(e.target.id)
    setScoreOpen(true)
  }
  const handleClose = () => {
    setScoreOpen(false)
  }

  const handleSubmit = async () => {
    console.log(score)
    console.log(scoreUser)
    setScoreOpen(false)
    const params = {
      user: scoreUser,
      score: score/20
    }
    try{
      await agent.Score.addScore(params)
      setScore(0)
    }
    catch(err){
      console.log(err)
      throw err
    }
    
  }
  
  const handleChange = (e, newValue) => {
    setScore(newValue)
  }
  const getGroupInfo = async (gid) => {
    const params = {
      groupId: gid
    }
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    try{
      const {data} = await agent.Group.getGroupInfo(params)
      if(data.success){
        console.log(data.data)
        data.data.map((info) => {
          if(info.email === user.email){
            setIfJoin(false)
          }
          let l = info.score.length
          let avg = info.score.reduce((a,b) => {return a+b;})
          avg = avg/l
          info.score = avg
        })
        setInfo(data.data)
      }
    }catch(err){
      console.log(err)
      throw err
    }
    
  };
  
  const getStar = (score) => {
    let ret = []
    for(var i = 0;i<5;i++){
      if(score < 1 && score > 0){
        ret.push("half")
      }
      else if(score <= 0){
        ret.push("zero")
      }
      else{
        ret.push("full")
      }
      score = score - 1
    }
    return ret
  }
  useEffect(() => {
    const params = queryString.parse(location.search)
    const gid = params.id
    const name = params.name
    setGroupId(gid)
    setClassName(name)
    getGroupInfo(gid);
  }, [location.search]);

  return (
    <body>
      <div className="container-fluid">
        <section className="home-title">{className} 組員資訊
          <Button style={{display: ifJoin ? '' : 'none'}}className="join" color="primary" variant="contained" onClick={handleJoin}>加入</Button>
        </section>
        
        <div className="row">
          {info && info.map((member) => {
            return (
            <div className="col-3"> 
              <Paper>
                <div className="member-name">
                  {member.username}
                </div>
                <div className="member-grade">
                  {member.department} {member.grade}年級
                </div>
                <div className="member-email">
                  電子信箱: {member.email}
                </div>
                <div className="member-email">
                  個人評分
                </div>
                <div className="member-score">
                  {getStar(member.score).map((item) => {
                    switch (item) {
                      case "half":
                        return <StarHalf color="primary"/>
                      case "zero": 
                        return <StarBorder color="primary"/>
                      default:
                        return <StarIcon color="primary"/>
                    }
                  })}
                </div>
                <div className="member-action">
                  <Button color="primary"  onClick={handleScore}><span id={member.email}>評分</span></Button>
                </div>
              </Paper>
            </div>
            )
          })}
        </div>
      </div>
      <Dialog open={scoreOpen} onClose={handleClose}>
        <div className="member-dialog">
          <DialogTitle>幫他評分</DialogTitle>
          <DialogContent>
            <div className="member-content">
              <div className="member-label">0</div>
              <Slider valueLabelDisplay="auto" value={score} onChange={handleChange}/>
              <div className="member-label">100</div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button color="primary" onClick={handleSubmit}>確認</Button>
          </DialogActions>
        </div>
      </Dialog>
    </body>
  );
}

export default GroupInfo;
