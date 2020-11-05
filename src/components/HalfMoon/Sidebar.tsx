import * as Flags from "../../types/Flags";

import { ResourceContainer } from "../ResourceContainer";
import { StatsContainer } from "../StatsContainer";
import { MessagesContainer } from "../MessagesContainer";
import { Game } from "../Game";

import { ModalButton } from "./Modal";

import React from "react";

interface SidebarProps {
  game: Game;
}

export class Sidebar extends React.Component<SidebarProps> {
  render() {
    const game = this.props.game;
    return (
      <div id="sidebar" className="sidebar d-flex flex-column z-0">
        <div id="meta-buttons" className="row flex-row">
          <ModalButton className="btn-lg btn-square m-5 font-size-24 col-auto nf nf-cogs" modalId="settings" />
          <button
            aria-label={game.flags.get(Flags.Paused.Instance) ? "resume" : "pause"}
            className={"btn btn-lg m-5 btn-primary btn-square col-auto nf nf-" + (game.flags.get(Flags.Paused.Instance) ? "play" : "pause")}
            onClick={() => game.togglePause()}
          />
        </div>
        <div className="sidebar-divider row" />
        {game.flags.get(Flags.AlterTime.Instance) ? (
          <>
            <input className="form-control row" type="number" placeholder="Time factor" onInput={game.trySetTimeFactor.bind(game)} />
            <div className="sidebar-divider row" />
          </>
        ) : (
          <></>
        )}
        <ResourceContainer resources={game.resources} />
        {this.props.game.resources.length > 0 ? <div className="sidebar-divider row" /> : <></>}
        <StatsContainer time={game.time} player={game.player} />
        <div className="sidebar-divider row" />
        <MessagesContainer messages={game.messages} />
      </div>
    );
  }
}

export default Sidebar;
