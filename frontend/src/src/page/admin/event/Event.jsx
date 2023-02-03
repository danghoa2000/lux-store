import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Button, CircularProgress, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ShowSnackbars from '../../../../components/partial/ShowSnackbars';
import AccordionItem from './AccordionItem';

const Event = (props) => {
    const {
        eventList,
        setEventList,
        productEventList,
        setProductEventList,
        updateProductEvent,
        productList,
        loading,
        showNoti,
        status,
        setStatus,
        setShowNoti,
    } = props;
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h4" gutterBottom>
                    Event
                </Typography>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link to="/admin">
                        Home
                    </Link>
                    <Typography>Event</Typography>
                </Breadcrumbs>
            </div>
            <div className="card__admin">
                <Paper style={{ margin: '-25px' }}>
                    {eventList && eventList.map(item =>
                    (
                        <Accordion style={{ backgroundColor: '#343a40' }} key={item.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id={`panel1a-header-${item?.id}`}
                            >
                                <Typography>{item?.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AccordionItem
                                    productList={productList}
                                    item={item}
                                    setProductEventList={setProductEventList}
                                    productEventList={productEventList}
                                />
                            </AccordionDetails>
                        </Accordion>
                    ))}

                </Paper>
            </div>
            <div className='d-flex justify-content-center w-100'>
                <Button
                    variant="contained"
                    className='m-1'
                    disabled={loading}
                    onClick={() => updateProductEvent()}
                >{loading &&
                    <CircularProgress
                        disableShrink
                        style={{ color: 'white', width: '14px', height: '14px', margin: '0 5px 0 0' }} />}
                    Update
                </Button>
            </div>
            {showNoti && <ShowSnackbars type={status.type} message={status.message} setShowNoti={setShowNoti} />}
        </div>
    );
};

export default Event;