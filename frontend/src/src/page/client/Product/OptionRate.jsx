import {
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Radio,
    RadioGroup,
    Rating,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const OptionRate = ({
    setSearchFiled,
    name,
    setValue,
    getValues,
    control,
    getProductList,
    setComplateSetting
}) => {
    const [valueRate, setValueRate] = useState(getValues("rate"));

    useEffect(() => {
        setValue("rate", valueRate);
        setComplateSetting(pre => !pre)
        // return () => {
        //     setValue("rate", "");
        // };
    }, [valueRate, setValue, setComplateSetting]);
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={
                <ListSubheader
                    className="search-title"
                    component="div"
                    style={{
                        fontWeight: "bold",
                        padding: "10px 0",
                        lineHeight: "22px",
                        fontSize: "18px",
                    }}
                >
                    Rating
                </ListSubheader>
            }
        >
            {
                <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="standard">
                            <RadioGroup>
                                {[5, 4, 3, 2, 1].map((value) => {
                                    return (
                                        <FormControlLabel
                                            {...field}
                                            key={value}
                                            control={
                                                <Radio
                                                    value={value}
                                                    style={{ display: "none" }}
                                                    onClick={() => {
                                                        if (
                                                            field.value == value
                                                        ) {
                                                            field.onChange("");
                                                            setValueRate("");
                                                        } else {
                                                            field.onChange(
                                                                value
                                                            );
                                                            setValueRate(value);
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Rating
                                                    value={value}
                                                    readOnly
                                                    className={`${
                                                        getValues("rate") == value
                                                            ? "rate__active"
                                                            : ""
                                                    }`}
                                                />
                                            }
                                            style={{ marginLeft: 0 }}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            }
        </List>
    );
};

export default OptionRate;
