import { Close } from '@mui/icons-material';
import { Alert, Button, IconButton, Snackbar, Stack } from '@mui/material';
import * as React from 'react';

export default function ShowSnackbars(props) {
    const {
        message,
        type,
        setShowNoti,
    } = props;
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setShowNoti(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message || ''}
                </Alert>
            </Snackbar>
        </div>
    );
}