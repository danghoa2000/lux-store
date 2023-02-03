import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/partial/header/Header";
import Footer from "../../components/partial/footer/Footer";
import { createBrowserHistory } from "history";
import "../sass/app.scss";
import "../sass/common.scss";
import { Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import { Add, Clear, Remove, ShoppingCart } from "@mui/icons-material";
import { formatPrice } from "../../utils/helper";
import ShowSnackbars from "../../components/partial/ShowSnackbars";
import { CUSTOMER_INFO, SESSION_ACCESS_TOKEN } from "../../utils/sessionHelper";
import { BASE_URL } from "../../constants/constants";
import BasicModal from "../../components/partial/BasicModal";
import RegisterAccountModal from "../../components/partial/Modal/RegisterAccountModal";
import SignInAccountModal from "../../components/partial/Modal/SignInAccountModal";
import { useAuth } from "../../hooks/useAuth";
// import { MessengerChat } from "react-messenger-chat-plugin";
// import { useRef } from "react";

const DefaultLayout = ({
  CartItem,
  addToCart,
  decreaseQty,
  showNoti,
  setShowNoti,
  status,
  setStatus,
  removeCartItem,
  type,
  setType,
  open,
  setOpen,
  setCartItem,
  getCart,
  keySearch,
  setKeySearch,
  isCompleteSetting,
  setComplateSetting,
}) => {
  const [state, setState] = useState(false);
  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(state);
  };
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const { setUser, user } = useAuth();
  // const MessengerRef = useRef();
  // useEffect(() => {
  //     MessengerRef.current.setAttribute("page_id", "your_page_id");
  //     MessengerRef.current.setAttribute("attribution", "biz_inbox");

  //     window.fbAsyncInit = function () {
  //         FB.init({
  //             xfbml: true,
  //             version: "v15.0",
  //         });
  //     };

  //     (function (d, s, id) {
  //         var js,
  //             fjs = d.getElementsByTagName(s)[0];
  //         if (d.getElementById(id)) return;
  //         js = d.createElement(s);
  //         js.id = id;
  //         js.src =
  //             "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
  //         fjs.parentNode.insertBefore(js, fjs);
  //     })(document, "script", "facebook-jssdk");
  // }, []);

  useEffect(() => {
    const _token = window.sessionStorage.getItem(SESSION_ACCESS_TOKEN);
    const paths = history.location.pathname;
    const arrayPaths = paths.split("/");
    if (arrayPaths[1] !== "admin") {
        if (_token) {
            const info = JSON.parse(
                window.sessionStorage.getItem(CUSTOMER_INFO)
            );
            setUser(info);
            getCart();
        } else setCartItem([]);
    }
  }, []);

  return (
    <div>
      <Header
        CartItem={CartItem}
        toggleDrawer={toggleDrawer}
        setOpen={setOpen}
        setType={setType}
        setCartItem={setCartItem}
        keySearch={keySearch}
        setKeySearch={setKeySearch}
        isCompleteSetting={isCompleteSetting}
        setComplateSetting={setComplateSetting}
      />
      <Outlet />
      <Footer />
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        <div className="cart__product__list">
          <div
            style={{
              margin: "0 20px",
              height: 74,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ShoppingCart />
            <Typography variant="h6" style={{ marginLeft: 10 }}>
              {CartItem?.length} Item
            </Typography>
          </div>
          <Divider
            style={{
              borderColor: "rgb(246, 249, 252)",
              borderBottomWidth: "medium",
              opacity: 1,
            }}
          />

          {CartItem?.length > 0 ? (
            CartItem.map((item) => {
              return (
                <div key={item.id}>
                  <div className="cart__product">
                    <div className="cart__product__btn">
                      <IconButton onClick={() => addToCart(item)}>
                        <Add />
                      </IconButton>
                      <Typography variant="h7">{item?.pivot?.qty}</Typography>
                      <IconButton onClick={() => decreaseQty(item)}>
                        <Remove />
                      </IconButton>
                    </div>
                    <div className="cart__product__img">
                      <img src={BASE_URL + item.product.image} alt="" />
                    </div>
                    <div className="cart__product__detail">
                      <Typography variant="h7">{item.name}</Typography>
                      {item?.sale_price ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                          }}
                        >
                          <span className="old-price">
                            {formatPrice(item?.price)}
                          </span>
                          <span
                            className="new-price"
                            style={{
                              marginLeft: 5,
                            }}
                          >
                            {formatPrice(item?.price - item?.sale_price)}
                          </span>
                        </div>
                      ) : (
                        <span className="new-price">
                          {formatPrice(item?.price)}
                        </span>
                      )}
                    </div>
                    <div className="cart__product__remove">
                      <IconButton onClick={() => removeCartItem(item.id)}>
                        <Clear />
                      </IconButton>
                    </div>
                  </div>
                  <Divider
                    style={{
                      borderColor: "rgb(246, 249, 252)",
                      borderBottomWidth: "medium",
                      opacity: 1,
                    }}
                  />
                </div>
              );
            })
          ) : (
            <img
              src="https://shop.unicornstore.in/beam/themes/2019/assets/img/cart_empty.png"
              style={{ display: "block", margin: "auto" }}
              alt=""
            />
          )}
        </div>
        {window.sessionStorage.getItem(SESSION_ACCESS_TOKEN) ? (
          <div>
            <Button variant="contained" className="btn__checkcout">
              Checkout Now
            </Button>
            <Button
              variant="contained"
              className="btn__view_cart"
              onClick={() => navigate("/elite/cart")}
            >
              View cart
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            className="btn__checkcout"
            onClick={() => {
              setOpen(true);
              setType(2);
            }}
          >
            Login now
          </Button>
        )}
      </Drawer>
      {open && (
        <BasicModal
          className="light__mode w-500"
          open={open}
          handleClose={() => setOpen(false)}
        >
          {type == 1 && (
            <RegisterAccountModal
              setShowNoti={setShowNoti}
              setStatus={setStatus}
              setOpen={setOpen}
              setType={setType}
            />
          )}
          {type == 2 && (
            <SignInAccountModal
              setShowNoti={setShowNoti}
              setStatus={setStatus}
              setOpen={setOpen}
              setType={setType}
              getCart={getCart}
            />
          )}
        </BasicModal>
      )}
      {showNoti && (
        <ShowSnackbars
          type={status.type}
          message={status.message}
          setShowNoti={setShowNoti}
        />
      )}
      {/* <div
                id="fb-root"
                style={{ display: "block" }}
            ></div>
            <div
                ref={MessengerRef}
                id="fb-customer-chat"
                className="fb-customerchat"
            ></div> */}
    </div>
  );
};

export default DefaultLayout;
