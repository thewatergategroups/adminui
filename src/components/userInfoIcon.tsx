// UserIcon.js
import { BaseSyntheticEvent, useState } from 'react';
import { Card, CardContent, Divider, IconButton, List, ListItem, ListItemText, Menu, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import axios from 'axios';

interface UserInfo {
    username:string
    scopes:string[]
  }

const UserIcon = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userInfo, setUserInfo] = useState<UserInfo>({username:"default", scopes:["None"]});
  
  
    const fetchUserInfo = async () => {
    const apiUrl = 'http://10.252.1.0:30100/users/user';
    const token = Cookies.get("token") || ""
    axios.get(apiUrl,{
        headers: {
        Authorization: 'Bearer '+ token,
        },
    })
        .then(response => {
        setUserInfo(response.data); 
        })
        .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
        });
    
    };
  
    const handleMenuClose = () => {
    setAnchorEl(null);
    };
    const handleMenuOpen = (event:BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
    fetchUserInfo();
    };
    return (
    <div>
        <IconButton onClick={handleMenuOpen} >
        <AccountCircleIcon />
        </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}

            >
            {userInfo && (
                <Card style={{ maxWidth: 300, minWidth: 300,boxShadow:'none' }}>
                <CardContent>
                <Typography color={'grey'}>Username:</Typography>
                <Divider/>
                <Typography  component="div">{userInfo.username}</Typography>
                <br/>
                <Typography color="grey">Scopes: </Typography>
                <Divider/>
                
                <List>
                    {userInfo.scopes.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                    
                    </ListItem>
                    
                    ))}
                </List>

                </CardContent>
            </Card>
            )}
            </Menu>
        </div>
    )
};

export default UserIcon;
