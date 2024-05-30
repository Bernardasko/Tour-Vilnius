import { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { logout, getLogedInUser } from "../utils/auth/authenticate";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElTours, setAnchorElTours] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLogedInUser();
    setLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/");
  };

  const openMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElNav(null);
  };

  const openToursMenu = (event) => {
    setAnchorElTours(event.currentTarget);
  };
  const closeToursMenu = () => {
    setAnchorElTours(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/groups">
          <ListItemText primary="Groups" />
        </ListItem>
        <ListItem button component={Link} to="/solo">
          <ListItemText primary="Solo" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        {loggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <ExploreIcon
            fontSize="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { xs: "none", md: "flex" } }}
          />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          Tour Vilnius
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </Button>
          <Button
            color="inherit"
            onClick={openToursMenu}
          >
            Tours
          </Button>
          <Menu
            anchorEl={anchorElTours}
            open={Boolean(anchorElTours)}
            onClose={closeToursMenu}
          >
            <MenuItem component={Link} to="/groups">Groups</MenuItem>
            <MenuItem component={Link} to="/solo">Solo</MenuItem>
          </Menu>
          <Button color="inherit">About</Button>
          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </Button>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            fontSize="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            {list}
          </Drawer>
        </Box>
        <IconButton>
          <ExploreIcon
            fontSize="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { xs: "flex", md: "none" } }}
          />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        >
          Tour Vilnius
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
