import { formatPrice } from "../../../../utils/helper";

// id -> name column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display with translation
// flagEdit -> enabel edit table cell
// input mod -> input edit type

const TableHeader = {
    province: {
        id: "province_id",
        numeric: false,
        label: "shipping.list.table.province",
        type: "text",
        render: (value) => (value.province ? value.province.name : ""),
        flagEdit: false,
        inputMode: 'text'
    },
    district: {
        id: "district_id",
        numeric: true,
        label: "shipping.list.table.district",
        type: "text",
        render: (value) => (value.district ? value.district.name : ""),
        flagEdit: false,
        inputMode: 'text'
    },
    commune: {
        id: "name",
        numeric: true,
        label: "shipping.list.table.commune",
        type: "text",
        render: (value) => (value.commune ? value.commune.name : ""),
        flagEdit: false,
        inputMode: 'text'
    },
    price: {
        id: "telephone",
        numeric: true,
        label: "shipping.list.table.price",
        type: "text",
        render: (value) => (value.price ? formatPrice(value.price) : ""),
        flagEdit: true,
        inputMode: 'number'
    },
};

export default TableHeader;
