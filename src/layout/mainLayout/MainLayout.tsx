import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "layout/mainLayout/header/Logo";
import { Avatar, Breadcrumbs, Link, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "store";
import { activeItem } from "store/slices/menu";
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const storedUserString: any = localStorage.getItem("user");
  let storedUser: any = {};
  if (storedUserString) {
    storedUser = JSON.parse(storedUserString);

    console.log(storedUser);
  } else {
    console.log("Không tìm thấy người dùng trong localStorage.");
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const breadcrumb = useSelector((state) => state.menu.openItem);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const redirect = (text: any, url: string) => {
    dispatch(activeItem(text));
    navigate(url, { replace: true });
  };

  const listMenu = [
    { text: "Hồ sơ khám", url: "/list-medical" },
    { text: "Cơ sở khám", url: "/hospitals" },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Logo />
      <Divider />
      <List>
        {listMenu.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => redirect(text.text, text.url)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          bottom: 0,
          position: "absolute",
          right: 0,
        }}
      >
        Vesion:1.0
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#ccc",
            padding: "16px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              marginRight: "0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>
              <Typography color="text.primary">{breadcrumb}</Typography>
            </Breadcrumbs>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000",
              }}
            >
              <Box
                sx={{
                  borderRadius: "8px",
                  padding: "4px",
                  backgroundColor: "#ccc",
                  marginRight: "6px",
                }}
              >
                {storedUser?.name}
              </Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img src={storedUser?.img} alt="img"></img>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px",
            backgroundColor: "#666",
            color: "#fff",
          }}
        >
          <Typography> copyright © + Mai Văn Nam</Typography>
        </Box>
      </Box>
    </Box>
  );
}
