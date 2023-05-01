/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { date_TO_String } from '../../Utils/Utils';

export default function DocumentCard(props: { documento: any }) {
    return (
        <Card sx={{ minWidth: 275, marginBottom:1 }}>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mt:1.5}} component="div">
                    {props.documento.title}
                </Typography>
                <Typography variant="body2">
                    Fecha Inicio: {props.documento.startDateTime && date_TO_String(new Date(props.documento.startDateTime + 'Z'))} 
                </Typography>
                <Typography variant="body2">
                    Fecha Fin: {props.documento.completedDateTime && date_TO_String(new Date(props.documento.completedDateTime + 'Z'))}
                </Typography>
                <Typography variant="body2"  sx={{ mb: 1.5}}>
                    Porcentaje completado: {props.documento.percentComplete}
                </Typography>
            </CardContent>

        </Card>
    );
}