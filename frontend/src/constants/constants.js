export const MAX_EMAIL_CHARACTERS = 255;
export const MIN_EMAIL_CHARACTERS = 7;
export const EMAIL_PATTERN =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const MIN_PASSWORD_CHARACTERS = 255;
export const ROLE = {
    MANAGER: 0,
    EMPLOYEE: 1,
    CUSTOMER: 2,
};

export const DISPLAY_BY = {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    YEAR: "year",
};

export const STATUS = {
    BLOCK: 0,
    ACTIVE: 1,
};

export const STATUS_ORDER = {
    PENDING: 0,
    DELEVERY: 1,
    SUCCESS: 2,
    CANCEL: 3,
};

export const MENU_MAPPING = {
    0: "",
    1: "categories",
    2: "products",
    3: "orders",
    4: "manufacturer",
    5: "banner",
    6: "blogs",
    7: "account",
    8: "customer",
};

export const SORT = {
    DESC: "desc",
    ASC: "asc",
};

export const CATEGORY_TYPE = {
    PRODUCT: 0,
    BLOG: 1,
};

export const CODE = {
    HTTP_OK: 200,
    HTTP_NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    HTTP_FOUND: 302,
    UNAUTHENTICATED: 401,
};

export const BASE_URL = "http://127.0.0.1:8000/";
export const DATE_TIME = "Y-M-dd";
export const SALE_TYPE = {
    PRICE: 1,
    PERSEN: 2,
};
