import { format, parseISO } from "date-fns";
import { DATE_TIME } from "../../../../constants/constants";

// id -> name column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display with translation

const TableHeader = {
    user_code: {
        id: "user_code",
        numeric: false,
        label: "account.list.table.user_code",
        type: "text",
    },
    role: {
        id: "role",
        numeric: true,
        label: "account.list.table.role",
        convert: true,
        render: (value) => `role.${value.role}`,
        type: "role",
    },
    status: {
        id: "status",
        numeric: true,
        label: "account.list.table.status",
        convert: true,
        render: (value) => `status.${value.status}`,
        type: "status",
    },
    full_name: {
        id: "full_name",
        numeric: false,
        label: "account.list.table.full_name",
        render: (value) => (value.info ? value.info.full_name : ""),
        type: "text",
    },
    email: {
        id: "email",
        numeric: false,
        label: "account.list.table.email",
        render: (value) => (value.info ? value.info.email : ""),
        type: "text",
    },
    telephone: {
        id: "telephone",
        numeric: false,
        label: "account.list.table.telephone",
        render: (value) => (value.info ? value.info.telephone : ""),
        type: "text",
    },
    birthday: {
        id: "birthday",
        numeric: false,
        label: "account.list.table.birthday",
        render: (value) =>
            value.info && value.info.birthday
                ? format(parseISO(value.info.birthday), DATE_TIME)
                : "",
        type: "date",
    },
    province: {
        id: "province_id",
        numeric: false,
        label: "account.list.table.province",
        render: (value) =>
            value.info && value.info.province ? value.info.province.name : "",
        type: "text",
    },
    district: {
        id: "district_id",
        numeric: false,
        label: "account.list.table.district",
        render: (value) =>
            value.info && value.info.district ? value.info.district.name : "",
        type: "text",
    },
    commune: {
        id: "commune_id",
        numeric: false,
        label: "account.list.table.commune",
        render: (value) =>
            value.info && value.info.commune ? value.info.commune.name : "",
        type: "text",
    },
    address: {
        id: "address",
        numeric: false,
        label: "account.list.table.address",
        render: (value) => (value.info ? value.info.address : ""),
        type: "text",
    },
};

export default TableHeader;
