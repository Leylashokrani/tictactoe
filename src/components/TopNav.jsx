// ** React Imports
import { useState, useEffect } from "react";

// ** Parse Import
import Parse from "parse";

// Material UI imports
import { AppBar, Toolbar, Typography, Box, Drawer, Stack } from "@mui/material";
import { Menu } from "@mui/icons-material";

//Styled Components
import { UnStyledLink } from "./styledComponents";

// ** React Router Imports
import { useLocation } from "react-router-dom";

// ** User Components
import SideBar from "./SideBar";

// ** Top Navigation component
const TopNav = () => {
  // ** Location Hook to run function on change of route
  const location = useLocation();

  // ** update user's online status
  const updateUserStatus = async (status) => {
    const user = Parse.User.current();
    if (user) {
      user.set("online", status);
      try {
        await user.save();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ** Automatically run update status on location change
  useEffect(() => {
    if (location.pathname === "/online") updateUserStatus(true);
    else updateUserStatus(false);
    // eslint-disable-next-line
  }, [location]);

  // ** Log Out function
  const handleLogOut = async () => {
    const user = Parse.User.current();
    user.set("online", false);
    try {
      await user.save();
    } catch (err) {
      console.log(err);
    }
    await Parse.User.logOut();
    window.location.assign("/login");
  };

  // ** Username from Local Storage
  const user =
    JSON.parse(
      localStorage.getItem(
        "Parse/a9z635ij18Ca5sLNL9MAUOviBp0J9awDuSSk7KjC/currentUser"
      )
    ) &&
    JSON.parse(
      localStorage.getItem(
        "Parse/a9z635ij18Ca5sLNL9MAUOviBp0J9awDuSSk7KjC/currentUser"
      )
    ).username;

  // ** Sidebar Open and Close Hook
  const [sideBar, setSideBar] = useState(false);

  // ** Top Navigation Component
  return (
    <AppBar sx={{ bgcolor: "#330033" }}>
      <Toolbar
        sx={{
          justifyContent: "center",
          gap: "1rem",
          color: "white",
        }}
      >
        <Box
          position={"fixed"}
          left={"1rem"}
          display={{ xs: "block", md: "none" }}
        >
          <Menu
            color="inherit"
            fontSize="large"
            onClick={() => setSideBar(true)}
          />
        </Box>

        <Typography variant="h5" fontFamily={"Lobster"} color={"#ffffff"}>
          <UnStyledLink to={"/"}>Tic-Tac-Toe</UnStyledLink>
        </Typography>
        <Typography
          variant="h6"
          color={"#ffffff"}
          display={{ md: "block", xs: "none" }}
        >
          <UnStyledLink to={"/online"}>Online</UnStyledLink>
        </Typography>
        <Typography
          variant="h6"
          color={"#ffffff"}
          display={{ md: "block", xs: "none" }}
        >
          <UnStyledLink to={"/history"}>History</UnStyledLink>
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          position={"fixed"}
          right={"1rem"}
          alignItems="center"
        >
          <Typography variant="h5" color={"#ffffff"} fontFamily={"Lobster"}>
            {user ? user : <UnStyledLink to={"/login"}>Login</UnStyledLink>}
          </Typography>
          {user && (
            <Typography
              onClick={async () => handleLogOut()}
              color={"#ffffff"}
              cursor={"pointer"}
            >
              Logout
            </Typography>
          )}
        </Stack>

        <Drawer bgcolor={"#330033"} anchor="left" open={sideBar}>
          <SideBar setSideBar={setSideBar} />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
