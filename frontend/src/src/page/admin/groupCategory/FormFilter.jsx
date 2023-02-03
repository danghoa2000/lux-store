import { Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ROLE, STATUS } from '../../../../constants/constants';

const FormFilter = (props) => {
    const {
        headCells,
        setSearchFiled
    } = props;

    const [t] = useTranslation();
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
    }
        = useForm({
            defaultValues: {
                group_category_code: '',
                name: '',
                status: -1,
            }
        });
    // const [toggleDirection, setToggleDirection] = useState(false);
    const FORM_FILTER = useMemo(() => {
        const formFilter = [];
        Object.keys(headCells).forEach((headCell, index) => {
            if (headCells[headCell].id !== 'province_id' && headCells[headCell].id !== 'district_id' && headCells[headCell].id !== 'commune_id') {
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
    }, []);

    const onFinish = (value) => {
        setSearchFiled(value);
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