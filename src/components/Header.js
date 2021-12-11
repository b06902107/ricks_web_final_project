import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link, useHistory } from 'react-router-dom'
import MoreIcon from '@material-ui/icons/MoreVert';
import agent from '../agent'
import Button from '@material-ui/core/Button'


function Header(props) {
  const { setOpenNewClass } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout= () => {
    setAnchorEl(null);
    window.sessionStorage.clear()
    history.push('/')
  };

  const handleNewClass = () => {
    setOpenNewClass(true)
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleUser = () => {
    history.push('/user')
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleUser}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );



  return (
    <div className="grow" >
      <AppBar position="fixed" >
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/Homepath" className="nav-main">
              NTU GROUP
            </Link>
          </Typography>
          <nav className="nav-bar">
            <Link to="/chosenCourse" className="nav-item">已選課程</Link>
            <Link onClick={handleNewClass} className="nav-item">新增課程</Link>
          </nav>
          <div className="grow"/>
          <div className="header-right">
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default Header