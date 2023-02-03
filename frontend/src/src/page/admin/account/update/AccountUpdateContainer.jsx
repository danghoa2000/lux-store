import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCOUNT_API, API_BASE_URL } from "../../../../../constants/api";
import { axiosClient } from "../../../../../hooks/useHttp";
import AccountUpdate from "./AccountUpdate";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { CODE, ROLE, STATUS } from "../../../../../constants/constants";
import { useEffect } from "react";

const AccountUpdateContainer = () => {
    const navigate = useNavigate();
    const [toggleDirection, setToggleDirection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [account, setAccount] = useState();
    const { state } = useLocation();

    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);

    const [t] = useTranslation();
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

    const getAccount = useCallback(() => {
        axiosClient
            .get(ACCOUNT_API.SHOW, {
                params: {
                    id: state.id,
                },
            })
            .then((response) => {
                setAccount(response.data.account);
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
                    setShowNoti(true);
                }
            })
            .catch(({ response }) => {
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
                setShowNoti(true);
            });
    }, [state]);

    useEffect(() => {
        getAccount();
    }, [state]);

    const [provinceSelected, setProvinceSelected] = useState(-1);
    const [districtSelected, setDistrictSelected] = useState(-1);
    const [communeSelected, setCommuneSelected] = useState(-1);

    const [isCompleteGetProvince, setCompleteGetProvince] = useState(false);
    const [isCompleteGetDistrict, setCompleteGetDistrict] = useState(false);
    const [isCompleteGetCommune, setCompleteGetCommune] = useState(false);

    const getProvince = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-province")
            .then((res) => {
                setProvince(res.data.provinces);
                setCompleteGetProvince(true);
            })
            .catch((err) => {
                setError(true);
                //setMassage(err.data.message);
            });
    }, []);

    const getDistrict = useCallback(async () => {
        await axiosClient
            .get(API_BASE_URL + "api/get-district/" + provinceSelected)
            .then((res) => {
                setDistrict(res.data.districts);
            })
            .catch((err) => {
                setError(true);
                //setMassage(err.data.message);
            });
    }, [provinceSelected]);

    const getCommune = useCallback(async () => {
        await axiosClient
            .get(API_BASE_URL + "api/get-commune/" + districtSelected)
            .then((res) => {
                setCommune(res.data.communes);
            })
            .catch((err) => {
                setError(true);
                //setMassage(err.data.message);
            });
    }, [districtSelected]);

    useEffect(() => {
        getProvince();
    }, []);

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

    useEffect(() => {
        if (account) {
            setValue("id", account ? account.id : "");
            setValue(
                "user_code",
                account && account.user_code ? account.user_code : ""
            );
            setValue(
                "full_name",
                account && account.info && account.info.full_name
                    ? account.info.full_name
                    : ""
            );
            setValue(
                "email",
                account && account.info && account.info.email
                    ? account.info.email
                    : ""
            );
            setValue(
                "telephone",
                account && account.info && account.info.telephone
                    ? account.info.telephone
                    : ""
            );
            setValue(
                "birthday",
                account && account.info && account.info.birthday
                    ? account.info.birthday
                    : ""
            );
            setValue(
                "address",
                account && account.info && account.info.address
                    ? account.info.address
                    : ""
            );
            setValue("role", account ? account.role : -1);
            setValue("status", account ? account.status : -1);

            setProvinceSelected(
                account && account.info && account.info.province_id
                    ? account.info.province_id
                    : "-1"
            );
            setDistrictSelected(
                account && account.info && account.info.district_id
                    ? account.info.district_id
                    : "-1"
            );
            setCommuneSelected(
                account && account.info && account.info.commune_id
                    ? account.info.commune_id
                    : "-1"
            );
        }
    }, [account]);

    useEffect(() => {
        if (provinceSelected && provinceSelected != -1) {
            getDistrict();
        } else {
            setDistrict([]);
        }
        setCompleteGetDistrict(true);
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected && districtSelected != -1) {
            getCommune();
        } else {
            setCommune([]);
        }
        setCompleteGetCommune(true);

    }, [provinceSelected, districtSelected]);

    useEffect(() => {
        if (isCompleteGetProvince) {
            setValue("province_id", provinceSelected);
        }
    }, [isCompleteGetProvince, provinceSelected]);

    useEffect(() => {
        if (isCompleteGetProvince && isCompleteGetDistrict) {
            setValue("district_id", districtSelected);
        }
    }, [isCompleteGetProvince, isCompleteGetDistrict, districtSelected]);

    useEffect(() => {
        if (
            isCompleteGetProvince &&
            isCompleteGetDistrict &&
            isCompleteGetCommune
        ) {
            setValue("commune_id", communeSelected);
        }
    }, [
        isCompleteGetProvince,
        isCompleteGetDistrict,
        isCompleteGetCommune,
        communeSelected,
    ]);

    const handleUpdate = useCallback((value) => {
        setLoading(true);
        axiosClient
            .put(ACCOUNT_API.UPDATE, {
                ...value,
            })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                }
                if (response.data.code === CODE.HTTP_NOT_FOUND) {
                    setStatus({
                        type: "error",
                        message: response.data.message,
                    });
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
                setStatus({ type: "error", message: response.data.message });
                setShowNoti(true);
                setLoading(false);
            });
    }, []);

    return (
        <AccountUpdate
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
            setProvinceSelected={setProvinceSelected}
            setDistrictSelected={setDistrictSelected}
            setCommuneSelected={setCommuneSelected}
            province={province}
            district={district}
            commune={commune}
        />
    );
};

export default AccountUpdateContainer;
