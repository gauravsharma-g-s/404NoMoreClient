import React, { useState } from 'react'
import WidgetWrapper from '../../components/WidgetWrapper'
import { Box } from '@mui/material'
import theme from '../../theme'
import { useNavigate } from 'react-router-dom'


function Menu({ currentSelected }) {
  const textColor = theme.palette.background.main;
  const backgroundMedium_2 = theme.palette.background.medium_2;
  const primaryLight = theme.palette.primary.light;

  const navigate = useNavigate();

  const [selected, setSelected] = useState(currentSelected)

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
        }
        break;

      case 3:
        if (window.location.pathname !== '/tags') {
          setSelected("Tags")
          navigate('/tags');
        }
        break;

      case 4:
        if (window.location.pathname !== '/users') {
          setSelected("Users")
          navigate('/users');
        }
        break;

      default:
        if (window.location.pathname !== '/home') {
          setSelected("Home")
          navigate('/home');
        }
        break;
    }
  }

  return (
    <WidgetWrapper width="100%" marginTop="70px" borderRight={`2px dotted theme.palette.background.medium`} style={{ position: 'sticky', top: '70px' }}>
      {
        menus?.map((menu) =>
          <Box key={menu.id} sx={{
            padding: "0.7rem 0", color: textColor, textAlign: "center", backgroundColor: menu.text === selected ? backgroundMedium_2 : primaryLight, fontWeight: menu.text === selected ? "bold" : "normal", "&:hover": {
              cursor: "pointer",
              backgroundColor: backgroundMedium_2
            }
          }}
            onClick={() => handleMenuClick(menu.id)}>{menu.text}</Box>
        )
      }

    </WidgetWrapper>
  )
}

export default Menu
