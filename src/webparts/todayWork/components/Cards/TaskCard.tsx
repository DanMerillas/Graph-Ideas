/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { date_TO_String } from '../../Utils/Utils';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Grid from '@mui/material/Grid';
import styles from '../TodayWork.module.scss';

export default function TaskCard(props: { tarea: any; }) {
    return (
        <Card sx={{ minWidth: 275, minHeight: 275 }}>
            <CardContent>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mt: 1.5, mb: 2.0 }} component="div">
                    {props.tarea.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                    <Grid container>
                        <Grid item xs={5} className={styles.labels}>
                            Fecha Inicio:
                        </Grid>
                        <Grid item xs={7}>
                            {props.tarea.startDateTime && date_TO_String(new Date(props.tarea.startDateTime))}
                        </Grid>
                    </Grid>

                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                    <Grid container>
                        <Grid item xs={5} className={styles.labels}>
                            Fecha Fin:
                        </Grid>
                        <Grid item xs={7}>
                            {props.tarea.dueDateTime && date_TO_String(new Date(props.tarea.dueDateTime))}
                        </Grid>
                    </Grid>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                    <Grid container>
                        <Grid item xs={5} className={styles.labels}>
                            Porcentaje:
                        </Grid>
                        <Grid item xs={7}>
                            {props.tarea.percentComplete}
                        </Grid>
                    </Grid>

                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'right' }}>
                    {props.tarea.priority < 4 && <PriorityHighIcon />}
                </Typography>

            </CardContent>

        </Card>
    );
}