import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_API, API_BASE_URL } from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import AccountCreate from "./AccountCreate";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { CODE, ROLE, STATUS } from "../../../../../constants/constants";

const AccountCreateContainer = () => {
    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);

    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(-1);
    const [districtSelected, setDistrictSelected] = useState(-1);
    const [communeSelected, setCommuneSelected] = useState(-1);

    const redirectBack = () => navigate(-1);

    const validationSchema = Yup.object().shape({
        user_code: Yup.string().required(
            t("validate.required", { name: "User code" })
        ),
        full_name: Yup.string().required(
            t("validate.required", { name: "Full name" })
        ),
        email: Yup.string()
            .required(t("validate.required", { name: "Email" }))
            .email(t("validate.email", { name: "Email" })),
    });

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm({
        shouldUnregister: false,
        defaultValues: {
            user_code: "",
            full_name: "",
            email: "",
            telephone: "",
            birthday: "",
            address: "",
            direction: "",
            role: ROLE.EMPLOYEE,
            status: STATUS.ACTIVE,
            province_id: provinceSelected,
            district_id: districtSelected,
            commune_id: communeSelected,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleCreate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .post(ACCOUNT_API.CREATE, {
                ...value,
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    reset();
                }
                setShowNoti(true);
                setLoading(false);
            })
            .catch(({ response }) => {
                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach((element) => {
                        setError(element, {
                            type: "custom",
                            message: Object.values(
                                response.data.errors[element]
                            ),
                        });
                    });
                }
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
                setLoading(false);
            });
    }, []);

    const getProvince = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-province")
            .then((res) => setProvince(res.data.provinces))
            .catch((err) => {
                setError(true);
                //setMassage(err.data.message);
            });
    }, []);

    const getDistrict = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-district/" + provinceSelected)
            .then((res) => setDistrict(res.data.districts))
            .catch((err) => {
                setError(true);
                //setMassage(err.data.message);
            });
    }, [provinceSelected]);

    const getCommune = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-commune/" + districtSelected)
            .then((res) => setCommune(res.data.communes))
            .catch((err) => {
                setError(true);
                //setMassage(err.data.message);
            });
    }, [districtSelected]);

    useEffect(() => {
        getProvince();
    }, []);

    useEffect(() => {
        if (provinceSelected && provinceSelected != -1) {
            getDistrict();
        } else {
            setDistrict([]);
        }
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected && districtSelected != -1) {
            getCommune();
        } else {
            setCommune([]);
        }
    }, [provinceSelected, districtSelected]);

    return (
        <AccountCreate
            redirectBack={redirectBack}
            handleCreate={handleCreate}
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
            setProvinceSelected={setProvinceSelected}
            setDistrictSelected={setDistrictSelected}
            setCommuneSelected={setCommuneSelected}
            province={province}
            district={district}
            commune={commune}
        />
    );
};

export default AccountCreateContainer;
