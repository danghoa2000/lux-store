import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import AdminLayout from "./src/layout/AdminLayout";
import DefaultLayout from "./src/layout/DefaultLayout";

import { AuthContext } from "./hooks/useAuth";
import { CODE, ROLE } from "./constants/constants";
import PrivateAdminRoute from "./PrivateAdminRoute";
import PrivateUserRoute from "./PrivateUserRoute";
import Data from "./components/client/Data";
import Sdata from "./components/client/shops/Sdata";
import Loading from "./components/partial/Loading";
import { SearchFieldContext } from "./hooks/useSearchField";
import { axiosClient } from "./hooks/useHttp";
import { CART_API } from "./constants/api";
import { object } from "yup";
import { CUSTOMER_INFO, SESSION_ACCESS_TOKEN } from "./utils/sessionHelper";

// admin
const AdminLoginContainer = lazy(() =>
    import("./src/page/admin/login/LoginContainer")
);
const AdminHomeContainer = lazy(() =>
    import("./src/page/admin/home/HomeContainer")
);

const AdminCategoryContainer = lazy(() =>
    import("./src/page/admin/categories/CategoryContainer")
);
const AdminCategoryCreateContainer = lazy(() =>
    import("./src/page/admin/categories/create/CategoryCreateContainer")
);
const AdminCategoryUpdateContainer = lazy(() =>
    import("./src/page/admin/categories/update/CategoryUpdateContainer")
);

const AdminAccountContainer = lazy(() =>
    import("./src/page/admin/account/AccountContainer")
);
const AdminAccountCreateContainer = lazy(() =>
    import("./src/page/admin/account/create/AccountCreateContainer")
);
const AdminAccountUpdateContainer = lazy(() =>
    import("./src/page/admin/account/update/AccountUpdateContainer")
);

const AdminManufacturerContainer = lazy(() =>
    import("./src/page/admin/manufacturer/ManufacturerContainer")
);
const AdminManufacturerCreateContainer = lazy(() =>
    import("./src/page/admin/manufacturer/create/ManufacturerCreateContainer")
);
const AdminManufacturerUpdateContainer = lazy(() =>
    import("./src/page/admin/manufacturer/update/ManufacturerUpdateContainer")
);

const AdminGroupCategoryContainer = lazy(() =>
    import("./src/page/admin/groupCategory/GroupCategoryContainer")
);
const AdminGroupCategoryCreateContainer = lazy(() =>
    import("./src/page/admin/groupCategory/create/GroupCategoryCreateContainer")
);
const AdminGroupCategoryUpdateContainer = lazy(() =>
    import("./src/page/admin/groupCategory/update/GroupCategoryUpdateContainer")
);

const AdminProductContainer = lazy(() =>
    import("./src/page/admin/product/ProductContainer")
);
const AdminProductCreateContainer = lazy(() =>
    import("./src/page/admin/product/create/ProductCreateContainer")
);
const AdminProductUpdateContainer = lazy(() =>
    import("./src/page/admin/product/update/ProductUpdateContainer")
);

const AdminShippingContainer = lazy(() =>
    import("./src/page/admin/shipping/ShippingContainer")
);
const AdminEventContainer = lazy(() =>
    import("./src/page/admin/event/EventContainer")
);
const AdminOrderContainer = lazy(() =>
    import("./src/page/admin/order/OrderContainer")
);
const AdminOrderDetailContainer = lazy(() =>
    import("./src/page/admin/order/detail/OrderDetailContainer")
);

const AdminCouponContainer = lazy(() =>
    import("./src/page/admin/coupon/CouponContainer")
);
const AdminCouponCreateContainer = lazy(() =>
    import("./src/page/admin/coupon/create/CouponCreateContainer")
);
const AdminCouponUpdateContainer = lazy(() =>
    import("./src/page/admin/coupon/update/CouponUpdateContainer")
);

// ====

const HomePageContainer = lazy(() =>
    import("./src/page/client/HomePageContainer")
);
const CartContainer = lazy(() => import("./components/partial/Cart/Cart"));
const DetailContainer = lazy(() =>
    import("./src/page/client/Detail/DetailContainer")
);
const ProductContainer = lazy(() =>
    import("./src/page/client/Product/ProductContainer")
);
const CustomerLoginContainer = lazy(() =>
    import("./src/page/client/login/LoginContainer")
);
const ProfileContainer = lazy(() =>
    import("./src/page/client/profile/ProfileContainer")
);

const CustomerOrderContainer = lazy(() =>
    import("./src/page/client/profile/order/OrderContainer")
);

const CustomerOrderDetailContainer = lazy(() =>
    import("./src/page/client/profile/order/detail/OrderDetailContainer")
);

const CustomerInfoContainer = lazy(() =>
    import("./src/page/client/profile/info/InfoContainer")
);

const CustomerAddressContainer = lazy(() =>
    import("./src/page/client/profile/address/AddressContainer")
);
const App = () => {
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState({});
    const [searchField, setSearchFiled] = useState({});
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const { productItems } = Data;
    const { shopItems } = Sdata;
    const [CartItem, setCartItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(2);
    const [keySearch, setKeySearch] = useState("");
    const [isCompleteSetting, setComplateSetting] = useState(true);

    const getCart = () => {
        axiosClient
            .get(CART_API.SHOW)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setCartItem(response.data.cart);
                }
            })
            .catch(({ response }) => {
                setStatus({
                    type: "error",
                    message: response?.data
                        ? response.data.message
                        : "Server error",
                });
            });
    };

    const addToCart = (product, qty = 1) => {
        const productExit = CartItem.find((item) => item.id === product.id);
        if (productExit) {
            updateCart({ ...productExit, qty: productExit?.pivot?.qty + qty });
        } else {
            addProductToCard({ ...product, qty: qty });
        }
    };
    const decreaseQty = (product, qty = 1) => {
        const productExit = CartItem.find((item) => item.id === product.id);
        if (productExit?.pivot?.qty === 1) {
            removeCartItem(product.id);
        } else {
            updateCart({ ...product, qty: productExit?.pivot?.qty - qty });
        }
    };

    const updateCart = useCallback((item) => {
        axiosClient
            .put(CART_API.UPDATE, {
                ...item,
            })
            .then((response) => {
                setShowNoti(true);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getCart();
                } else {
                    setStatus({
                        type: "warning",
                        message: response.data.message,
                    });
                }
            })
            .catch((response) => {
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    // Object.keys(response.data.errors).forEach((element) => {
                    //     setError(element, {
                    //         type: "custom",
                    //         message: Object.values(
                    //             response.data.errors[element]
                    //         ),
                    //     });
                    // });
                }
                if (response.response.status === CODE.UNAUTHENTICATED) {
                    setStatus({
                        type: "warning",
                        message: "Sign in to purchase",
                    });
                }
            });
    }, []);

    const addProductToCard = (item) => {
        axiosClient
            .post(CART_API.CREATE, {
                ...item,
            })
            .then((response) => {
                setShowNoti(true);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getCart();
                } else {
                    setStatus({
                        type: "warning",
                        message: response.data.message,
                    });
                }
            })
            .catch((response) => {
                setShowNoti(true);
                setStatus({
                    type: "error",
                    message: response?.data
                        ? response.data.message
                        : "Server error",
                });
                if (response.response.status === CODE.UNAUTHENTICATED) {
                    setStatus({
                        type: "warning",
                        message: "Sign in to purchase",
                    });
                }
            });
    };

    const removeCartItem = (id) => {
        axiosClient
            .delete(CART_API.DELETE + "/" + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    getCart();
                }
            })
            .catch(({ response }) => {
                setShowNoti(true);
                setStatus({
                    type: "error",
                    message: response?.data
                        ? response.data.message
                        : "Server error",
                });
            });
    };

    const urlNotExist = useCallback(() => {
        return <Navigate to="/elite" replace />;
    }, []);

    return (
        <div>
            {/* Admin route  */}
            <BrowserRouter>
                <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
                    <SearchFieldContext.Provider
                        value={{ searchField, setSearchFiled }}
                    >
                        <Routes>
                            <Route path="/" element={<Outlet />}>
                                <Route
                                    index
                                    element={<Navigate to="elite" />}
                                />
                                <Route
                                    path="/elite"
                                    element={
                                        <DefaultLayout
                                            showNoti={showNoti}
                                            setShowNoti={setShowNoti}
                                            status={status}
                                            setStatus={setStatus}
                                            CartItem={CartItem}
                                            addToCart={addToCart}
                                            decreaseQty={decreaseQty}
                                            removeCartItem={removeCartItem}
                                            type={type}
                                            setType={setType}
                                            open={open}
                                            setOpen={setOpen}
                                            setCartItem={setCartItem}
                                            getCart={getCart}
                                            keySearch={keySearch}
                                            setKeySearch={setKeySearch}
                                            isCompleteSetting={isCompleteSetting}
                                            setComplateSetting={setComplateSetting}
                                        />
                                    }
                                >
                                    <Route
                                        index
                                        element={
                                            <Suspense fallback={<Loading />}>
                                                <HomePageContainer
                                                    productItems={productItems}
                                                    addToCart={addToCart}
                                                    shopItems={shopItems}
                                                ></HomePageContainer>
                                            </Suspense>
                                        }
                                    />

                                    <Route
                                        path="cart"
                                        element={
                                            <Suspense fallback={<Loading />}>
                                                <PrivateUserRoute>
                                                    <CartContainer
                                                        CartItem={CartItem}
                                                        addToCart={addToCart}
                                                        decreaseQty={
                                                            decreaseQty
                                                        }
                                                        removeCartItem={
                                                            removeCartItem
                                                        }
                                                        getCart={getCart}
                                                        showNoti={showNoti}
                                                        setShowNoti={
                                                            setShowNoti
                                                        }
                                                        status={status}
                                                        setStatus={setStatus}
                                                    />
                                                </PrivateUserRoute>
                                            </Suspense>
                                        }
                                    />

                                    <Route
                                        path="product"
                                        element={
                                            <Suspense fallback={<Loading />}>
                                                <DetailContainer
                                                    showNoti={showNoti}
                                                    setShowNoti={setShowNoti}
                                                    setStatus={setStatus}
                                                    CartItem={CartItem}
                                                    addToCart={addToCart}
                                                    decreaseQty={decreaseQty}
                                                />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="search"
                                        element={
                                            <Suspense fallback={<Loading />}>
                                                <ProductContainer
                                                    keySearch={keySearch}
                                                    setKeySearch={setKeySearch}
                                                    isCompleteSetting={isCompleteSetting}
                                                    setComplateSetting={setComplateSetting}
                                                />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="profile"
                                        element={
                                            <Suspense fallback={<Loading />}>
                                                <PrivateUserRoute>
                                                    <ProfileContainer
                                                        showNoti={showNoti}
                                                        setShowNoti={
                                                            setShowNoti
                                                        }
                                                        setStatus={setStatus}
                                                        CartItem={CartItem}
                                                    />
                                                </PrivateUserRoute>
                                            </Suspense>
                                        }
                                    >
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <CustomerInfoContainer
                                                        showNoti={showNoti}
                                                        setShowNoti={
                                                            setShowNoti
                                                        }
                                                        setStatus={setStatus}
                                                    />
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            exact
                                            path="order"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <CustomerOrderContainer
                                                        showNoti={showNoti}
                                                        setShowNoti={
                                                            setShowNoti
                                                        }
                                                        setStatus={setStatus}
                                                    />
                                                </Suspense>
                                            }
                                        ></Route>
                                        <Route
                                            path="order/detail"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <CustomerOrderDetailContainer
                                                        showNoti={showNoti}
                                                        setShowNoti={
                                                            setShowNoti
                                                        }
                                                        setStatus={setStatus}
                                                    />
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="address"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <CustomerAddressContainer
                                                        showNoti={showNoti}
                                                        setShowNoti={
                                                            setShowNoti
                                                        }
                                                        setStatus={setStatus}
                                                    />
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                </Route>
                                <Route
                                    path="customer/login"
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            <CustomerLoginContainer />
                                        </Suspense>
                                    }
                                />
                                <Route path="*" element={urlNotExist} />

                                {/* admin route */}
                                <Route path="admin/*" element={<AdminLayout />}>
                                    <Route
                                        index
                                        path="dashboard"
                                        element={
                                            <Suspense fallback={<Loading />}>
                                                <AdminHomeContainer />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="categories"
                                        element={<Outlet />}
                                    >
                                        <Route
                                            index
                                            element={
                                                <PrivateAdminRoute
                                                    roles={[
                                                        ROLE.MANAGER,
                                                        ROLE.EMPLOYEE,
                                                    ]}
                                                >
                                                    <AdminCategoryContainer />
                                                </PrivateAdminRoute>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <PrivateAdminRoute
                                                    roles={[
                                                        ROLE.MANAGER,
                                                        ROLE.EMPLOYEE,
                                                    ]}
                                                >
                                                    <AdminCategoryCreateContainer />
                                                </PrivateAdminRoute>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <PrivateAdminRoute
                                                    roles={[
                                                        ROLE.MANAGER,
                                                        ROLE.EMPLOYEE,
                                                    ]}
                                                >
                                                    <AdminCategoryUpdateContainer />
                                                </PrivateAdminRoute>
                                            }
                                        />
                                    </Route>
                                    <Route path="account" element={<Outlet />}>
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminAccountContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminAccountCreateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminAccountUpdateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route
                                        path="manufacturer"
                                        element={<Outlet />}
                                    >
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminManufacturerContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminManufacturerCreateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminManufacturerUpdateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route path="coupon" element={<Outlet />}>
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminCouponContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminCouponCreateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminCouponUpdateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route
                                        path="group-category"
                                        element={<Outlet />}
                                    >
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminGroupCategoryContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminGroupCategoryCreateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminGroupCategoryUpdateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route path="shipping" element={<Outlet />}>
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminShippingContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminManufacturerCreateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminManufacturerUpdateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>

                                    <Route path="product" element={<Outlet />}>
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminProductContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />

                                        <Route
                                            path="create"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminProductCreateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="update"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminProductUpdateContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route path="event" element={<Outlet />}>
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminEventContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route path="orders" element={<Outlet />}>
                                        <Route
                                            index
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminOrderContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                        <Route
                                            path="detail"
                                            element={
                                                <Suspense
                                                    fallback={<Loading />}
                                                >
                                                    <PrivateAdminRoute
                                                        roles={[
                                                            ROLE.MANAGER,
                                                            ROLE.EMPLOYEE,
                                                        ]}
                                                    >
                                                        <AdminOrderDetailContainer />
                                                    </PrivateAdminRoute>
                                                </Suspense>
                                            }
                                        />
                                    </Route>
                                    <Route
                                        path="contact"
                                        element={<div>contact</div>}
                                    />
                                </Route>
                                <Route
                                    path="admin/login"
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            <AdminLoginContainer />
                                        </Suspense>
                                    }
                                />
                            </Route>
                        </Routes>
                    </SearchFieldContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
