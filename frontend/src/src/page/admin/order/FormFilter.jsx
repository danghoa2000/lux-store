import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ROLE, STATUS, STATUS_ORDER } from "../../../../constants/constants";

const FormFilter = (props) => {
    const { headCells, setSearchFiled } = props;

    const [t] = useTranslation();
    const { handleSubmit, control, reset, setValue, getValues } = useForm({
        defaultValues: {
            order_code: "",
            customer_name: "",
            price_min: "",
            price_max: "",
            order_start: "",
            order_end: "",
            address: "",
            status: -1,
        },
    });
    const FORM_FILTER = useMemo(() => {
        const formFilter = [];
        Object.keys(headCells).forEach((headCell, index) => {
            if (
                headCells[headCell].id !== "province_id" &&
                headCells[headCell].id !== "district_id" &&
                headCells[headCell].id !== "commune_id" &&
                headCells[headCell].id !== "price_discount"
            ) {
                if (headCells[headCell].type === "date") {
                    formFilter.push(
                        <Grid item xs={4} key={index}>
                            <Controller
                                name={headCells[headCell].id}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={t(headCells[headCell].label)}
                                            type="date"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    headCells[headCell].id,
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    );
                } else {
                    if (headCells[headCell].id === "role") {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t(
                                                    headCells[headCell].label
                                                )}
                                                size="small"
                                            >
                                                <MenuItem value={-1}>
                                                    {"select option"}
                                                </MenuItem>
                                                <MenuItem value={ROLE.EMPLOYEE}>
                                                    {t(`role.${ROLE.EMPLOYEE}`)}
                                                </MenuItem>
                                                <MenuItem value={ROLE.MANAGER}>
                                                    {t(`role.${ROLE.MANAGER}`)}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        );
                    } else if (headCells[headCell].id === "status") {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <Select
                                                {...field}
                                                label={t(
                                                    headCells[headCell].label
                                                )}
                                                size="small"
                                            >
                                                <MenuItem key={""} value={-1}>
                                                    {"select option"}
                                                </MenuItem>
                                                <MenuItem
                                                    key={STATUS_ORDER.PENDING}
                                                    value={STATUS_ORDER.PENDING}
                                                >
                                                    {t(
                                                        `order.status.${STATUS_ORDER.PENDING}`
                                                    )}
                                                </MenuItem>
                                                <MenuItem
                                                    key={STATUS_ORDER.DELEVERY}
                                                    value={STATUS_ORDER.DELEVERY}
                                                >
                                                    {t(
                                                        `order.status.${STATUS_ORDER.DELEVERY}`
                                                    )}
                                                </MenuItem>
                                                <MenuItem
                                                    key={STATUS_ORDER.SUCCESS}
                                                    value={STATUS_ORDER.SUCCESS}
                                                >
                                                    {t(
                                                        `order.status.${STATUS_ORDER.SUCCESS}`
                                                    )}
                                                </MenuItem>
                                                <MenuItem
                                                    key={STATUS_ORDER.CANCEL}
                                                    value={STATUS_ORDER.CANCEL}
                                                >
                                                    {t(
                                                        `order.status.${STATUS_ORDER.CANCEL}`
                                                    )}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        );
                    } else if (headCells[headCell].id === "price") {
                        formFilter.push(
                            <Grid
                                item
                                xs={4}
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: 25,
                                }}
                            >
                                <Grid item xs={6}>
                                    <Controller
                                        name="price_min"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl variant="standard">
                                                <TextField
                                                    {...field}
                                                    label={"Min price"}
                                                    size="small"
                                                    onBlur={(event) => {
                                                        setValue(
                                                            "price_min",
                                                            event.target.value
                                                                ? event.target.value.trim()
                                                                : ""
                                                        );
                                                    }}
                                                    type="number"
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <span style={{ margin: "0 10px" }}>~</span>
                                <Grid item xs={6}>
                                    <Controller
                                        name="price_max"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl variant="standard">
                                                <TextField
                                                    {...field}
                                                    label={"Max price"}
                                                    size="small"
                                                    onBlur={(event) => {
                                                        setValue(
                                                            "price_max",
                                                            event.target.value
                                                                ? event.target.value.trim()
                                                                : ""
                                                        );
                                                    }}
                                                    type="number"
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        );
                    } else if (headCells[headCell].id === "order_date") {
                        formFilter.push(
                            <Grid
                                item
                                xs={4}
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: 25,
                                }}
                            >
                                <Grid item xs={6}>
                                    <Controller
                                        name="order_start"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl variant="standard">
                                                <TextField
                                                    {...field}
                                                    label={"Order start"}
                                                    type="date"
                                                    size="small"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onBlur={(event) => {
                                                        setValue(
                                                            event.target.id,
                                                            event.target.value
                                                                ? event.target.value.trim()
                                                                : ""
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <span style={{ margin: "0 10px" }}>~</span>
                                <Grid item xs={6}>
                                    <Controller
                                        name={"order_end"}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl variant="standard">
                                                <TextField
                                                    {...field}
                                                    label={"Order end"}
                                                    type="date"
                                                    size="small"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onBlur={(event) => {
                                                        setValue(
                                                            event.target.id,
                                                            event.target.value
                                                                ? event.target.value.trim()
                                                                : ""
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        );
                    } else {
                        formFilter.push(
                            <Grid item xs={4} key={index}>
                                <Controller
                                    name={headCells[headCell].id}
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl variant="standard">
                                            <TextField
                                                {...field}
                                                label={t(
                                                    headCells[headCell].label
                                                )}
                                                size="small"
                                                onBlur={(event) => {
                                                    setValue(
                                                        headCells[headCell].id,
                                                        event.target.value
                                                            ? event.target.value.trim()
                                                            : ""
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        );
                    }
                }
            }
        });

        return formFilter;
    }, []);

    const onFinish = (value) => {
        setSearchFiled(value);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onFinish)}>
                <Grid
                    container
                    sx={{ margin: 0, padding: 1, width: "100%" }}
                    spacing={10}
                >
                    {FORM_FILTER}
                    <div className="d-flex w-100">
                        <Button
                            variant="contained"
                            type="submit"
                            className="m-1"
                            style={{ background: "#28a745" }}
                        >
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            type="reset"
                            className="m-1 btn-cancel"
                            onClick={() => {
                                reset();
                                setSearchFiled({});
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </Grid>
            </form>
        </div>
    );
};

export default FormFilter;
