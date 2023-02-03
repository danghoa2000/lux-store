import { LinearProgress } from "@mui/material";
import React from "react";

const Loading = () => {
    return (
        <div className="d-flex justify-center" style={{ minHeight: 500, width: '100%' }}>
            <LinearProgress style={{ width: '100%' }}/>
        </div>
    );
};

export default Loading;
