import React from "react";

import { Game } from "src/components/Game";

export interface TabProps {
  tabId: string;
  game: Game;
}

export abstract class Tab<TProps extends {} = {}> extends React.Component<TabProps & TProps> {
  abstract renderTab(): JSX.Element;

  render() {
    return (
      <div id={this.props.tabId} className="tabcontent">
        {this.renderTab()}
      </div>
    );
  }
}

export class TabLink extends React.Component<TabProps> {
  render() {
    return (
      <button className="tablink btn" data-tabid={this.props.tabId} onClick={(event) => this.props.game.switchTab(event)}>
        {this.props.children}
      </button>
    );
  }
}
