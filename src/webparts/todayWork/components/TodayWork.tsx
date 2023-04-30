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

interface TodayWorkState {
  value: number;
  events: any;
  tasks: any;
  files: any;
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
      loadingEvents: true
    };
  }

  public async componentDidMount(): Promise<void> {

    const today = new Date()
    const graph = graphfi().using(SPFx(this.props.context));
    graph.me.calendarView(today.toLocaleDateString("en-US"), new Date(today.setDate(today.getDate() + 1)).toLocaleDateString("en-US"))().then((events) => {

      this.setState({
        events: events,
        loadingEvents: false
      })
    })

    graph.me.tasks().then((tasks: any) => {
      this.setState({
        tasks: tasks,
      })
    })

    graph.me.drive.recent().then((files: any) => {
      this.setState({
        files: files.filter((f: any) =>f.file.mimeType !== "application/msonenote")
      })
    })

    // graph.planner.plans().then((plans:any)=>{
    //   graph.me.tasks().then((tasks:any)=>{
    //     console.log(plans)
    //     console.log(tasks)
    //   })
    // }
    // )

    //const events = await graph.me.events();

    //const files = await graph.me.drive.recent()
    //  const trending = await graph.me.insights.trending()
    //  const used = await graph.me.insights.used()

    // console.log(tasks)
    // console.log(files)
    // console.log(trending)
    // console.log(used)
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
            <Tab label="Reuniones" {...this.a11yProps(0)} />
            <Tab label="Tareas" {...this.a11yProps(1)} />
            <Tab label="Ficheros" {...this.a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.value} index={0}>
          {
            this.state.loadingEvents ?
              <span className={styles.loading}><CircularProgress /></span>
              :
              <Carousel animation="slide" autoPlay={false}>
                {
                  this.state.events && this.state.events.map((event: any) => {
                    return <EventCard key={event.id} evento={event} />
                  })
                }
              </Carousel>
          }

        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {

            this.state.tasks && this.state.tasks.map((task: any) => {
              if (task.percentComplete !== 100)
                return <TaskCard key={task.bucketId} tarea={task} />
            })
          }
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          {
            this.state.files && this.state.files.map((file: any) => {
              return <FileCard key={file.id} file={file}/>
            })
          }
        </TabPanel>
      </section>
    );
  }
}
