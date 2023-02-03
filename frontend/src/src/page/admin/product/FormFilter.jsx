import { Girl } from '@mui/icons-material';
import { Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ROLE, STATUS } from '../../../../constants/constants';

const FormFilter = (props) => {
    const {
        headCells,
        setSearchFiled,
        groupCategoryList,
        categoryList,
        manufacturerList,
        showNoti,
        status,
        setStatus,
        setShowNoti,
        setPage
    } = props;

    const [t] = useTranslation();

    const OBJ = useMemo(() => {
        let obj = {};
        Object.keys(headCells).forEach(item => {
            if (headCells[item].inputMode && headCells[item].inputMode === 'select') {
                obj[item] = -1;
            } else {
                obj[item] = '';
            }
        })
        return obj;
    }, []);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
    }
        = useForm({
            defaultValues: {
                ...OBJ,
                price_min: "",
                price_max: ""
            }
        });

    // const [toggleDirection, setToggleDirection] = useState(false);
    const FORM_FILTER = useMemo(() => {
        const formFilter = [];
        Object.keys(headCells).forEach((headCell, index) => {
            if (headCells[headCell].id !== 'province_id'
                && headCells[headCell].id !== 'district_id'
                && headCells[headCell].id !== 'commune_id'
                && headCells[headCell].id !== 'image'
                && headCells[headCell].id !== 'description'
                && headCells[headCell].id !== 'qty'
                && headCells[headCell].id !== 'sold_qty'
                && headCells[headCell].id !== 'status') {
                if (headCells[headCell].type === 'date') {
                    formFilter.push(
                        <Grid item xs={4} key={index}>
                            <Controller
                                name={headCells[headCell].id}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={t(headCells[headCell].label)}
                                            type="date"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(headCells[headCell].id, event.target.value ? event.target.value.trim() : '')
                                            }}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    )
                } else {
                    if (headCells[headCell].id === 'role') {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t(headCells[headCell].label)}
                                                size="small"
                                            >
                                                <MenuItem value={-1}>
                                                    {"select option"}
                                                </MenuItem>
                                                <MenuItem value={ROLE.EMPLOYEE}>
                                                    {t(`role.${ROLE.EMPLOYEE}`)}
                                                </MenuItem>
                                                <MenuItem value={ROLE.MANAGER}>
                                                    {t(`role.${ROLE.MANAGER}`)}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )
                    } else if (headCells[headCell].id === 'status') {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t(headCells[headCell].label)}
                                                size="small"
                                            >
                                                <MenuItem key={""} value={-1}>
                                                    {"select option"}
                                                </MenuItem>
                                                <MenuItem key={STATUS.ACTIVE} value={STATUS.ACTIVE}>
                                                    {t(`status.${STATUS.ACTIVE}`)}
                                                </MenuItem>
                                                <MenuItem key={STATUS.BLOCK} value={STATUS.BLOCK}>
                                                    {t(`status.${STATUS.BLOCK}`)}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )
                    }
                    else if (headCells[headCell].id === 'manufacturer') {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t('category.list.table.manafacturer')}
                                                size="small"
                                            >
                                                <MenuItem key={""} value={-1}>
                                                    {"select manufacturer"}
                                                </MenuItem>

                                                {
                                                    manufacturerList.length > 0 && (
                                                        manufacturerList.map(item => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )
                    }
                    else if (headCells[headCell].id === 'price') {
                        formFilter.push(
                            <Grid item xs={4} key={index} style={{ display: 'flex', alignItems: 'center', padding: 25 }}>
                                <Grid item xs={6}>
                                    <Controller
                                        name="price_min"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl variant="standard">
                                                <TextField
                                                    {...field}
                                                    label={"Min price"}
                                                    size="small"
                                                    onBlur={(event) => {
                                                        setValue("price_min", event.target.value ? event.target.value.trim() : '')
                                                    }}
                                                    type="number"
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <span style={{ margin: "0 10px" }}>~</span>
                                <Grid item xs={6}>
                                    <Controller
                                        name="price_max"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl variant="standard">
                                                <TextField
                                                    {...field}
                                                    label={"Max price"}
                                                    size="small"
                                                    onBlur={(event) => {
                                                        setValue("price_max", event.target.value ? event.target.value.trim() : '')
                                                    }}
                                                    type="number"
                                                />
                                            </FormControl>
                                            
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        )
                    }
                    else if (headCells[headCell].id === 'group_category_id') {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t('category.list.table.group_category_id')}
                                                size="small"
                                            >
                                                <MenuItem key={""} value={-1}>
                                                    {"select group category"}
                                                </MenuItem>

                                                {
                                                    groupCategoryList.length > 0 && (
                                                        groupCategoryList.map(item => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )
                    } else if (headCells[headCell].id === 'category_id') {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t('category.list.table.category_id')}
                                                size="small"
                                            >
                                                <MenuItem key={""} value={-1}>
                                                    {"select category"}
                                                </MenuItem>

                                                {
                                                    categoryList.length > 0 && (
                                                        categoryList.map(item => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )
                    }
                    else {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <TextField
                                                {...field}
                                                label={t(headCells[headCell].label)}
                                                size="small"
                                                onBlur={(event) => {
                                                    setValue(headCells[headCell].id, event.target.value ? event.target.value.trim() : '')
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        )
                    }
                }
            }

        });

        // formFilter.push(
        //     <Grid item xs={4} style={{ position: 'relative' }} >
        //         <Controller
        //             name="direction"
        //             control={control}
        //             render={({ field }) =>
        //                 <FormControl variant="standard">
        //                     <InputLabel htmlFor="direction">Direction</InputLabel>
        //                     <Input
        //                         {...field}
        //                         startAdornment={
        //                             <InputAdornment position="start">
        //                                 <PermContactCalendar />
        //                             </InputAdornment>
        //                         }
        //                         placeholder="Province/City, District, Ward/Commune,..."
        //                         onFocus={() => setToggleDirection(true)}
        //                     />
        //                 </FormControl>}
        //         />
        //         {toggleDirection && <Direction
        //             setValue={setValue}
        //             field='direction'
        //             control={control}
        //             ToggleDirection={setToggleDirection}
        //             getValues={getValues}
        //         />}
        //     </Grid>
        // )
        return formFilter;
    }, [groupCategoryList, categoryList]);

    const onFinish = (value) => {
        if (value.price_max && value.price_min && value.price_min > value.price_max) {
            setStatus({ type: 'warning', message: "Price is invalid, Min price must be lower than Max price" });
            setShowNoti(true);
            return;
        }
        setSearchFiled(value);
        setPage(0);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onFinish)}>
                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    {FORM_FILTER}
                    <div className='d-flex w-100'>
                        <Button variant="contained" type='submit' className='m-1' style={{ background: "#28a745" }}>
                            Search
                        </Button>
                        <Button variant="contained" type='reset' className='m-1 btn-cancel'
                            onClick={() => { reset(); setSearchFiled({}) }}
                        >Clear</Button>
                    </div>
                </Grid>

            </form>
        </div>
    );
};

export default FormFilter;