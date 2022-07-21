import React, { useEffect, useState } from "react";
import {  FloatingLabel, Form, Card } from "react-bootstrap";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  getDoc,
  namedQuery,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import "firebase/compat/firestore";
import "firebase/compat/firestore";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EventIcon from "@mui/icons-material/Event";
import CampaignIcon from "@mui/icons-material/Campaign";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import logo from "../Photos/PUPLogo.png";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import AnnouncementTwoToneIcon from "@mui/icons-material/AnnouncementTwoTone";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";

import AOS from "aos";
import "aos/dist/aos.css";

const columns = [
  { id: "Date", label: "Date", minWidth: 160 },
  { id: "Name", label: "Name", minWidth: 100 },
  {
    id: "Description",
    label: "Description",
    minWidth: 290,
    align: "lift",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Add_announcement = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(null);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");

    async function deletedocs(name) {
      let request = await deleteDoc(doc(db, "Announcement", name));
      console.log(request);
    }
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const name = e.target.Announce.value;
    if (!name) {
      return;
    }
    await db.collection("Announcement").doc(name).set({
      Name: input,
      Description: desc,
      Date: date,
      timestamp: new Date(),
    });
  };

  useEffect(() => {
    const q = query(
      collection(db, "Announcement"),
      orderBy("timestamp", "desc")
    );

    AOS.init({
      duration: 1000,
    });

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  async function deletedocs(name) {
    let request = await deleteDoc(doc(db, "Announcement", name));
    console.log(request);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: "#4C0001" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img width="35px" height="35px" src={logo} alt="Logo" />
              <b
                style={{
                  color: "#fff",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                PUP LOPEZ BRANCH
              </b>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <br />
              <Tooltip
                title="Home"
                arrow
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemButton component="a" href="/admin">
                  <ListItemIcon>
                    <HomeIcon
                      style={{
                        color: "#4C0001",
                      }}
                    />
                  </ListItemIcon>{" "}
                  Home
                </ListItemButton>
              </Tooltip>
              <br />
              <Tooltip
                title="Add Announcement"
                arrow
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemButton component="a" href="/AddAnnounce">
                  <ListItemIcon>
                    <CampaignIcon
                      style={{
                        color: "#4C0001",
                      }}
                    />
                  </ListItemIcon>{" "}
                  Announcement
                </ListItemButton>
              </Tooltip>
              <br />
              <Tooltip
                title="Add Event"
                arrow
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemButton component="a" href="/AddEvent">
                  <ListItemIcon>
                    <EventIcon
                      style={{
                        color: "#4C0001",
                      }}
                    />
                  </ListItemIcon>{" "}
                  Event
                </ListItemButton>
              </Tooltip>
              <br />
              <Tooltip
                title="Organization"
                arrow
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemButton component="a" href="/Org">
                  <ListItemIcon>
                    <Inventory2Icon
                      style={{
                        color: "#4C0001",
                      }}
                    />
                  </ListItemIcon>{" "}
                  Organization
                </ListItemButton>
              </Tooltip>
              <br />
            </ListItem>
          </List>
          <Divider />
          <List>
            <br />
            <Tooltip
              title="Privacy"
              arrow
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <ListItemButton component="a" href="/PrivacyAdmin">
                <ListItemIcon>
                  <PrivacyTipIcon
                    style={{
                      color: "#4C0001",
                    }}
                  />
                </ListItemIcon>{" "}
                Privacy
              </ListItemButton>
            </Tooltip>
            <br />
            <Tooltip
              title="Terms of Use"
              arrow
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <ListItemButton component="a" href="/TermsAdmin">
                <ListItemIcon>
                  <SecurityOutlinedIcon
                    style={{
                      color: "#4C0001",
                    }}
                  />
                </ListItemIcon>{" "}
                Terms of Use
              </ListItemButton>
            </Tooltip>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Card
            className="m-2"
            style={{
              backgroundColor: "#fff ",
              borderTop: "4px solid #4C0001",
              boxShadow: "0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%)",
            }}
          >
            <Paper sx={{ width: "100%" }}>
              <form onSubmit={handleClick}>
                <div className="annIn">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Announcement"
                    className="col-10 form-group mx-auto mb-2"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Announcement"
                      name="Announce"
                      style={{ backgroundColor: "#f4f6f9" }}
                      onChange={(e) => setInput(e.target.value)}
                      autoComplete="off"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="col-10 form-group mx-auto mb-2"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      style={{ backgroundColor: "#f4f6f9" }}
                      onChange={(e) => setDesc(e.target.value)}
                      autoComplete="off"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Sample Date Format(August 11, 2021)"
                    className="col-10 form-group mx-auto mb-2"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Sample Date(August 11, 2021)"
                      style={{ backgroundColor: "#f4f6f9" }}
                      onChange={(e) => setDate(e.target.value)}
                      autoComplete="off"
                    />
                  </FloatingLabel>
                  <div className="col-10 pt-3 mx-auto">
                    <input
                      class="in"
                      type="submit"
                      className="btn btn-info"
                      value="Done"
                    ></input>
                  </div>
                  <br />
                </div>
              </form>
            </Paper>
          </Card>
          <Card
            className="m-2"
            style={{
              backgroundColor: "#fff ",
              borderTop: "4px solid #4C0001",
              boxShadow: "0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%)",
            }}
          >
            <h3 id="Ann">ANNOUNCEMENT</h3>
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={2}
                        style={{ color: "#4C0001" }}
                      >
                        <AnnouncementTwoToneIcon /> Announcement
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        style={{ color: "#4C0001" }}
                      >
                        <InfoTwoToneIcon /> Details
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            top: 57,
                            minWidth: column.minWidth,
                            color: "#fff",
                            fontWeight: "bold",
                            backgroundColor: "#4C0001",
                          }}
                        >
                          <BookmarksIcon />
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lists
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((list) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={list.code}
                          >
                            {columns.map((column) => {
                              const value = list[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                  <i
                                    class="fa fa-times-circle"
                                    aria-hidden="true"
                                    style={{
                                      color: "#4C0001",
                                      marginLeft: "30px",
                                    }}
                                    onClick={() => deletedocs(list.id)}
                                  ></i>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className="page"
                rowsPerPageOptions={[5, 25, 100]}
                component="div"
                count={lists.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Box>
      </Box>
    </>
  );
}
export default Add_announcement;
