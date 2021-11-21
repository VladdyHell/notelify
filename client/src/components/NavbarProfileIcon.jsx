import React from "react";

import { AccountCircle } from "@mui/icons-material/";
import { Menu, MenuItem, IconButton } from "@mui/material/";
import { useNavigate } from 'react-router-dom';

function NavbarProfileIcon(props) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="profile-icon-link">
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle className="" />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >   
                <MenuItem onClick={e=>{
                    handleClose();
                    navigate('/notes');
                }}>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <form
                        name="logout"
                        onSubmit={(e) => props.onLogout(e)}
                    >
                    <button type="submit">
                <MenuItem onClick={handleClose}>
                    
                        Logout
                    
                </MenuItem>
                </button>
                </form>
            </Menu>
        </div>
    );
}

export default NavbarProfileIcon;
