import { SPHttpClient } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";


export interface IFaqAccordianProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  updateProperty: (value: string) => void;
}
