import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, logout } from "../../redux/slices/auth.js";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MY BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
