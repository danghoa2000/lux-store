import React, { useCallback } from "react";
import "./style.css";
import {
    Stack,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    stepConnectorClasses,
    styled,
} from "@mui/material";
import PropTypes from "prop-types";
import {
    AddShoppingCart,
    Check,
    EventNote,
    Money,
    RateReview,
} from "@mui/icons-material";
import CartStep from "./CartStep";
import DetailStep from "./DetailStep";
import PaymentStep from "./PaymentStep";
import { useState } from "react";
import { useEffect } from "react";
import {
    API_BASE_URL,
    CUSTOMER_ADDRESS_API,
    ORDER_API,
} from "../../../constants/api";
import { CODE } from "../../../constants/constants";
import { axiosClient } from "../../../hooks/useHttp";
import ModalAddress from "./ModalAddress";
import BasicModal from "../BasicModal";
import ModalUpdateAddress from "./ModalUpdateAddress";
import ModalCreateAddress from "./ModalCreateAddress";
import ShowSnackbars from "../ShowSnackbars";

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <AddShoppingCart />,
        2: <EventNote />,
        3: <Money />,
        4: <RateReview />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const steps = ["Cart", "Details", "Payment", "Review"];

const Cart = ({
    CartItem,
    addToCart,
    decreaseQty,
    getCart,
    showNoti,
    setShowNoti,
    status,
    setStatus,
}) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(1);
    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [address, setAddress] = useState([]);
    const [currentAddress, setCurrentAddress] = useState({});
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(-1);
    const [districtSelected, setDistrictSelected] = useState(-1);
    const [communeSelected, setCommuneSelected] = useState(-1);

    const totalPrice = CartItem.reduce((price, item) => {
        let newPrice = item.price;
        if (item.sale_price) {
            newPrice = item.price - item.sale_price;
        }
        return price + item.pivot.qty * newPrice;
    }, 0);

    const [data, setData] = useState({
        cart: CartItem,
        address: "",
        discount: 0,
        shipping: 0,
        note: "",
        voucher: {},
        paymentMethod: "1",
        totalPrice: totalPrice,
        orderStatus: 1,
    });

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handelSubmit = (data) => {
        axiosClient
            .post(ORDER_API.CREATE, { ...data })
            .then((response) => {
                setShowNoti(true);
                if (response.data.code === CODE.HTTP_OK) {
                    setActiveStep(0);
                    setStatus({
                        type: "success",
                        message: response.data.message,
                    });
                    getCart();
                } else {
                    setStatus({
                        type: "warning",
                        message: response.data.message,
                    });
                }
            })
            .catch((err) => {
                setShowNoti(true);
                setStatus({
                    type: "error",
                    message: err?.data ? err.data.message : "Server error",
                });
            });
    };

    const getAddress = () => {
        axiosClient
            .get(CUSTOMER_ADDRESS_API.LIST)
            .then((response) => {
                if (response.data.code === CODE.HTTP_OK) {
                    setAddress(response.data.address);
                    const currentAddress = response.data.address.find(
                        (item) => item.status == 1
                    );
                    if (currentAddress) {
                        setData({
                            ...data,
                            address: JSON.stringify(currentAddress),
                        });
                        setCurrentAddress(currentAddress);
                    } else {
                        setData({ ...data, address: "" });
                        setCurrentAddress({});
                    }
                }
            })
            .catch((err) => {
                console.log("error!");
            });
    };

    useEffect(() => {
        getAddress();
    }, []);

    useEffect(() => {
        setData({ ...data, cart: CartItem, totalPrice: totalPrice });
    }, [CartItem]);

    const getProvince = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-province")
            .then((res) => setProvince(res.data.provinces))
            .catch((err) => {
                // setError(true);
                //setMassage(err.data.message);
            });
    }, []);

    const getDistrict = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-district/" + provinceSelected)
            .then((res) => setDistrict(res.data.districts))
            .catch((err) => {
                // setError(true);
                //setMassage(err.data.message);
            });
    }, [provinceSelected]);

    const getCommune = useCallback(() => {
        axiosClient
            .get(API_BASE_URL + "api/get-commune/" + districtSelected)
            .then((res) => setCommune(res.data.communes))
            .catch((err) => {
                // setError(true);
                //setMassage(err.data.message);
            });
    }, [districtSelected]);

    useEffect(() => {
        getProvince();
    }, []);

    useEffect(() => {
        if (provinceSelected && provinceSelected != -1) getDistrict();
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected && districtSelected != -1) getCommune();
    }, [provinceSelected, districtSelected]);

    return (
        <section className="cart-items">
            <div className="container">
                <Stack sx={{ width: "100%" }} spacing={4}>
                    <Stepper
                        alternativeLabel
                        activeStep={activeStep}
                        connector={<ColorlibConnector />}
                    >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>
            </div>
            <div>
                {activeStep == 0 && (
                    <CartStep
                        CartItem={CartItem}
                        handleNext={handleNext}
                        addToCart={addToCart}
                        decreaseQty={decreaseQty}
                        totalPrice={totalPrice}
                        activeStep={activeStep}
                        handleBack={handleBack}
                        data={data}
                        setData={setData}
                    />
                )}

                {activeStep == 1 && (
                    <DetailStep
                        CartItem={CartItem}
                        handleNext={handleNext}
                        addToCart={addToCart}
                        decreaseQty={decreaseQty}
                        totalPrice={totalPrice}
                        activeStep={activeStep}
                        handleBack={handleBack}
                        data={data}
                        setData={setData}
                        address={address}
                        currentAddress={currentAddress}
                        setOpen={setOpen}
                        setStatus={setStatus}
                        setShowNoti={setShowNoti}
                    />
                )}

                {activeStep == 2 && (
                    <PaymentStep
                        CartItem={CartItem}
                        handleNext={handleNext}
                        totalPrice={totalPrice}
                        activeStep={activeStep}
                        handleBack={handleBack}
                        data={data}
                        setData={setData}
                        handelSubmit={handelSubmit}
                    />
                )}
            </div>
            {open && (
                <BasicModal
                    open={open}
                    handleClose={() => {
                        setOpen(false);
                        setType(1);
                    }}
                    className="ligth__mode"
                >
                    {type == 1 && (
                        <ModalAddress
                            setType={setType}
                            address={address}
                            currentAddress={currentAddress}
                            getAddress={getAddress}
                            setStatus={setStatus}
                            setShowNoti={setShowNoti}
                        />
                    )}
                    {type == 2 && (
                        <ModalCreateAddress
                            loading={loading}
                            setLoading={setLoading}
                            showNoti={showNoti}
                            status={status}
                            setStatus={setStatus}
                            setShowNoti={setShowNoti}
                            province={province}
                            district={district}
                            commune={commune}
                            setProvinceSelected={setProvinceSelected}
                            setDistrictSelected={setDistrictSelected}
                            setCommuneSelected={setCommuneSelected}
                            provinceSelected={provinceSelected}
                            districtSelected={districtSelected}
                            communeSelected={communeSelected}
                            setType={setType}
                            getAddress={getAddress}
                        />
                    )}
                    {type == 3 && (
                        <ModalUpdateAddress
                            loading={loading}
                            setLoading={setLoading}
                            showNoti={showNoti}
                            status={status}
                            setStatus={setStatus}
                            setShowNoti={setShowNoti}
                            province={province}
                            district={district}
                            commune={commune}
                            setProvinceSelected={setProvinceSelected}
                            setDistrictSelected={setDistrictSelected}
                            setCommuneSelected={setCommuneSelected}
                            provinceSelected={provinceSelected}
                            districtSelected={districtSelected}
                            communeSelected={communeSelected}
                            setType={setType}
                            getAddress={getAddress}
                        />
                    )}
                </BasicModal>
            )}
        </section>
    );
};

export default Cart;
