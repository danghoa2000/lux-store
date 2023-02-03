import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#2e3336",
    border: "2px solid #383535",
    boxShadow: 24,
    p: 4,
};
const BasicModal = ({ children, open, setOpen, handleClose, ...props }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ outline: 0 }}
                {...props}
            >
                <Box sx={style}>{children}</Box>
            </Modal>
        </div>
    );
};

export default BasicModal;
