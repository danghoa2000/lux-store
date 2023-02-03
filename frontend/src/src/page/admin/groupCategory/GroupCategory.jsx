import { AddCircleSharp, BorderColor, Description, Filter, FolderOpen, ReportProblem, RestoreFromTrash, Search, StarBorder } from '@mui/icons-material';
import {
    Breadcrumbs,
    Button,
    Checkbox,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShowSnackbars from '../../../../components/partial/ShowSnackbars';
import EnhancedTableHead from '../../../../components/partial/table/EnhancedTableHead';
import { ACCOUNT_API, API_BASE_URL } from '../../../../constants/api';
import { ACCOUNT_URL, GROUP_CATEGORY_URL } from '../../../../constants/pathUrl';
import FormFilter from './FormFilter';

const GroupCategory = (props) => {
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
        redirectGroupCategoryCreate,
        headCells,
        groupCategoryList,
        showNoti,
        status,
        setShowNoti,
        setSearchFiled,
        totalRecord,
        deleteGroupCategory
    } = props;

    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Group Category
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">
                        Home
                    </Link>
                    <Typography>Group Category</Typography>
                </Breadcrumbs>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Button variant="contained" onClick={() => setOpen(!open)}>Filter <Search sx={{ marginLeft: 1 }} /></Button>
                <Button variant="contained" onClick={() => redirectGroupCategoryCreate()} sx={{ marginLeft: 2 }} >Create <AddCircleSharp sx={{ marginLeft: 1 }} /></Button>
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
                <Paper style={{ margin: '-25px' }}>
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
                                    groupCategoryList.length > 0 ? groupCategoryList.map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={index}
                                            >
                                                <TableCell
                                                    component="td"
                                                    scope="row"
                                                    padding="normal"
                                                >
                                                    <BorderColor color='primary' className='action'
                                                        onClick={() => {
                                                            navigate(GROUP_CATEGORY_URL.UPDATE, {
                                                                state: {
                                                                    id: row.id,
                                                                },
                                                            })
                                                        }}
                                                    />
                                                    <span className='tool'></span>
                                                    <RestoreFromTrash color='error' className='action'
                                                        onClick={() => deleteGroupCategory(row.id)}
                                                    />
                                                </TableCell>
                                                {
                                                    Object.keys(headCells).map((headCell, index) => {
                                                        if (headCells[headCell].id == "image") {
                                                            return (
                                                                <TableCell
                                                                    component="td"
                                                                    key={index}
                                                                    scope="row"
                                                                    style={{ padding: 10 }}
                                                                >
                                                                    <img src={API_BASE_URL + row[headCell]} alt="" style={{ height: 150, width: 350, margin: 'auto', display: 'block' }} />
                                                                </TableCell>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableCell
                                                                    component="td"
                                                                    key={index}
                                                                    scope="row"
                                                                    padding="normal"
                                                                >
                                                                    {headCells[headCell].render
                                                                        ?
                                                                        headCells[headCell].convert ?
                                                                            t(headCells[headCell].render(row)) :
                                                                            headCells[headCell].render(row)

                                                                        : row[headCell]}
                                                                </TableCell>
                                                            )
                                                        }
                                                    })
                                                }
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
                </Paper>
            </div>
            {showNoti && <ShowSnackbars type={status.type} message={status.message} setShowNoti={setShowNoti} />}
        </div>

    );
};

export default GroupCategory;