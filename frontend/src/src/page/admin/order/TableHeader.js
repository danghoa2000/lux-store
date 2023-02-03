import { format, parseISO } from "date-fns";
import { DATE_TIME } from "../../../../constants/constants";
import { formatPrice } from "../../../../utils/helper";

// id -> name column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display with translation

const TableHeader = {
    order_code: {
        id: "order_code",
        numeric: true,
        label: "order.list.table.order_code",
        type: "text",
        render: (value) => {
            return value.id;
        },
    },
    customer_name: {
        id: "customer_name",
        numeric: false,
        label: "order.list.table.customer_name",
        type: "text",
        render: (value) => {
            if (value && value?.address) {
                let data = JSON.parse(value?.address);
                return data?.full_name;
            }
            return "";
        },
    },
    status: {
        id: "status",
        numeric: true,
        label: "order.list.table.status",
        convert: true,
        render: (value) =>  `order.status.${value.status}`,
        type: "status",
    },
    price: {
        id: "price",
        numeric: true,
        label: "order.list.table.price",
        render: (value) => formatPrice(value.price || 0),
    },
    price_discount: {
        id: "price_discount",
        numeric: true,
        label: "order.list.table.price_discount",
        render: (value) => formatPrice(value.price_discount || 0),
    },
    address: {
        id: "address",
        numeric: false,
        label: "order.list.table.address",
        render: (value) => {
            if (value && value?.address) {
                let data = JSON.parse(value?.address);
                return data?.address;
            }
            return "";
        },
    },
    order_date: {
        id: "order_date",
        numeric: false,
        label: "order.list.table.order_date",
        render: (value) => {
            return format(parseISO(value.created_at), "yyyy-MM-dd");
        },
    },
};

export default TableHeader;
