import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { MANUFACTURER_API } from '../../../../../constants/api';
import { axiosClient } from '../../../../../hooks/useHttp';
import ManufacturerUpdate from './ManufacturerUpdate';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CODE, STATUS } from '../../../../../constants/constants';
import { useEffect } from 'react';

const ManufacturerUpdateContainer = () => {

    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [manufacturer, setManufacturer] = useState();
    const { state } = useLocation();

    const [t] = useTranslation();
    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        manufacturer_code: Yup.string().
            required(t('validate.required', { name: 'Manufacturer code' })),
    });

    const getManufacturer = useCallback(() => {
        axiosClient.get(MANUFACTURER_API.SHOW, {
            params: {
                id: state.id
            }
        }).then((response) => {
            setManufacturer(response.data.manufacturer);
            if (response.data.code === CODE.HTTP_NOT_FOUND) {
                setStatus({ type: 'error', message: response.data.message });
                setShowNoti(true)
            };
        }).catch(({ response }) => {
            setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
            setShowNoti(true)
        });
    }, [state])

    useEffect(() => {
        getManufacturer();
    }, [state])

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        formState: { errors } }
        = useForm({
            shouldUnregister: false,
            defaultValues: {
                manufacturer_code: '',
                name: '',
                telephone: '',
                address: '',
                status: STATUS.ACTIVE,
            },
            resolver: yupResolver(validationSchema),
        });

    useEffect(() => {
        setValue('id', manufacturer ? manufacturer.id : '')
        setValue('manufacturer_code', manufacturer ? manufacturer.manufacturer_code : '')
        setValue('name', manufacturer ? manufacturer.name : '')
        setValue('telephone', manufacturer ? manufacturer.telephone : '',)
        setValue('address', manufacturer ? manufacturer.address : '',)
        setValue('status', manufacturer ? manufacturer.status : -1,)
    }, [manufacturer]);

    const handleUpdate = useCallback((value) => {
        setLoading(true);
        axiosClient.put(MANUFACTURER_API.UPDATE, {
            ...value
        })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({ type: 'success', message: response.data.message });
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({ type: 'error', message: response.data.message });
                };
                setShowNoti(true)
                setLoading(false);
            }).catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach(element => {
                        setError(element, { type: 'custom', message: Object.values(response.data.errors[element]) })
                    });
                }
                setStatus({ type: 'error', message: response.data ? response.data.message : 'Server error' });
                setShowNoti(true)
                setLoading(false);
            });
    }, []);

    return <ManufacturerUpdate
        redirectBack={redirectBack}
        handleUpdate={handleUpdate}
        toggleDirection={toggleDirection}
        setToggleDirection={setToggleDirection}
        handleSubmit={handleSubmit}
        control={control}
        reset={reset}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        loading={loading}
        showNoti={showNoti}
        status={status}
        setShowNoti={setShowNoti}
    />
};

export default ManufacturerUpdateContainer;