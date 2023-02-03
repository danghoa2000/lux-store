import {
    Breadcrumbs,
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormFilter from "./FormFilter";
import {
    AddCircleSharp,
    BorderColor,
    RemoveRedEyeOutlined,
    ReportProblem,
    Search,
} from "@mui/icons-material";
import EnhancedTableHead from "../../../../components/partial/table/EnhancedTableHead";
import { useTranslation } from "react-i18next";
import ShowSnackbars from "../../../../components/partial/ShowSnackbars";
import { ADMIN_ORDER_API } from "../../../../constants/api";

const Order = (props) => {
    const {
        open,
        setOpen,
        order,
        orderBy,
        page,
        rowsPerPage,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
        redirectManufacturerCreate,
        headCells,
        orderList,
        showNoti,
        status,
        setShowNoti,
        setSearchFiled,
        totalRecord,
    } = props;
    const [t] = useTranslation();
    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">Home</Link>
                    <Typography>Order</Typography>
                </Breadcrumbs>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Button variant="contained" onClick={() => setOpen(!open)}>
                    Filter <Search sx={{ marginLeft: 1 }} />
                </Button>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div className="card__admin">
                    <FormFilter
                        headCells={headCells}
                        setSearchFiled={setSearchFiled}
                    />
                </div>
            </Collapse>
            <div className="card__admin">
                <Paper style={{ margin: "-25px" }}>
                    <TableContainer
                        sx={{ maxHeight: 600 }}
                        className="table__dark"
                    >
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={"medium"}
                            stickyHeader
                            aria-label="sticky table"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                headCells={headCells}
                            />
                            <TableBody>
                                {orderList.length > 0 ? (
                                    orderList.map((row, index) => {
                                        return (
                                            <TableRow hover key={index}>
                                                <TableCell
                                                    component="td"
                                                    scope="row"
                                                    padding="normal"
                                                    key={"tool"}
                                                >
                                                    <RemoveRedEyeOutlined
                                                        color="primary"
                                                        className="action"
                                                        onClick={() => {
                                                            navigate(
                                                                "/admin/orders/detail",
                                                                {
                                                                    state: {
                                                                        id: row.id,
                                                                    },
                                                                }
                                                            );
                                                        }}
                                                    />
                                                </TableCell>
                                                {Object.keys(headCells).map(
                                                    (headCell, index) => (
                                                        <TableCell
                                                            component="td"
                                                            key={index}
                                                            scope="row"
                                                            padding="normal"
                                                        >
                                                            {headCells[headCell]
                                                                .render
                                                                ? headCells[
                                                                      headCell
                                                                  ].convert
                                                                    ? t(
                                                                          headCells[
                                                                              headCell
                                                                          ].render(
                                                                              row
                                                                          )
                                                                      )
                                                                    : headCells[
                                                                          headCell
                                                                      ].render(
                                                                          row
                                                                      )
                                                                : row[headCell]}
                                                        </TableCell>
                                                    )
                                                )}
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableCell
                                        align="center"
                                        colSpan={Object.keys(headCells).length}
                                        style={{
                                            opacity: 0.5,
                                            height: "100px",
                                        }}
                                    >
                                        <ReportProblem /> No data
                                    </TableCell>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        className="paginate__admin"
                        count={totalRecord}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            {showNoti && (
                <ShowSnackbars
                    type={status.type}
                    message={status.message}
                    setShowNoti={setShowNoti}
                />
            )}
        </div>
    );
};

export default Order;
