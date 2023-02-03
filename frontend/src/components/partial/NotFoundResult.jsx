import { ContentPasteSearch } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchField } from "../../hooks/useSearchField";

const NotFoundResult = ({ clear, setComplateSetting }) => {
    const { setSearchFiled } = useSearchField();
    const navigate = useNavigate();
    const clearSearch = useCallback(() => {
        setSearchFiled({});
    }, []);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px auto",
            }}
        >
            <ContentPasteSearch style={{ fontSize: 80, color: "#bac4cd" }} />
            <Typography variant="h6" component="h2">
                No result is found
            </Typography>
            <Button
                variant="text"
                style={{ textTransform: "capitalize" }}
                onClick={() => {
                    clear();
                    setComplateSetting((pre) => !pre);
                }}
            >
                Clear search
            </Button>
        </div>
    );
};

export default NotFoundResult;
