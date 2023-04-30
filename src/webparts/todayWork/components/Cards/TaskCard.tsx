/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { date_TO_String } from '../../Utils/Utils';

export default function TaskCard(props: { tarea: any }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom:1 }}>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mt:1.5}} component="div">
                    {props.tarea.title}
                </Typography>
                <Typography variant="body2">
                    Fecha Inicio: {props.tarea.startDateTime && date_TO_String(new Date(props.tarea.startDateTime))} 
                </Typography>
                <Typography variant="body2">
                    Fecha Fin: {props.tarea.completedDateTime && date_TO_String(new Date(props.tarea.completedDateTime))}
                </Typography>
                <Typography variant="body2"  sx={{ mb: 1.5}}>
                    Porcentaje completado: {props.tarea.percentComplete}
                </Typography>
            </CardContent>

        </Card>
    );
}