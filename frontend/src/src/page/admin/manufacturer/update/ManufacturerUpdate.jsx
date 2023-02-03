import { AccountCircle, AddHomeWork, BorderColor, Call } from '@mui/icons-material';
import { Breadcrumbs, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Input, InputAdornment, InputLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShowSnackbars from '../../../../../components/partial/ShowSnackbars';

const ManufacturerUpdate = (props) => {
    const {
        redirectBack,
        handleUpdate,
        toggleDirection,
        setToggleDirection,
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        errors,
        loading,
        showNoti,
        status,
        setShowNoti
    } = props;

    const [t] = useTranslation();
    return <div>
        <div className="d-flex justify-content-between align-items-center">
            <Typography variant="h4" gutterBottom>
                Manufacturer
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link to="/admin">
                    Home
                </Link>
                <Link to="/admin/manufacturer">
                    Manufacturer
                </Link>
                <Typography>Update</Typography>
            </Breadcrumbs>
        </div>
        <div style={{ marginBottom: 10 }}>
            <Button variant="contained" onClick={() => redirectBack()}>Back</Button>
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="card__admin">
                <Typography variant="h5" className='cart_admin_title' gutterBottom>
                    Basic information
                </Typography>
                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    <Grid item xs={6}>
                        <Controller
                            name="manufacturer_code"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="userCode">Manufacturer code <span className='required'></span></InputLabel>
                                    <Input
                                        {...field}
                                        disabled
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        placeholder={t('placehoder', { name: t('manufacturer.list.table.manufacturer_code') })}
                                        onBlur={(event) => {
                                            setValue(event.target.id, event.target.value ? event.target.value.trim() : '')
                                        }}
                                    />
                                </FormControl>}
                        />
                        {errors.manufacturer_code && <p className='text-danger'>{errors.manufacturer_code.message}</p>}

                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="fullName">Full name</InputLabel>
                                    <Input
                                        {...field}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <BorderColor />
                                            </InputAdornment>
                                        }
                                        placeholder={t('placehoder', { name: t('manufacturer.list.table.name') })}
                                        onBlur={(event) => {
                                            setValue(event.target.id, event.target.value ? event.target.value.trim() : '')
                                        }}
                                    />
                                </FormControl>}
                        />
                        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                    </Grid>
                </Grid>
            </div>
            <div className="card__admin">
                <Typography variant="h5" className='cart_admin_title' gutterBottom>
                    Contact infomation
                </Typography>

                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    <Grid item xs={6}>
                        <Controller
                            name="telephone"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="telephone">Telephone</InputLabel>
                                    <Input
                                        {...field}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Call />
                                            </InputAdornment>
                                        }
                                        placeholder="xxx-xxx-xxxx"
                                        onBlur={(event) => {
                                            setValue(event.target.id, event.target.value ? event.target.value.trim() : '')
                                        }}
                                    />
                                </FormControl>}
                        />
                        {errors.telephone && <p className='text-danger'>{errors.telephone.message}</p>}

                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <Input
                                        {...field}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AddHomeWork />
                                            </InputAdornment>
                                        }
                                        placeholder={t('placehoder', { name: t('manufacturer.list.table.address') })}
                                        onBlur={(event) => {
                                            setValue(event.target.id, event.target.value ? event.target.value.trim() : '')
                                        }}
                                    />
                                </FormControl>}
                        />
                    </Grid>
                </Grid>

            </div>

            <div className="card__admin">
                <Typography variant="h5" className='cart_admin_title' gutterBottom>
                    Setting
                </Typography>

                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    <Grid item xs={6}>
                        <div className='d-inline'>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) =>
                                    <FormControl>
                                        <FormLabel id="status">Status<span className='required'></span></FormLabel>
                                        <RadioGroup
                                            defaultValue="1"
                                            {...field}
                                            checked={'1'}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Active" />
                                            <FormControlLabel value="0" control={<Radio />} label="Block" />
                                        </RadioGroup>
                                    </FormControl>
                                }
                            />
                        </div>

                    </Grid>
                </Grid>

            </div>
            <div className='d-flex justify-content-center w-100'>
                <Button variant="contained" type='submit' className='m-1' disabled={loading}>{loading &&
                    <CircularProgress
                        disableShrink
                        style={{ color: 'white', width: '14px', height: '14px', margin: '0 5px 0 0' }} />}
                    Update
                </Button>
                <Button variant="contained" type='reset' className='m-1 btn-cancel'
                    onClick={() => reset()}
                >Clear</Button>
            </div>
        </form>
        {showNoti && <ShowSnackbars type={status.type} message={status.message} setShowNoti={setShowNoti} />}
    </div>
};

export default ManufacturerUpdate;