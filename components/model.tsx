import { Player } from "../types/Player";
import * as Flags from "../types/Flags";
import { Time } from "../types/Time";
import { Message } from "../types/Messages";

import * as Actions from "../types/Actions";
import * as Buttons from "../types/Buttons";
import * as Resources from "../types/Resource";

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
  buttons: Buttons.Button[] = [Buttons.Wait, Buttons.RevertTime];
  messages: Message[] = [];
  player: Player = new Player();
  resources: Resources.Resource[] = [];
  time: Time = new Time();

  trySetTimeFactor(event: React.KeyboardEvent<HTMLInputElement>) {
    const val = Math.trunc(parseInt(event.currentTarget.value));
    if (!isNaN(val)) {
      this.flags.set(Flags.RevertTimeFactor, val);
    } else {
      this.flags.delete(Flags.RevertTimeFactor);
    }
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}

export interface Msg {
  act(model: Model): void;
}

export class Msg {
  static Tick = class Tick implements Msg {
    private ticks: number;
    constructor(ticks: number) {
      this.ticks = ticks;
    }

    act(model: Model) {
      console.log("[DEBUG] Ticked. Model:", model);
      model.time.seconds += this.ticks;
      for (const [flag, value] of model.flags) {
        if (flag instanceof Flags.BoolFlag && value) {
          flag.performEffects(model);
        }
      }
      applyTimeactions(model);
      model.forceUpdate();
    }
  };

  static PerformAction = class PerformAction {
    action: Actions.Action;

    constructor(action: Actions.Action) {
      this.action = action;
    }

    act(model: Model) {
      this.action.perform(model);
      new Msg.Tick(this.action.timeCost).act(model);
    }
  };

  static Bulk = class Bulk {
    messages: Msg[];

    constructor(messages: Msg[]) {
      this.messages = messages;
    }

    act(model: Model) {
      for (const msg of this.messages) {
        msg.act(model);
      }
    }
  };
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

const timeactions: TimeAction[] = [];

/**
 * Apply Actions that are based on pre-defined timepoints
 * Might be replaced with intro sequence later, where Actions trigger each other with delays somehow, as I don't see any reason to have any other defined Action than that.
 *
 * @param model - The Model to apply the Actions to.
 */
function applyTimeactions(model: Model) {
  for (const timeaction of timeactions) {
    if (timeaction.trigger(model)) {
      timeactions.splice(timeactions.indexOf(timeaction), 1);
    }
  }
}
