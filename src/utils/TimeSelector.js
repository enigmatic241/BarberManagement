import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

const TimeSelector = ({ time, handleTimeChange, availableTimes = ['12:30'] }) => {

    const isTimeAvailable = (selectedTime) => {
        return availableTimes.includes(selectedTime);
    };
    return (
        <div style={{ marginTop: '16px' }} className="time-picker">
            <TextField
                fullWidth
                type="time"
                value={time}
                onChange={handleTimeChange}
                label={'Select Time'}
                defaultValue="07:30"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min

                }}
            />

        </div>
    );
};

export default TimeSelector;