/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'TodayWorkWebPartStrings';
import TodayWork from './components/TodayWork';
import { ITodayWorkProps } from './components/ITodayWorkProps';
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';

export interface ITodayWorkWebPartProps {
  description: string;
}

export default class TodayWorkWebPart extends BaseClientSideWebPart<ITodayWorkWebPartProps> {

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected async onInit() {
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  public async render(): Promise<void> {


    const element: React.ReactElement<ITodayWorkProps> = React.createElement(
      TodayWork,
      {
        userDisplayName: this.context.pageContext.user.displayName,
        context:this.context 
      }
    );

    ReactDom.render(element, this.domElement);
  }

  


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
