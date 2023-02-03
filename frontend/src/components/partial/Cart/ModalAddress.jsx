import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
import { axiosClient } from "../../../hooks/useHttp";
import { CUSTOMER_ADDRESS_API } from "../../../constants/api";
import { CODE } from "../../../constants/constants";

const ModalAddress = ({
    setType,
    address,
    currentAddress,
    getAddress,
    setStatus,
    setShowNoti,
}) => {
    const updateDefault = (id) => {
        axiosClient
            .post(CUSTOMER_ADDRESS_API.SET_DEFAULT, { id: id })
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setShowNoti(true);
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getAddress();
                }
            })
            .catch(({ response }) => {
                setShowNoti(true);

                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach((element) => {
                        // setError(element, {
                        //     type: "custom",
                        //     message: Object.values(
                        //         response.data.errors[element]
                        //     ),
                        // });
                    });
                } else if (response.data.code === CODE.HTTP_FOUND) {
                    setStatus({
                        type: "warning",
                        message: response.data.message,
                    });
                } else {
                    setStatus({
                        type: "error",
                        message: response.data
                            ? response.data.message
                            : "Server error",
                    });
                }
            });
    };

    const deleteAddress = (id) => {
        axiosClient
            .delete(CUSTOMER_ADDRESS_API.DELETE + id)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setShowNoti(true);
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getAddress();
                }
            })
            .catch(({ response }) => {
                setShowNoti(true);

                if (response.data.code === CODE.UNPROCESSABLE_ENTITY) {
                    Object.keys(response.data.errors).forEach((element) => {
                        // setError(element, {
                        //     type: "custom",
                        //     message: Object.values(
                        //         response.data.errors[element]
                        //     ),
                        // });
                    });
                } else if (response.data.code === CODE.HTTP_FOUND) {
                    setStatus({
                        type: "warning",
                        message: response.data.message,
                    });
                } else {
                    setStatus({
                        type: "error",
                        message: response.data
                            ? response.data.message
                            : "Server error",
                    });
                }
            });
    };
    return (
        <div className="my__address">
            <div className="header">
                <Typography variant="h6">My address</Typography>
                <Button
                    variant="outlined"
                    startIcon={<Add />}
                    style={{ background: "#ee4d2d" }}
                    onClick={() => setType(2)}
                >
                    Add new address
                </Button>
            </div>
            <div className="my__address__content">
                {Object.keys(address).length > 0 &&
                    address.map((item) => (
                        <div className="address address__item" key={item.id}>
                            <div className="address__desc">
                                <div className="address__contact">
                                    <Typography
                                        variant="h8"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {item?.full_name}
                                    </Typography>
                                    <span
                                        style={{
                                            borderLeft:
                                                "1px solid rgba(0,0,0,.26)",
                                            margin: "0 8px",
                                        }}
                                    ></span>
                                    <Typography variant="h8">
                                        {item?.telephone}
                                    </Typography>
                                </div>
                                <Typography variant="h8">
                                    {item?.address}
                                </Typography>
                                {item.id === currentAddress.id && (
                                    <span className="mark__default">
                                        Defaul
                                    </span>
                                )}
                            </div>
                            <div className="address__tool">
                                <div className="d-flex">
                                    <span
                                        className="change"
                                        style={{ marginRight: 3 }}
                                        // onClick={() => }
                                    >
                                        update
                                    </span>
                                    <span
                                        className="change"
                                        style={{ marginLeft: 3 }}
                                        onClick={() => deleteAddress(item.id)}
                                    >
                                        delete
                                    </span>
                                </div>
                                <Button
                                    variant="contained"
                                    style={{
                                        textTransform: "capitalize",
                                        fontSize: 12,
                                        padding: "5px 10px",
                                    }}
                                    disabled={item.id === currentAddress.id}
                                    onClick={() => updateDefault(item.id)}
                                >
                                    Set default
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ModalAddress;
