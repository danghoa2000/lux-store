import React from 'react';

const FormControlGroup = ({ label, content }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            border: '1px solid',
            borderRadius: '7px',
            position: 'relative'
        }}>
            <label htmlFor="" style={{ position: 'absolute', top: -10, left: 10, backgroundColor: '#343a40', padding: '0 10px' }}>
                {label}
            </label>
            {content}
        </div>
    );
};

export default FormControlGroup;