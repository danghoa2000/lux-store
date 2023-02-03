import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { GROUP_CATEGORY_API } from '../../../../../constants/api';
import { axiosClient } from '../../../../../hooks/useHttp';
import GroupCategoryUpdate from './GroupCategoryUpdate';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { CODE, STATUS } from '../../../../../constants/constants';
import { useEffect } from 'react';

const GroupCategoryUpdateContainer = () => {

    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [groupCategory, setGroupCategory] = useState();
    const { state } = useLocation();
    const avatarRef = useRef();
    const [t] = useTranslation();
    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        group_category_code: Yup.string().
            required(t('validate.required', { name: 'Group category code' })),
    });

    const getGroupCategory = useCallback(() => {
        axiosClient.get(GROUP_CATEGORY_API.SHOW, {
            params: {
                id: state.id
            }
        }).then((response) => {
            setGroupCategory(response.data.groupCategory);
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
        getGroupCategory();
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
                group_category_code: '',
                name: '',
                status: STATUS.ACTIVE,
            },
            resolver: yupResolver(validationSchema),
        });

    useEffect(() => {
        setValue('id', groupCategory ? groupCategory.id : '')
        setValue('group_category_code', groupCategory ? groupCategory.group_category_code : '')
        setValue('name', groupCategory ? groupCategory.name : '')
        setValue('status', groupCategory ? groupCategory.status : -1,)
    }, [groupCategory]);

    const handleUpdate = useCallback((value) => {
        setLoading(true);
        axiosClient.put(GROUP_CATEGORY_API.UPDATE, {
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

    return <GroupCategoryUpdate
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
        avatarRef={avatarRef}
        groupCategory={groupCategory}
    />
};

export default GroupCategoryUpdateContainer;