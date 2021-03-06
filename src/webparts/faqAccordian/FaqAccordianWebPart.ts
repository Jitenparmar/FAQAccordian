import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version,DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'FaqAccordianWebPartStrings';
import FaqAccordian from './components/FaqAccordian';
import { IFaqAccordianProps } from './components/IFaqAccordianProps';

export interface IFaqAccordianWebPartProps {
  listName: string;
  choice: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  updateProperty: (value: string) => void;

}

export default class FaqAccordianWebPart extends BaseClientSideWebPart<IFaqAccordianWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFaqAccordianProps > = React.createElement(
      FaqAccordian,
      {
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        title: this.properties.title,
        displayMode: this.displayMode,
        maxItemsPerPage: this.properties.maxItemsPerPage,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                }),
                PropertyPaneSlider('maxItemsPerPage', {
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
