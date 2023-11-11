import React, { useState } from 'react'
import FlexBetween from '../../components/FlexBetween'
import theme from '../../theme'
import { Avatar, Box, IconButton, InputBase, Typography, useMediaQuery, MenuItem } from '@mui/material';
import { Close, Logout, Search, Menu } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../state';

function Navbar() {
  const main = theme.palette.primary.main;
  const white = theme.palette.secondary.light;
  const light = theme.palette.success.light;
  const navBackground = theme.palette.primary.light;
  const navigate = useNavigate();
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:850px)")
  const is375PxMobile = useMediaQuery('(max-width:375px)')
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const fullName = user.firstName + " " + user.lastName;

  const textColor = theme.palette.background.main;
  const backgroundMedium_2 = theme.palette.background.medium_2;

  const [selected, setSelected] = useState('Home')

  const menus = [
    { id: 1, text: "Home" },
    { id: 2, text: "All Questions" },
    { id: 3, text: "Tags" },
    { id: 4, text: "Users" }
  ]

  const handleMenuClick = (id) => {
    switch (id) {
      case 2:
        if (window.location.pathname !== '/allquestions') {
          setSelected("All Questions")
          navigate('/allquestions');
          setIsMobileMenuToggled(!isMobileMenuToggled)
        }
        break;

      case 3:
        if (window.location.pathname !== '/tags') {
          setSelected("Tags")
          navigate('/tags');
          setIsMobileMenuToggled(!isMobileMenuToggled)
        }
        break;

      case 4:
        if (window.location.pathname !== '/users') {
          setSelected("Users")
          navigate('/users');
          setIsMobileMenuToggled(!isMobileMenuToggled)
        }
        break;

      default:
        if (window.location.pathname !== '/home') {
          setSelected("Home")
          navigate('/home');
          setIsMobileMenuToggled(!isMobileMenuToggled)
        }
        break;
    }
  }

  const handleLogout = () => {
    navigate('/');
    dispatch(setLogout());

  }

  const handleClick = () => {
    if (window.location.pathname !== '/profile') {
      navigate('/profile');
    }
  }
  return (
    <FlexBetween width="100%" padding="1 rem 6%" gap="2rem" backgroundColor={navBackground} position="fixed" top="0" style={{ zIndex: '2' }}>
      {
        !isNonMobileScreens && <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          {isMobileMenuToggled ? <Close /> : <Menu />}
        </IconButton>
      }

      {
        !isNonMobileScreens && isMobileMenuToggled && (
          <Box position="fixed"
            left="0"
            bottom="0"
            height="90%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor='white'
            marginLeft='8px'
            borderRadius='4px'
            boxShadow="-3px 0 4px 0 grey  "
          >

            <FlexBetween
              flexDirection="column"
              justifyContent="center"
              paddingTop='1rem'
              gap="1rem">
              {menus?.map((menu) =>
                <Box key={menu.id} sx={{
                  padding: "0.6rem 0", color: textColor, textAlign: "center", backgroundColor: menu.text === selected ? backgroundMedium_2 : 'white', fontWeight: menu.text === selected ? "bold" : "normal", width: '100%', "&:hover": {
                    cursor: "pointer",
                    backgroundColor: backgroundMedium_2
                  }
                }}
                  onClick={() => handleMenuClick(menu.id)}>{menu.text}
                </Box>
              )}
              <Box sx={{
                padding: "0.6rem 0", color: textColor, textAlign: "center"
              }}
                onClick={() => handleLogout()}>Log Out
              </Box>
            </FlexBetween>
          </Box>
        )
      }

      <FlexBetween gap="1.75rem" width="100%">
        <Typography
          fontWeight="bold"
          paddingLeft={isNonMobileScreens ? "1rem" : "0"}
          fontSize={is375PxMobile ? "1.5rem" : "clamp(1rem, 2rem, 2.25rem)"}
          color={main}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.primary.medium
            }
          }}
        >
          404NOMORE
        </Typography>
        {
          isNonMobileScreens && (
            <FlexBetween
              padding="0.5rem 1.5rem"
              margin="0.5rem"
              gap="3rem"
              backgroundColor={light}
              borderRadius="9px"
              width="100%"
            >
              <InputBase placeholder='Search...' sx={{ width: "100%" }} />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )
        }
      </FlexBetween>
      <FlexBetween gap="1rem">
        <IconButton onClick={() => handleClick()}>
          <Avatar sx={{ backgroundColor: main }}>{user.firstName[0]}</Avatar>
        </IconButton>

        {isNonMobileScreens &&
          <Typography>
            {fullName}
          </Typography>
        }
      </FlexBetween>
      {isNonMobileScreens && < IconButton sx={{ color: main, marginRight: '2rem', fontSize: "2rem" }} onClick={() => handleLogout()}>
        <Logout sx={{ fontSize: "2rem" }} />
      </IconButton>}
    </FlexBetween>
  )
}

export default Navbar
