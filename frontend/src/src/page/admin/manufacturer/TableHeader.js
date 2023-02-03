import { format, parseISO } from "date-fns";
import { DATE_TIME } from "../../../../constants/constants";

// id -> name column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display with translation

const TableHeader = {
    manufacturer_code: {
        id: "manufacturer_code",
        numeric: false,
        label: "manufacturer.list.table.manufacturer_code",
        type: "text",
    },
    status: {
        id: "status",
        numeric: true,
        label: "manufacturer.list.table.status",
        convert: true,
        render: (value) => `status.${value.status}`,
        type: "status",
    },
    name: {
        id: "name",
        numeric: true,
        label: "manufacturer.list.table.name",
    },
    telephone: {
        id: "telephone",
        numeric: true,
        label: "manufacturer.list.table.telephone",
    },
    address: {
        id: "address",
        numeric: false,
        label: "manufacturer.list.table.address",
    },
};

export default TableHeader;
