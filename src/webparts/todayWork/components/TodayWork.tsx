/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import styles from './TodayWork.module.scss';
import { ITodayWorkProps } from './ITodayWorkProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/planner";
import "@pnp/graph/users";
import '@pnp/graph/calendars';
import "@pnp/graph/onedrive"
import "@pnp/graph/insights";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from './TabComponent';
import EventCard from './Cards/EventCard';
import Carousel from 'react-material-ui-carousel'
import CircularProgress from '@mui/material/CircularProgress';
import TaskCard from './Cards/TaskCard';
import FileCard from './Cards/FileCard';
import { Button } from '@mui/material';

interface TodayWorkState {
  value: number;
  events: any;
  tasks: any;
  files: any;
  filesPaged: any;
  currentTask:string;
  loadingEvents: boolean;
}

export default class TodayWork extends React.Component<ITodayWorkProps, TodayWorkState> {

  constructor(props: ITodayWorkProps) {
    super(props);

    this.state = {
      value: 0,
      events: [],
      tasks: [],
      files: [],
      filesPaged: [],
      currentTask:'',
      loadingEvents: true
    };
  }

  public async componentDidMount(): Promise<void> {

    const today = new Date()
    const graph = graphfi().using(SPFx(this.props.context));

    this.obtenerTareas(graph);

    this.ObtenerEventos(graph, today);

    this.obtenerDocumentos(graph);


  }

  private obtenerDocumentos(graph: any) {
    graph.me.drive.recent().then((files: any) => {

      const filesPaged = []
      const filterFiles = files.filter((f: any) => f.file.mimeType !== "application/msonenote")

      for (let i = 0; i < 5; i++)
        filesPaged.push(filterFiles[i])

      this.setState({
        files: filterFiles,
        filesPaged: filesPaged
      });
    });
  }

  private ObtenerEventos(graph: any, today: Date) {
    graph.me.calendarView(today.toLocaleDateString("en-US"), new Date(today.setDate(today.getDate() + 1)).toLocaleDateString("en-US"))().then((events: any) => {

      this.setState({
        events: events,
      });
    });
  }

  private obtenerTareas(graph: any) {
    graph.me.tasks().then((tasks: any) => {
      this.setState({
        tasks: tasks.filter((task: any) => task.percentComplete !== 100).sort(function(o:any){ return new Date( o.createdDateTime ) }),
        loadingEvents: false
      });
    });
  }

  private verMas() {
    const filesPaged = [...this.state.filesPaged]

    

    for (let i = this.state.filesPaged.length; i < (this.state.filesPaged.length + 5); i++)
      filesPaged.push(this.state.files[i])

      this.setState({
        filesPaged:filesPaged
      })
  }

  public a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  public handleChange(event: React.SyntheticEvent, newValue: number): void {
    this.setState({
      value: newValue
    })
  }

  public render(): React.ReactElement<ITodayWorkProps> {
    const {
      userDisplayName

    } = this.props;



    return (
      <section className={styles.todayWork}>
        <div>
          <h2>Hola, {escape(userDisplayName)}!</h2>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={this.state.value} onChange={this.handleChange.bind(this)} aria-label="basic tabs example">

            <Tab className={styles.labels} label="Tareas" {...this.a11yProps(0)} />
            <Tab className={styles.labels} label="Reuniones" {...this.a11yProps(1)} />
            <Tab className={styles.labels} label="Ficheros" {...this.a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={this.state.value} index={0}>
          {
            this.state.loadingEvents ?
              <span className={styles.loading}><CircularProgress /></span>
              :
              this.state.tasks && this.state.tasks.length > 0 ?
              <Carousel animation="slide" autoPlay={false}>
                {
                  
                  this.state.tasks && this.state.tasks.map((task: any) => {
                    return <TaskCard key={task.bucketId} tarea={task}/>
                  })
                 
                }
              </Carousel>
 :
                  <p>No hay tareas</p>
          }
        </TabPanel>

        <TabPanel value={this.state.value} index={1}>
              
          {
                this.state.events && this.state.events.length > 0 ?
            <Carousel animation="slide" autoPlay={false}>
          
                {this.state.events && this.state.events.map((event: any) => {
                  return <EventCard key={event.id} evento={event} />
                })}
                
              
            </Carousel>
            :
                <p>No hay eventos</p>
          }
          

        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
        
          {

            this.state.filesPaged && this.state.filesPaged.map((file: any) => {
              return <FileCard key={file.id} file={file} />
            })
          }
          {
             this.state.filesPaged &&  this.state.filesPaged.length > 0 ?
            <Button variant="contained" onClick={this.verMas.bind(this)}>Ver más</Button>
            :
            <p>No hay documentos en este momento</p>
          }
          
        </TabPanel>
      </section>
    );
  }
}
