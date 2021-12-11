import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import College from '../../constants/college'
import MenuItem from '@material-ui/core/MenuItem'
import { Dialog, DialogTitle, InputLabel, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
function New(props){

  const {openNewClass, handleClose, createClass} = props
  const history = useHistory()
  const [college, setCollege] = useState('')
  const [department, setDepartment] = useState('')
  const [name, setName] = useState('')
  const [departmentList, setDepartmentList] = useState([])

  const handleCreateClass = async () => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const params = {
      college: college,
      department: department,
      name: name,
      email: user.email
    }
    console.log(params)
    await createClass(params)
    setCollege('')
    setDepartment('')
    setName('')
    handleClose()
    history.push('/')
  }
  useEffect(() => {
    if(college){
      const dep = College.find((item) => item.name === college)
      setDepartmentList(dep.departments)
    }
  }, [college])
  return ( 
    <Dialog open={openNewClass} onClose={handleClose}>
      <DialogTitle className="page-title">
        新增課程
      </DialogTitle>
      <DialogContent className="newClass-main">
        <div className="row newClass-row">
          <div className="col-6">
            <InputLabel shrink id="college" className="label">
              學院
            </InputLabel>
            <Select
              id="college"
              fullWidth
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            >
              <MenuItem value=""></MenuItem>
              {College.map((item) => {
                return <MenuItem value={item.name}>{item.name}</MenuItem>
              })}
            </Select>
          </div>
          <div className="col-6">
            <InputLabel shrink id="department" className="label">
              系所
            </InputLabel>
            <Select
              id="department"
              fullWidth
              value={department}
              disabled={!college}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value=""></MenuItem>
              {departmentList.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>
              })}
            </Select>
          </div>
        </div>
        <div className="row newClass-row">
          <div className="col-6">
            <InputLabel shrink id="name" className="label">
              課程名稱
            </InputLabel>
            <TextField 
              fullWidth
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          取消
        </Button>
        <Button onClick={handleCreateClass} color="primary">
          建立
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default New