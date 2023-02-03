export const API_BASE_URL = "http://127.0.0.1:8000/";

export const LOGIN_API = {
    LOGIN: API_BASE_URL + "api/auth/login",
    LOGOUT: API_BASE_URL + "api/auth/logout",
};

export const CATEGORIES_API = {
    LIST: API_BASE_URL + "api/auth/admin/categories",
    CREATE: API_BASE_URL + "api/auth/admin/categories/create",
    UPDATE: API_BASE_URL + "api/auth/admin/categories/update",
    SHOW: API_BASE_URL + "api/auth/admin/categories/show",
    DELETE: API_BASE_URL + "api/auth/admin/categories/delete",
};

export const ACCOUNT_API = {
    LIST: API_BASE_URL + "api/auth/admin/account",
    CREATE: API_BASE_URL + "api/auth/admin/account/create",
    UPDATE: API_BASE_URL + "api/auth/admin/account/update",
    SHOW: API_BASE_URL + "api/auth/admin/account/show",
    DELETE: API_BASE_URL + "api/auth/admin/account/delete",
};

export const MANUFACTURER_API = {
    LIST: API_BASE_URL + "api/auth/admin/manufacturer",
    CREATE: API_BASE_URL + "api/auth/admin/manufacturer/create",
    UPDATE: API_BASE_URL + "api/auth/admin/manufacturer/update",
    SHOW: API_BASE_URL + "api/auth/admin/manufacturer/show",
    DELETE: API_BASE_URL + "api/auth/admin/manufacturer/delete",
};

export const GROUP_CATEGORY_API = {
    LIST: API_BASE_URL + "api/auth/admin/group-category",
    CREATE: API_BASE_URL + "api/auth/admin/group-category/create",
    UPDATE: API_BASE_URL + "api/auth/admin/group-category/update",
    SHOW: API_BASE_URL + "api/auth/admin/group-category/show",
    DELETE: API_BASE_URL + "api/auth/admin/group-category/delete",
    ATTRIBUTE: API_BASE_URL + "api/auth/admin/group-category/attribute",
    ATTRIBUTE_CREATE:
        API_BASE_URL + "api/auth/admin/group-category/attribute/create",
    TOP_GROUP_CATEGORY: API_BASE_URL + "api/auth/admin/top-group-category",
};

export const SHIPPING_API = {
    LIST: API_BASE_URL + "api/auth/admin/shipping",
    CREATE: API_BASE_URL + "api/auth/admin/shipping/create",
    UPDATE: API_BASE_URL + "api/auth/admin/shipping/update",
    SHOW: API_BASE_URL + "api/auth/admin/shipping/show",
};

export const PRODUCT_API = {
    LIST: API_BASE_URL + "api/auth/admin/product",
    CREATE: API_BASE_URL + "api/auth/admin/product/create",
    UPDATE: API_BASE_URL + "api/auth/admin/product/update",
    SHOW: API_BASE_URL + "api/auth/admin/product/show",
    ATTRIBUTE: API_BASE_URL + "api/auth/admin/product/attribute",
    REVIEW: API_BASE_URL + "api/product/review",
    REVIEW_SHOW: API_BASE_URL + "api/product/review/show",
    DELETE: API_BASE_URL + "api/auth/admin/product/delete",
};

export const API_UPPLOAD = API_BASE_URL + "api/upload";

export const ATTRIBUTE_API = {
    CREATE: API_BASE_URL + "api/auth/admin/attribute/create",
    OPTIONS: API_BASE_URL + "api/auth/admin/attribute/option",
};

export const EVENT_API = {
    LIST: API_BASE_URL + "api/auth/admin/event",
    UPDATE: API_BASE_URL + "api/auth/admin/event/update",
};

export const ADMIN_ORDER_API = {
    LIST: API_BASE_URL + "api/auth/admin/order",
    CREATE: API_BASE_URL + "api/auth/admin/order/create",
    UPDATE: API_BASE_URL + "api/auth/admin/order/update",
    SHOW: API_BASE_URL + "api/auth/admin/order/show",
    DELETE: API_BASE_URL + "api/auth/admin/order/delete",
};

export const COUNPON_API = {
    LIST: API_BASE_URL + "api/auth/admin/coupon",
    CREATE: API_BASE_URL + "api/auth/admin/coupon/create",
    UPDATE: API_BASE_URL + "api/auth/admin/coupon/update",
    SHOW: API_BASE_URL + "api/auth/admin/coupon/show",
    DELETE: API_BASE_URL + "api/auth/admin/coupon/delete",
    CHECK_VALID: API_BASE_URL + "api/auth/admin/coupon/check-valid"
};

export const HOME_API = API_BASE_URL + "api/home";
export const SEARCH_API = API_BASE_URL + "api/search";
export const FORM_SEARCH_API = API_BASE_URL + "api/getFormFilter";

export const CART_API = {
    LIST: API_BASE_URL + "api/cart",
    CREATE: API_BASE_URL + "api/cart/create",
    UPDATE: API_BASE_URL + "api/cart/update",
    SHOW: API_BASE_URL + "api/cart/show",
    DELETE: API_BASE_URL + "api/cart/delete",
};

export const CUSTOMER_ADDRESS_API = {
    LIST: API_BASE_URL + "api/customer-address",
    CREATE: API_BASE_URL + "api/customer-address/create",
    UPDATE: API_BASE_URL + "api/customer-address/update",
    DELETE: API_BASE_URL + "api/customer-address/delete/",
    SET_DEFAULT: API_BASE_URL + "api/customer-address/set-default",
};

export const CUSTOMER_API = {
    LIST: API_BASE_URL + "api/customer",
    CREATE: API_BASE_URL + "api/customer/create",
    UPDATE: API_BASE_URL + "api/customer/update",
    DELETE: API_BASE_URL + "api/customer/delete/",
    SHOW: API_BASE_URL + "api/customer/show",
    GET_ORDER: API_BASE_URL + "api/customer/getOrder",
};

export const ORDER_API = {
    LIST: API_BASE_URL + "api/order",
    CREATE: API_BASE_URL + "api/order/create",
    UPDATE: API_BASE_URL + "api/order/update",
    SHOW: API_BASE_URL + "api/order/show",
    DELETE: API_BASE_URL + "api/order/delete",
};

export const STATISTIC_API = API_BASE_URL + "api/auth/admin/statistic";
