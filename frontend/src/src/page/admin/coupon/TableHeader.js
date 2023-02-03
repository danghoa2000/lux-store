// id -> date_start column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display data with translation

import { format, parseISO } from "date-fns";
import { formatPrice } from "../../../../utils/helper";

const TableHeader = {
    coupon_code: {
        id: "coupon_code",
        numeric: false,
        label: "coupon.list.table.coupon_code",
        type: "text",
    },
    status: {
        id: "status",
        numeric: true,
        label: "coupon.list.table.status",
        convert: true,
        render: (value) => `status.${value.status}`,
        type: "status",
    },
    date_start: {
        id: "date_start",
        numeric: true,
        label: "coupon.list.table.date_start",
        render: (value) => value.date_start ? format(parseISO(value.date_start), 'yyyy-MM-dd') : '',
        type: "date",
    },
    date_finish: {
        id: "date_finish",
        numeric: true,
        label: "coupon.list.table.date_finish",
        render: (value) => value.date_finish ? format(parseISO(value.date_finish), 'yyyy-MM-dd') : '',
        type: "date",
    },
    value: {
        id: "value",
        numeric: true,
        label: "coupon.list.table.price_discount",
        render: (value) => formatPrice(value.value || 0),
    },
    qty: {
        id: "qty",
        numeric: true,
        label: "coupon.list.table.qty",
    },
};

export default TableHeader;
