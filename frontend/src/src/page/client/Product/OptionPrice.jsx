import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const OptionPrice = ({
    setSearchFiled,
    searchField,
    reset,
    setValue,
    getValues,
    control,
    getProductList,
    handleSubmit,
    setComplateSetting
}) => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "25px 0 10px 0",
                }}
            >
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
                                        event.target.value
                                            ? event.target.value.trim()
                                            : ""
                                    );
                                }}
                                type="number"
                                onChange={(event) =>
                                    setValue(
                                        event.target.name,
                                        event.target.value
                                    )
                                }
                                className="ligth__mode"
                            />
                        </FormControl>
                    )}
                />

                <span style={{ margin: "0 10px" }}>~</span>
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
                                        event.target.name,
                                        event.target.value
                                            ? event.target.value.trim()
                                            : ""
                                    );
                                }}
                                type="number"
                                onChange={(event) =>
                                    setValue(
                                        event.target.name,
                                        event.target.value
                                    )
                                }
                                className="ligth__mode"
                            />
                        </FormControl>
                    )}
                />
            </div>
            <div className="d-flex w-100">
                <Button
                    variant="contained"
                    type="submit"
                    style={{ background: "#28a745", marginRight: 5 }}
                    size="small"
                    onClick={handleSubmit(getProductList)}
                >
                    Apply
                </Button>
                <Button
                    variant="contained"
                    type="reset"
                    className="bg-gray-100"
                    size="small"
                    onClick={() => {
                        setValue("price_min", "");
                        setValue("price_max", "");
                        // setValue('group_category', '');
                        // setValue('category_id', []);
                        // setValue('attribute', []);
                        // setValue('rate', '');
                        // setValue('price_min', '');
                        // setValue('order', '1');
                        setComplateSetting((pre) => !pre);
                    }}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
};

export default OptionPrice;
