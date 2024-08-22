import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import { FC } from "react";

const Sidebar = styled(Box)<{ open: boolean }>(({ open }) => ({
  backgroundColor: "#f0f0f0",
  height: "100vh",
  width: open ? "240px" : "60px", // Adjust the width based on the `open` state
  transition: "width 0.3s ease-in-out",
  overflow: "hidden", // Hide content overflow when sidebar is closed
  display: "flex",
  flexDirection: "column",
  alignItems: open ? "flex-start" : "center", // Center the icon when closed
  padding: open ? "10px" : "10px 0", // Adjust padding based on open state
}));

interface SidebarMenuProps {
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const SidebarMenu: FC<SidebarMenuProps> = ({
  open,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Grid
      item
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{ width: open ? "240px" : "60px" }}
    >
      <Sidebar open={open}>
        <List>
          <ListItem
            button
            sx={{
              justifyContent: open ? "center" : "center",
              paddingLeft: open ? "16px" : "0px",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" sx={{ ml: 2 }} />}
          </ListItem>
          <ListItem
            button
            sx={{
              justifyContent: open ? "initial" : "center",
              paddingLeft: open ? "16px" : "0px",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Settings" sx={{ ml: 2 }} />}
          </ListItem>
          <ListItem
            button
            sx={{
              justifyContent: open ? "initial" : "center",
              paddingLeft: open ? "16px" : "0px",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <InfoIcon />
            </ListItemIcon>
            {open && <ListItemText primary="About" sx={{ ml: 2 }} />}
          </ListItem>
        </List>
      </Sidebar>
    </Grid>
  );
};
