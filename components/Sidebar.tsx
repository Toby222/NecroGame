import * as Flags from "../types/Flags";

import ResourceContainer from "./ResourceContainer";
import PlayerContainer from "./PlayerContainer";
import MessagesContainer from "./MessagesContainer";
import Game from "./Game";

import Modal from "./Modal";

import React from "react";

import { version } from "../package.json";

interface SidebarProps {
  game: Game;
}

export class Sidebar extends React.Component<SidebarProps> {
  render() {
    const game = this.props.game;
    return (
      <div className="sidebar d-flex flex-column">
        <div className="row flex-row">
          <Modal display="button" className="col-auto" modalId="settings">
            <i className="nf nf-cogs" />
          </Modal>
          <button className={"btn btn-primary col-auto"} onClick={game.togglePause.bind(game)}>
            <i className={"nf nf-" + (Boolean(game.flags.get(Flags.Paused)) ? "play" : "pause")} />
          </button>
        </div>
        <>
          {game.flags.get(Flags.AlterTime) ?? false ? (
            <>
              <div className="sidebar-divider row" />
              <input className="form-control row" type="number" placeholder="Time factor" onInput={game.trySetTimeFactor.bind(game)} />
            </>
          ) : (
            <></>
          )}
        </>
        <div className="sidebar-divider row" />
        <ResourceContainer resources={game.resources} />
        <div className="sidebar-divider row" />
        <PlayerContainer time={game.time} player={game.player} />
        <div className="sidebar-divider row" />
        <MessagesContainer messages={game.messages} />
        <footer>
          <a href="https://github.com/Toby222/NecroGame">source</a>
          <div className="us-none">Version: {version}</div>
        </footer>
      </div>
    );
  }
}

export default Sidebar;
