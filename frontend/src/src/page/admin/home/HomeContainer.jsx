import React, { useEffect, useState } from "react";
import Home from "./Home";
import { useForm } from "react-hook-form";
import { formatPrice } from "../../../../utils/helper";
import { format, lastDayOfMonth, parseISO } from "date-fns";
import { axiosClient } from "../../../../hooks/useHttp";
import { STATISTIC_API } from "../../../../constants/api";
import { CODE } from "../../../../constants/constants";

const HomeContainer = () => {
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        shouldUnregister: false,
        defaultValues: {
            date_from: format(new Date(), "yyyy-MM-01"),
            date_to: format(lastDayOfMonth(new Date()), "yyyy-MM-dd"),
            display_by: "day",
        },
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({});
    const [showNoti, setShowNoti] = useState(false);
    const [statistic, setStatistic] = useState({});
    const [orderStatistic, setOrderStatistic] = useState({});
    const [bestSaledStatistic, setBestSaledStatistic] = useState({});
    const [ratingStatistic, setRatingStatistic] = useState({});
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return (
                            "Total assets: " +
                            formatPrice(context.dataset.data[context.parsed.x])
                        );
                    },
                },
            },
            datalabels: {
                display: (ctx, data) => {
                    let index = ctx.dataIndex;
                    if (Number(ctx.dataset.data[index]) !== 0) {
                        return true;
                    }
                    return false;
                },
                formatter: function (value, context) {
                    return formatPrice(value);
                },
                color: "white",
                align: 'end',
                anchor: 'end',
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    font: {
                        size: 14,
                    },
                },
                offset: true,
                display: true,

                grid: {
                    offset: true,
                },
                min: 0,
            },
        },
    };

    const getStatistic = (data) => {
        setLoading(true);
        let [newData, result] = validate(data);
        if (!result) {
            setLoading(false);
            return;
        }
        axiosClient
            .post(STATISTIC_API, {
                ...newData,
            })
            .then((response) => {
                setLoading(false);
                if (response.data.code === CODE.HTTP_OK) {
                    setStatistic(response.data.statistic);
                    setOrderStatistic(response.data.orderStatistic);
                    setBestSaledStatistic(response.data.bestSaledStatistic);
                    setRatingStatistic(response.data.ratingStatistic);
                }
            })
            .catch(({ response }) => {
                setShowNoti(true);
                setLoading(false);
                setStatus({
                    type: "error",
                    message: response.data
                        ? response.data.message
                        : "Server error",
                });
            });
    };

    const validate = (data) => {
        if (data.date_from && data.date_to) {
            if (data.date_from > data.date_to) {
                setShowNoti(true);
                setStatus({
                    type: "error",
                    message:
                        "Search value is invalid, please re-enter the value!",
                });

                return [data, false];
            }

            return [data, true];
        }

        if (data.date_from) {
            setValue(
                "date_to",
                format(lastDayOfMonth(new Date(data.date_from)), "yyyy-MM-dd")
            );

            data["date_to"] = format(
                lastDayOfMonth(new Date(data.date_from)),
                "yyyy-MM-dd"
            );
            return [data, true];
        }

        if (data.date_to) {
            setValue(
                "date_from",
                format(lastDayOfMonth(new Date(data.date_to)), "yyyy-MM-01")
            );
            data["date_from"] = format(new Date(data.date_to), "yyyy-MM-01");
            return [data, true];
        }
    };

    useEffect(() => {
        getStatistic(getValues());
    }, []);

    const labels =
        Object.keys(statistic).length > 0
            ? Object.keys(statistic).map((item) => item.split(","))
            : [];
    const dataSet =
        Object.keys(statistic).length > 0
            ? Object.values(statistic).map((item) => item.total)
            : [];

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: dataSet,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const dataSetOrder =
        Object.keys(orderStatistic).length > 0
            ? [
                  orderStatistic[0].order_cancel,
                  orderStatistic[0].order_success,
                  orderStatistic[0].order_pending,
              ]
            : [];

    const optionsOrder = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return (
                            "Total assets: " +
                            formatPrice(context.dataset.data[context.parsed.x])
                        );
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    font: {
                        size: 14,
                    },
                },
                offset: true,
                display: true,

                grid: {
                    offset: true,
                },
            },
        },
    };

    const orderStatisticData = {
        labels: ["Order cancel", "Order success", "Order pending"],
        datasets: [
            {
                label: "Order quantity",
                data: dataSetOrder,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Home
            control={control}
            reset={reset}
            setValue={setValue}
            getValues={getValues}
            handleSubmit={handleSubmit}
            options={options}
            data={data}
            loading={loading}
            showNoti={showNoti}
            status={status}
            setStatus={setStatus}
            setShowNoti={setShowNoti}
            getStatistic={getStatistic}
            orderStatisticData={orderStatisticData}
            bestSaledStatistic={bestSaledStatistic}
            ratingStatistic={ratingStatistic}
        />
    );
};

export default HomeContainer;
