import { AddCircleSharp, BorderColor } from '@mui/icons-material';
import { Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL, SHIPPING_API } from '../../../../constants/api';
import { CODE } from '../../../../constants/constants';
import { axiosClient } from '../../../../hooks/useHttp';

const ShippingCreate = (props) => {
    const {
        setShowNoti,
        setStatus,
        getShippingList
    } = props;

    const [t] = useTranslation();
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(-1);
    const [districtSelected, setDistrictSelected] = useState(-1);
    const [communeSelected, setCommuneSelected] = useState(-1);
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        formState: { errors }
    }
        = useForm({
            defaultValues: {
                province_id: provinceSelected,
                district_id: districtSelected,
                commune_id: communeSelected,
                price: '',
            }
        });

    const onFinish = (value) => {
        setLoading(true);
        axiosClient.post(SHIPPING_API.CREATE, {
            ...value
        })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                    reset();
                    getShippingList();
                }
                setShowNoti(true);
                setLoading(false);
            }).catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    // Object.keys(response.data.errors).forEach(element => {
                    //     setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    // });
                } else if (response.data.code === CODE.HTTP_FOUND) {
                    setStatus({ type: 'warning', message: response.data.message });
                } else {
                    setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                };
                setShowNoti(true);
                setLoading(false);
            });
    }

    const getProvince = useCallback(() => {
        axiosClient.get(API_BASE_URL + "api/get-province")
            .then(res => setProvince(res.data.provinces))
            .catch(err => {
                // setError(true)
                //setMassage(err.data.message)
            })
    })

    const getDistrict = useCallback(() => {
        axiosClient.get(API_BASE_URL + "api/get-district/" + provinceSelected)
            .then(res => setDistrict(res.data.districts))
            .catch(err => {
                // setError(true)
                //setMassage(err.data.message)
            })
    })

    const getCommune = useCallback(() => {
        axiosClient.get(API_BASE_URL + "api/get-commune/" + districtSelected)
            .then(res => setCommune(res.data.communes))
            .catch(err => {
                // setError(true)
                //setMassage(err.data.message)
            })
    })

    useEffect(() => {
        getProvince();
    }, []);

    useEffect(() => {
        if (provinceSelected && provinceSelected != -1)
            getDistrict();
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected && districtSelected != -1)
            getCommune();
    }, [provinceSelected, districtSelected]);
    return (
        <div>
            <form onSubmit={handleSubmit(onFinish)}>
                <Grid container sx={{ margin: 0, padding: 1, width: '100%' }} spacing={10}>
                    <Grid item xs={4} >
                        <Controller
                            name="province_id"
                            control={control}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <Select
                                        {...field}
                                        onChange={(event) => {
                                            setValue(event.target.name, event.target.value)
                                            setProvinceSelected(event.target.value)
                                        }}
                                        label={"province"}
                                        size="small"
                                    >
                                        <MenuItem value={-1}>
                                            {"select province"}
                                        </MenuItem>
                                        {
                                            province.length > 0 && province.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Controller
                            name={"district_id"}
                            control={control}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <Select
                                        {...field}
                                        onChange={(event) => {
                                            setValue(event.target.name, event.target.value)
                                            setDistrictSelected(event.target.value)
                                        }}
                                        label={"district_id"}
                                        size="small"
                                    >
                                        <MenuItem value={-1}>
                                            {"select district"}
                                        </MenuItem>
                                        {
                                            district.length > 0 && district.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Controller
                            name={"commune_id"}
                            control={control}
                            render={({ field }) => (
                                <FormControl variant="standard">
                                    <Select
                                        onChange={(event) => {
                                            setValue(event.target.name, event.target.value)
                                            setCommuneSelected(event.target.value)
                                        }}
                                        {...field}
                                        label={"commune_id"}
                                        size="small"
                                    >
                                        <MenuItem value={-1}>
                                            {"select commune"}
                                        </MenuItem>
                                        {
                                            commune.length > 0 && commune.map(item => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) =>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="fullName">{t('shipping.list.table.price')}</InputLabel>
                                    <Input
                                        {...field}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <BorderColor />
                                            </InputAdornment>
                                        }
                                        type='number'
                                        min='0'
                                        step='any'
                                        placeholder={t('placehoder', { name: t('shipping.list.table.price') })}
                                        onBlur={(event) => {
                                            setValue(event.target.name, event.target.value ? event.target.value.trim() : '')
                                        }}
                                    />
                                </FormControl>}
                        />
                        {errors.price && <p className='text-danger'>{errors.price.message}</p>}
                    </Grid>
                    <div className='d-flex w-100 align-items-center'>
                        <Button variant="contained" type='submit'>Create <AddCircleSharp sx={{ marginLeft: 1 }} /></Button>
                        <Button variant="contained" type='reset' className='m-1 btn-cancel'
                            onClick={() => { reset(); 
                                // setSearchFiled({}) 
                            }}
                        >Clear</Button>
                    </div>
                </Grid>
            </form>
        </div>
    );
};

export default ShippingCreate;