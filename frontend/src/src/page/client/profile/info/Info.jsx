import { Person2 } from "@mui/icons-material";
import {
    Avatar,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ShowSnackbars from "../../../../../components/partial/ShowSnackbars";

const Info = ({
    control,
    setValue,
    account,
    handleSubmit,
    loading,
    handleUpdate,
    status,
    showNoti,
    setShowNoti,
}) => {
    return (
        <div>
            <div
                className="d-flex align-items-center profile__bar__item-active"
                style={{ marginBottom: 20 }}
            >
                <Person2></Person2>
                <Typography
                    variant="h6"
                    margin={"0"}
                    style={{ fontWeight: "bold" }}
                >
                    Profile
                </Typography>
            </div>
            <section
                style={{
                    background: "#fff",
                    padding: "27px",
                }}
            >
                <div style={{}}>
                    <Avatar sx={{ width: 50, height: 50 }}>
                        {account?.info?.full_name ? account?.info?.full_name.split("")[0] : ""}
                    </Avatar>
                </div>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <Grid
                        container
                        sx={{ margin: 0, padding: 1, width: "100%" }}
                        spacing={2}
                    >
                        <Grid item xs={6} className="pl-0">
                            <Controller
                                name={"full_name"}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={"Full name"}
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    "full_name",
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            className="light__mode"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={"email"}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={"Email"}
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    "full_name",
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            className="light__mode"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} className="pl-0">
                            <Controller
                                name={"telephone"}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={"Telephone"}
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    "telephone",
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            className="light__mode"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name={"birthday"}
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="standard">
                                        <TextField
                                            {...field}
                                            label={"Birthday"}
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onBlur={(event) => {
                                                setValue(
                                                    "telephone",
                                                    event.target.value
                                                        ? event.target.value.trim()
                                                        : ""
                                                );
                                            }}
                                            type={"date"}
                                            className="light__mode"
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        className="btn__checkcout"
                        disabled={loading}
                        style={{
                            marginLeft: "0",
                        }}
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
                        Update
                    </Button>
                </form>
            </section>
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

export default Info;
