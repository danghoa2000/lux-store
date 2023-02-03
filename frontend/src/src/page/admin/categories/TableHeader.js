// id -> name column
// numeric: aligin text
// label -> display label text
// type -> condition display input type
// render -> optimize display data
// convert -> display data with translation

const TableHeader = {
    category_code: {
        id: "category_code",
        numeric: false,
        label: "category.list.table.category_code",
        type: "text",
    },
    status: {
        id: "status",
        numeric: true,
        label: "category.list.table.status",
        convert: true,
        render: (value) => `status.${value.status}`,
        type: "status",
    },
    name: {
        id: "name",
        numeric: true,
        label: "category.list.table.name",
    },
    group_category_id: {
        id: "group_category_id",
        numeric: true,
        label: "category.list.table.group_category_id",
        render: (value) => value.group_category ? value.group_category.name : '',
    },
    description: {
        id: "description",
        numeric: true,
        label: "category.list.table.description",
    },
    created_by: {
        id: "created_by",
        numeric: true,
        label: "category.list.table.created_by",
        render: (value) => value.created_by && value.created_by.info ? value.created_by.info.full_name : '',
    },
};

export default TableHeader;
