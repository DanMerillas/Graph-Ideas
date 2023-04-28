/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EventCard(props: { evento: any }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.evento.subject}
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                    {props.evento.start.dateTime}
                </Typography>
                <Typography variant="body2"  sx={{ mb: 1.5, fontWeight:'Bold'}}>
                    <a href={props.evento.onlineMeeting.joinUrl} target='_blank' rel="noreferrer" >Conectar Reunión</a>
                </Typography>
                <Typography variant="body2">
                    <div dangerouslySetInnerHTML={{ __html: props.evento.bodyPreview }} />

                </Typography>
            </CardContent>

        </Card>
    );
}