import { Player } from "../types/player";
import { BoolFlag } from "../types/flags";
import { Time } from "../types/time";
import { Message } from "../types/messages";

import * as Actions from "../types/actions";
import * as Buttons from "../types/buttons";
import * as Resources from "../types/resource";

import ControlContainer from "./controlContainer";
import ResourceContainer from "./resourceContainer";
import PlayerContainer from "./playerContainer";
import MessagesContainer from "./messagesContainer";

import * as React from "react";

import { version } from "../package.json";

declare global {
  interface Window {
    strum: Function;
  }
}

export class Model extends React.Component {
  boolFlags: Map<BoolFlag, boolean> = new Map<BoolFlag, boolean>();
  buttons: Buttons.Button[] = [Buttons.Wait];
  messages: Message[] = [];
  player: Player = new Player();
  resourceValues: Resources.Resource[] = [];
  time: Time = new Time();

  render() {
    return (
      <div className="impact">
        <main>
          <div className="header">IMPACT</div>
          <span className="time">{`Time: ${this.time}`}</span>
          <div className="body">
            <ResourceContainer resources={this.resourceValues} />
            <ControlContainer
              buttons={this.buttons}
              onsignal={(msg: Msg) => msg.act(this)}
            />
            <PlayerContainer player={this.player} />
          </div>
          <MessagesContainer messages={this.messages} />
        </main>
        <footer>
          <a href="https://github.com/toman222/Impact">source</a>
          <div>Version: {version}</div>
        </footer>
      </div>
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
      for (const [flag, enabled] of model.boolFlags) {
        if (enabled) {
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

const timeactions = [
  new TimeAction(1, new Actions.EnableButton(Buttons.ActivateOxygen)),
  new TimeAction(15, new Actions.AddMessage("It's been 15 SECONDS")),
];

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
