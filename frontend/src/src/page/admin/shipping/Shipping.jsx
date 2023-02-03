import { BorderColor, CheckCircleOutline, HighlightOff, ReportProblem } from '@mui/icons-material';
import {
    Breadcrumbs,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { t } from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ShowSnackbars from '../../../../components/partial/ShowSnackbars';
import EnhancedTableHead from '../../../../components/partial/table/EnhancedTableHead';
import EditTableCell from './EditTableCell';
import ShippingCreate from './ShippingCreate';

const Shipping = (props) => {
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
        headCells,
        shippingList,
        showNoti,
        status,
        setShowNoti,
        setStatus,
        setSearchFiled,
        totalRecord,
        handleUpdate,
        getShippingList,
    } = props;
    const [editingKey, setEditingKey] = useState(null);

    const inputFieldEdit = useMemo(() => {
        const inputField = Object.keys(headCells).filter(item => headCells[item].flagEdit === true);
        return {
            ...inputField
        }
    }, [headCells]);

    const OBJ = useMemo(() => {
        let obj = {};
        Object.values(inputFieldEdit).forEach(item => {
            obj[item] = "";
        })
        return obj;
    }, []);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        formState: { errors } }
        = useForm({
            defaultValues: { ...OBJ }
        });

    useEffect(() => {
        if (editingKey) {
            const data = shippingList.find(item => item.id === editingKey)
            Object.values(inputFieldEdit).forEach(item => {
                (
                    setValue(item, data[item] || "")
                )
            });
            setValue('id', editingKey);
        }
    }, [editingKey]);

    const colum = useMemo(() => {
        const columns = [
            {
                id: "action",
                numeric: false,
                label: "action",
                type: "text",
                render: (row) => {
                    return (< TableCell
                        component="td"
                        scope="row"
                        padding="normal"
                    >
                        {
                            editingKey === row.id ? (
                                <div>
                                    <div className='d-flex align-items-center'>
                                        <CheckCircleOutline aria-label="btn-update" color="success" onClick={() => {
                                            handleUpdate(getValues())
                                            setEditingKey(null)
                                        }} />
                                        <span style={{ fontSize: '23px', margin: '0 5px' }}>/</span>
                                        <HighlightOff aria-label="btn-cancel" color="error" onClick={() => setEditingKey(null)} />
                                    </div>

                                </div>
                            ) : (
                                <BorderColor color='primary' className='action'
                                    onClick={() => setEditingKey(row.id)}
                                />
                            )
                        }
                    </TableCell >)
                }
            },
        ];

        Object.keys(headCells).map((headCell, index) => (
            columns.push(
                {
                    id: headCell,
                    numeric: false,
                    render: (row) => (
                        <EditTableCell
                            key={index}
                            editting={editingKey === row.id}
                            label={headCells[headCell].label}
                            flagEdit={headCells[headCell].flagEdit}
                            inputMode={headCells[headCell].inputMode}
                            name={headCell}
                            value={row[headCell]}
                            control={control}
                            setValue={setValue}
                        >
                            {
                                headCells[headCell].render
                                    ?
                                    headCells[headCell].convert ?
                                        t(headCells[headCell].render(row)) :
                                        headCells[headCell].render(row)

                                    : row[headCell]
                            }

                        </EditTableCell>
                    )
                }
            )
        ));

        return columns;
    }, [editingKey]);
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Shipping
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">
                        Home
                    </Link>
                    <Typography>Shipping</Typography>
                </Breadcrumbs>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div className="card__admin">
                    <ShippingCreate
                        setShowNoti={setShowNoti}
                        setStatus={setStatus}
                        getShippingList={getShippingList}
                    />
                </div>
            </Collapse>

            <div className="card__admin">
                <Paper style={{ margin: '-25px' }}>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <TableContainer sx={{ maxHeight: 600 }} className='table__dark'>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'medium'}
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
                                    {
                                        shippingList.length > 0 ? shippingList.map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={index}
                                                >
                                                    {colum.map(item => {
                                                        return item.render(row)
                                                    })}
                                                </TableRow>
                                            );
                                        }) :
                                            <TableCell align="center" colSpan={Object.keys(headCells).length + 1} style={{ opacity: .5, height: '100px' }}>
                                                <ReportProblem /> No data
                                            </TableCell>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            className='paginate__admin'
                            count={totalRecord}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </form>
                </Paper>
            </div>
            {showNoti && <ShowSnackbars type={status.type} message={status.message} setShowNoti={setShowNoti} />}
        </div>

    );
};

export default Shipping;