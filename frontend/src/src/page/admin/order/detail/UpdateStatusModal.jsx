import { Button, CircularProgress, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { STATUS_ORDER } from "../../../../../constants/constants";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const UpdateStatusModal = ({handleUpdate, handleSubmit, control, loading}) => {
    const [t] = useTranslation();
    return (
        <div>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign={"center"}
                color="#fff"
            >
                Update order progress
            </Typography>
            <Grid
                container
                sx={{ margin: 0, padding: 1, width: "100%" }}
                spacing={10}
            >
                <Grid item xs={12}>
                    <Controller
                        name={"order_status"}
                        control={control}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <Select
                                    {...field}
                                    label={"Order status"}
                                    size="small"
                                >
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

                <Button
                    variant="contained"
                    className="m-1"
                    style={{ textTransform: "none", maxWidth: "100%" }}
                    onClick={handleSubmit(handleUpdate)}
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
            </Grid>
        </div>
    );
};

export default UpdateStatusModal;
