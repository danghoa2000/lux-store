// id -> name column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display data with translation

const TableHeader = {
    image: {
        id: "image",
        numeric: false,
        label: "product.list.table.image",
        type: "text",
    },
    group_category_code: {
        id: "group_category_code",
        numeric: false,
        label: "group_category.list.table.group_category_code",
        type: "text",
    },
    status: {
        id: "status",
        numeric: true,
        label: "group_category.list.table.status",
        convert: true,
        render: (value) => `status.${value.status}`,
        type: "status",
    },
    name: {
        id: "name",
        numeric: true,
        label: "group_category.list.table.name",
    },
};

export default TableHeader;
