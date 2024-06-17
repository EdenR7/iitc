import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Breakpoints :
// {
//   xs: 0,
//   sm: 600,
//   md: 900,
//   lg: 1200,
//   xl: 1536,
// }

const drawerWidth = 200;

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TODOS
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Todo" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Activity" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AppBar
        sx={{
          paddingInline: { xs: 0, sm: "2rem" },
          backgroundColor: "hsl(194, 100%, 24%)",
        }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }} // display: { sm: "none" } break point for above than small screens
          >
            <MenuIcon sx={{ color: "hsl(18, 74%, 66%)" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "700",
              color: "hsl(18, 74%, 66%)",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            TODOS
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              sx={{ color: "#fff", "&:hover": { color: "hsl(18, 74%, 66%)" } }}
            >
              Home
            </Button>
            <Button
              sx={{ color: "#fff", "&:hover": { color: "hsl(18, 74%, 66%)" } }}
            >
              About
            </Button>
            <Button
              sx={{ color: "#fff", "&:hover": { color: "hsl(18, 74%, 66%)" } }}
            >
              Todo
            </Button>
            <Button
              sx={{ color: "#fff", "&:hover": { color: "hsl(18, 74%, 66%)" } }}
            >
              Activity
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
