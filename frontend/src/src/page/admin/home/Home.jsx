import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { formatPrice, formatnumber } from "../../../../utils/helper";
import { Controller } from "react-hook-form";
import { CalendarMonth } from "@mui/icons-material";
import { DISPLAY_BY } from "../../../../constants/constants";
import ShowSnackbars from "../../../../components/partial/ShowSnackbars";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const Home = ({
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    options,
    data,
    loading,
    showNoti,
    setStatus,
    status,
    setShowNoti,
    getStatistic,
    orderStatisticData,
    bestSaledStatistic,
    ratingStatistic,
}) => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Home
                </Typography>
            </div>
            <div className="card__admin">
                <form
                    onSubmit={handleSubmit(getStatistic)}
                    style={{ width: "100%" }}
                >
                    <Grid
                        container
                        sx={{ margin: 0, width: "100%", padding: 0 }}
                        spacing={2}
                    >
                        <Grid item xs={3} style={{ paddingLeft: 0 }}>
                            <Controller
                                name="date_from"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label="Date from"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    event.target.name,
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

                        <Grid item xs={3}>
                            <Controller
                                name="date_to"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label="Date to"
                                            type="date"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    event.target.name,
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

                        <Grid item xs={3}>
                            <Controller
                                name="display_by"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <Select {...field} size="small">
                                            <MenuItem value={DISPLAY_BY.DAY}>
                                                Day
                                            </MenuItem>
                                            <MenuItem value={DISPLAY_BY.WEEK}>
                                                Week
                                            </MenuItem>
                                            <MenuItem value={DISPLAY_BY.MONTH}>
                                                Month
                                            </MenuItem>
                                            <MenuItem value={DISPLAY_BY.YEAR}>
                                                Year
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <div className="d-flex w-100" style={{ marginTop: 10 }}>
                            <Button
                                variant="contained"
                                type="submit"
                                style={{
                                    background: "#28a745",
                                    marginRight: 10,
                                }}
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress
                                        disableShrink
                                        style={{
                                            color: "white",
                                            width: "14px",
                                            height: "14px",
                                            margin: "0 5px 0 0",
                                        }}
                                    />
                                )}
                                Search
                            </Button>
                        </div>
                    </Grid>
                </form>
            </div>

            <div
                className="card__admin"
                style={{ position: "relative", minHeight: 500 }}
            >
                <Line
                    style={{ maxHeight: 630 }}
                    options={options}
                    data={data}
                />
            </div>

            <Grid
                container
                sx={{ margin: 0, width: "100%", padding: 0 }}
                spacing={2}
            >
                <Grid item xs={6} style={{ paddingLeft: 0 }}>
                    <div
                        className="card__admin"
                        style={{ position: "relative" }}
                    >
                        <Typography variant="h6" className="color-title">
                            Best saled
                        </Typography>
                        {Object.keys(bestSaledStatistic).length > 0 && (
                            <List>
                                {Object.values(bestSaledStatistic).map(
                                    (item, index) => (
                                        <ListItem key={index} disableGutters>
                                            <ListItemText
                                                primary={`${
                                                    Number(index) + 1
                                                }, ${
                                                    item.name
                                                }: ( ${formatnumber(
                                                    Number(item.total)
                                                )} )`}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        )}
                        <Divider light />
                        <Typography variant="h6" className="color-title">
                            Rating
                        </Typography>
                        {Object.keys(ratingStatistic).length > 0 && (
                            <List>
                                {Object.values(ratingStatistic).map(
                                    (item, index) => (
                                        <ListItem key={index} disableGutters>
                                            <ListItemText
                                                primary={`${
                                                    Number(index) + 1
                                                }, ${item.name}: (${
                                                    Number(item.rating).toFixed(
                                                        1
                                                    ) || 0
                                                })`}
                                            />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        )}
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div
                        className="card__admin"
                        style={{ position: "relative", minHeight: 350 }}
                    >
                        <Typography variant="h6" className="color-title">
                            Statistic order
                        </Typography>

                        <Doughnut
                            data={orderStatisticData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                aspectRatio: 2,
                                plugins: {
                                    datalabels: {
                                        display: (ctx, data) => {
                                            let index = ctx.dataIndex;
                                            if (
                                                Number(
                                                    ctx.dataset.data[index]
                                                ) !== 0
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        },
                                        color: "white",
                                        padding: 5,
                                    },
                                },
                            }}
                        />
                    </div>
                </Grid>
            </Grid>

            {showNoti && (
                <ShowSnackbars
                    type={status.type}
                    message={status.message}
                    setShowNoti={setShowNoti}
                />
            )}
        </div>
    );
};

export default Home;
