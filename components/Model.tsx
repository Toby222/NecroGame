import { Player } from "../types/Player";
import { Time } from "../types/Time";
import { Message } from "../types/Messages";

import * as Flags from "../types/Flags";
import * as Actions from "../types/Actions";
import * as Buttons from "../types/Buttons";
import * as Resources from "../types/Resources";

import { halfmoon } from "../util/HalfMoon";

import ControlContainer from "./ControlContainer";
import ResourceContainer from "./ResourceContainer";
import PlayerContainer from "./PlayerContainer";
import MessagesContainer from "./MessagesContainer";

import Modal from "./Modal";

import React from "react";

import { version } from "../package.json";

export class Model extends React.Component {
  flags = new Flags.Flags();
  buttons: typeof Buttons.BaseButton[] = [
    Buttons.Wait,
    Buttons.AlterTime,
    Buttons.UnAlterTime,
    Buttons.Dig,
  ];
  messages: Message[] = [];
  player: Player = new Player();
  resources: typeof Resources.BaseResource[] = [];
  time: Time = new Time();

  trySetTimeFactor(event: React.KeyboardEvent<HTMLInputElement>) {
    const val = Math.trunc(parseInt(event.currentTarget.value));
    if (!isNaN(val)) {
      this.flags.set(Flags.AlterTimeFactor, val);
    } else {
      this.flags.delete(Flags.AlterTimeFactor);
    }
  }

  performActions(...actions: Actions.Action[]) {
    for (const action of actions) {
      action.perform(this);
    }
  }

  render() {
    return (
      <main>
        <div id="modals">
          <Modal display="modal" modalId="settings">
            <h5 className="modal-title">Settings</h5>
            <button className="btn" onClick={halfmoon.toggleDarkMode}>
              Toggle Theme
            </button>
          </Modal>
        </div>
        <div className="page-wrapper with-sidebar">
          <div className="sidebar">
            <Modal display="button" className="row p-0" modalId="settings">
              Settings
            </Modal>
            <div className="sidebar-divider" />
            <input
              className="form-control"
              type="number"
              placeholder="Time factor"
              onKeyUp={this.trySetTimeFactor.bind(this)}
            />
            <div className="sidebar-divider" />
            <ResourceContainer resources={this.resources} />
            <div className="sidebar-divider" />
            <PlayerContainer time={this.time} player={this.player} />
            <footer>
              <a href="https://github.com/toman222/NecroGame">source</a>
              <div>Version: {version}</div>
            </footer>
          </div>
          <div className="content-wrapper d-flex flex-column justify-content-between">
            <ControlContainer buttons={this.buttons} model={this} />
            <MessagesContainer messages={this.messages} />
          </div>
        </div>
      </main>
    );
  }
}

class TimeAction {
  time: number;
  action: Actions.Action;

  constructor(ticks: number, action: Actions.Action) {
    this.time = ticks;
    this.action = action;
  }

  trigger(model: Model): boolean {
    if (this.time <= model.time.seconds) {
      this.action.perform(model);
      return true;
    }
    return false;
  }
}
