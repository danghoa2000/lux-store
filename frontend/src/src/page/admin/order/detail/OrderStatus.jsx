import {
    Stack,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    stepConnectorClasses,
    styled,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
    AddShoppingCart,
    Cancel,
    Check,
    CheckCircle,
    EventNote,
    LocalShipping,
    Money,
    RateReview,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useMemo } from "react";

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

function ColorlibStepIcon(props, order) {
    const { active, completed, className } = props;

    let icons = {
        1: <AddShoppingCart />,
        2: <LocalShipping />,
        3: <CheckCircle />,
        4: <RateReview />,
    };

    if (order?.status == 3) {
        icons = {
            1: <AddShoppingCart />,
            2: <LocalShipping />,
            3: <Cancel />,
        };
    }

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
// const steps = ["package-box", "Delivery", "success", "Review"];
const OrderStatus = ({ order }) => {
    const steps = useMemo(() => {
        let data = ["package-box", "Delivery", "success", "Review"];
        if (order?.status == 3) {
            data = ["package-box", "Delivery", "cancel"];
        }
        return data;
    }, [order]);

    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={order?.status || 0}
                connector={<ColorlibConnector />}
            >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={(props) =>
                                ColorlibStepIcon(props, order)
                            }
                        ></StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};

export default OrderStatus;
