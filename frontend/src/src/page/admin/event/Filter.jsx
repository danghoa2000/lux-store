import { ArrowLeft, ArrowRight, Delete, DoubleArrow, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, KeyboardDoubleArrowRightOutlined, KeyboardDoubleArrowRightRounded, KeyboardDoubleArrowRightTwoTone, ReportProblem } from '@mui/icons-material';
import { Box, Card, FilledInput, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Filter = (props) => {
    const {
        item,
        arrowLeft,
        title,
        setItem,
        addToSelectedList,
        removeFromSelectedList,
    } = props;
    const [name, setName] = useState('');
    const [filteredItems, setFilteredItems] = useState(item);
    const handleChange = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        setFilteredItems(item);
        if (name && name.length > 0) {
            setFilteredItems(
                item.filter((item) => {
                    return item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
                }),
            );
        }
    }, [item, name])
    return (
        <Box sx={{ minWidth: 275 }}>
            <Typography
                textAlign="center"
                color="white"
                style={{ padding: 10 }}
            >
                {title}
            </Typography>
            <Card variant="outlined">
                <Paper variant="outlined" >
                    <TextField
                        label="Product name"
                        placeholder="search..."
                        multiline
                        variant="filled"
                        value={name}
                        onChange={handleChange}
                    />
                    <div>

                        <List
                            subheader={<ListSubheader>Product name</ListSubheader>}
                            style={{ height: 300, overflow: 'auto' }}
                        >
                            {
                                filteredItems.length > 0 ? filteredItems.map
                                    (
                                        element =>
                                            <ListItem
                                                key={element.id}
                                                disablePadding
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete" disabled={element?.selected}
                                                        onClick={() =>
                                                            arrowLeft ? addToSelectedList(element) : removeFromSelectedList(element)}
                                                    >
                                                        {arrowLeft ?
                                                            <KeyboardDoubleArrowRight style={{ color: element?.selected ? "#a0a4a9" : "#1890ff" }} />
                                                            :
                                                            <KeyboardDoubleArrowLeft style={{ color: "#1890ff" }} />
                                                        }
                                                    </IconButton>
                                                }
                                            >
                                                <ListItemButton>
                                                    <ListItemText primary={element.name} />
                                                </ListItemButton>
                                            </ListItem>
                                    )
                                    : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0a4a9' }}><ReportProblem style={{ width: 35, height: 35 }} /> No data   </div>
                                    )
                            }
                        </List>
                    </div>
                </Paper>
            </Card>
        </Box>
    );
};

export default Filter;