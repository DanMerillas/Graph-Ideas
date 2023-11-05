/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function FileCard(props: { file: any }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom:1.5 }}>
            <CardContent>
                <Typography sx={{wordWrap:'break-word'}} component="div">
                    <a href='#' onClick={() => window.open(props.file.webUrl)}>{props.file.remoteItem.name} </a>({((props.file.remoteItem.size / 1024) / 1024).toFixed(2)} MB)
                </Typography>
            </CardContent>

        </Card>
    );
}