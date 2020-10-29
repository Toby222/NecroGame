import { Player } from "../types/Player";
import { Time } from "../types/Time";
import { Message } from "../types/Messages";

import * as Flags from "../types/Flags";
import * as Actions from "../types/Actions";
import * as Buttons from "../types/Buttons";
import * as Resources from "../types/Resources";
import * as Conditions from "../types/Conditions";

import { halfmoon } from "../util/HalfMoon";

import ButtonContainer from "./ButtonContainer";

import Sidebar from "./HalfMoon/Sidebar";
import Modal from "./HalfMoon/Modal";

import React from "react";

let mainLoop: NodeJS.Timeout;

export class Game extends React.Component {
  // Example values
  actionsQueue: Actions.DelayedAction[] = [];
  buttons: typeof Buttons.BaseButton[] = [Buttons.AlterTime, Buttons.UnAlterTime, Buttons.Dig, Buttons.TestDelayedActions];
  conditions: Conditions.Condition[] = [];
  messages: Message[] = [];
  resources: typeof Resources.BaseResource[] = [];

  flags = new Flags.Flags();
  player = new Player();
  time = new Time();

  togglePause() {
    this.flags.set(Flags.Paused.Instance, !this.flags.get(Flags.Paused.Instance));
    this.forceUpdate();
  }

  // Basically constructor for order purposes
  componentDidMount() {
    halfmoon.onDomContentLoaded();
    this.flags.set(Flags.Paused.Instance, false);
    mainLoop = setInterval(this.tick.bind(this), 1000);
  }

  // Basically destructor for order purposes
  componentWillUnmount() {
    clearInterval(mainLoop);
  }

  tick() {
    if (this.flags.get(Flags.Paused.Instance)) return;
    this.time.seconds++;
    for (const [flag, value] of this.flags) {
      if (Flags.TransformationFlag.is(flag) && Boolean(value)) {
        flag.performEffects(this);
      }
    }

    for (const resource of this.resources) {
      resource.amount += resource.delta;
    }

    const oldQueue = this.actionsQueue;
    this.actionsQueue = [];
    for (const delayedAction of oldQueue) {
      if (!delayedAction.perform(this)) {
        this.actionsQueue.push(delayedAction);
      }
    }

    const oldConditions = this.conditions;
    this.conditions = [];
    for (const condition of oldConditions) {
      if (condition.check(this)) {
        condition.action.perform(this);
      } else {
        this.conditions.push(condition);
      }
    }

    for (const button of this.buttons) {
      button.currentCooldown = Math.max(0, --button.currentCooldown);
    }
    this.forceUpdate();
  }

  trySetTimeFactor(event: React.FormEvent<HTMLInputElement>) {
    const val = Math.trunc(parseInt(event.currentTarget.value));
    if (!isNaN(val)) {
      this.flags.set(Flags.AlterTimeFactor.Instance, val);
    } else {
      this.flags.delete(Flags.AlterTimeFactor.Instance);
    }
  }

  performActions(...actions: Actions.Action[]) {
    if (this.flags.get(Flags.Paused.Instance) ?? true) {
      for (const action of actions) {
        if (action instanceof Actions.SetFlag && action.flag === Flags.Paused.Instance && Boolean(action.value) === false) {
          action.perform(this);
        }
      }
    } else {
      for (const action of actions) {
        action.perform(this);
      }
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
          <div className="sticky-alerts" />
          <Sidebar game={this} />
          <div className="content-wrapper">
            <ButtonContainer buttons={this.buttons} model={this} />
          </div>
        </div>
      </main>
    );
  }
}

export default Game;
