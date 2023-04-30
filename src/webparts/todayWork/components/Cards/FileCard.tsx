/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { date_TO_String } from '../../Utils/Utils';

export default function FileCard(props: { file: any }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom:1.5 }}>
            <CardContent>
                <Typography sx={{mb: 1.5, wordWrap:'break-word'}} component="div">
                    <a href='#' onClick={() => window.open(props.file.webUrl)}>{props.file.remoteItem.name} ({((props.file.remoteItem.size / 1024) / 1024).toFixed(2)} MB)</a>
                </Typography>
                <Typography sx={{mt: 1.5 }} color="text.secondary">
                   {date_TO_String(props.file.remoteItem.lastModifiedDateTime)}
                </Typography>
            </CardContent>

        </Card>
    );
}