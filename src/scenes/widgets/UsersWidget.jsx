import { Avatar, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UsersWidget() {
  const [allUsers, setAllUsers] = useState(null);
  const token = useSelector(state => state.token)
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const getAllUsers = async () => {
    try {
      const allUsersRes = await fetch('https://four04nomore-server.onrender.com/auth/getAllUsers', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const users = await allUsersRes.json();
      setAllUsers(users);
    }
    catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getAllUsers()
  }, [allUsers])

  return (
    <div style={{ marginTop: '100px', height: '100vh' }}>
      <h1 style={{ color: "blue", marginLeft: "1rem" }}>
        All Users
      </h1>
      <Grid container spacing={2} style={{ justifyContent: 'normal' }}>
        {allUsers?.map((user, i) =>
          <Grid item margin="1rem" display="flex" alignItems="center" key={i} lg={2} md={2.5} sm={3} xs={5}>
            <Link to='/profile' state={{ _id: user._id, firstName: user.firstName, lastName: user.lastName, about: user.about, skills: user.skills, createdAt: user.createdAt, isOther: true }} style={{ textDecoration: 'none' }}>
              <Avatar {...stringAvatar(user.firstName + ' ' + user.lastName)} key={i} />
            </Link>
            <Typography fontSize="0.8rem" paddingLeft='8px'>
              {user.firstName + ' ' + user.lastName}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default UsersWidget
