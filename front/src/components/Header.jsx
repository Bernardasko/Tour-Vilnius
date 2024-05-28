import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box, Button, Menu, MenuItem, MenuList } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const openMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton>
                    <ExploreIcon fontSize="large" edge="start" color="inherit" aria-label="logo" sx={{ display: { xs: 'none', md: 'flex' } }} />
                </IconButton>
                <Typography variant="h5" component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>Tour Vilnius</Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" >
                        <Link to="/">Home</Link>
                    </Button>
                    <Button color="inherit">
                        Tours
                    </Button>
                    <Button color="inherit" >
                        About
                    </Button>
                    <Button color="inherit" >
                        <Link to="/login">Login</Link>
                    </Button>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton fontSize="large" edge="start" color="inherit" onClick={openMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={closeMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuList>
                            <MenuItem component={Link} to="/">Home</MenuItem>
                            <MenuItem>Tours</MenuItem>
                            <MenuItem>About</MenuItem>
                            <MenuItem component={Link} to="/login">Login</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <IconButton>
                    <ExploreIcon fontSize="large" edge="start" color="inherit" aria-label="logo" sx={{ display: { xs: 'flex', md: 'none' } }} />
                </IconButton>
                <Typography variant="h5" component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>Tour Vilnius</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
