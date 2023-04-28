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
import EventCard from './Event';

interface TodayWorkState {
  value: number;
  events: any;
}

export default class TodayWork extends React.Component<ITodayWorkProps, TodayWorkState> {

  constructor(props: ITodayWorkProps) {
    super(props);

    this.state = {
      value: 0,
      events: []
    };
  }

  public async componentDidMount(): Promise<void> {
    const graph = graphfi().using(SPFx(this.props.context));

    const tasks = (await graph.me.tasks())
    const events = await graph.me.events();
    const view4 = await graph.me.calendarView("2023-04-20", "2023-04-21")();
    const files = await graph.me.drive.recent()
    const trending = await graph.me.insights.trending()
    const used = await graph.me.insights.used()
this.setState({
      events: view4
    })
    console.log(tasks)
    console.log(events)
    console.log(view4)
    console.log(files)
    console.log(trending)
    console.log(used)
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
            this.state.events && this.state.events.map((event:any) => {
              return <EventCard key={event.id} evento={event}/>
            })
          }
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Item Three
        </TabPanel>
      </section>
    );
  }
}
