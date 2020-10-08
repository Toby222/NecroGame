import { Player } from "../types/Player";
import { Time } from "../types/Time";
import { Message } from "../types/Messages";

import * as Flags from "../types/Flags";
import * as Actions from "../types/Actions";
import * as Buttons from "../types/Buttons";
import * as Resources from "../types/Resources";
import * as Conditions from "../types/Conditions";

import { halfmoon } from "../util/HalfMoon";

import ControlContainer from "./ControlContainer";
import ResourceContainer from "./ResourceContainer";
import PlayerContainer from "./PlayerContainer";
import MessagesContainer from "./MessagesContainer";

import Modal from "./Modal";

import React from "react";

import { version } from "../package.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let mainLoop: NodeJS.Timeout;

export class Model extends React.Component {
  // Example values
  actionsQueue: Actions.DelayedAction[] = [];
  conditions = new Array<Conditions.Condition>();
  flags = new Flags.Flags();
  buttons: typeof Buttons.BaseButton[] = [
    Buttons.AlterTime,
    Buttons.UnAlterTime,
    Buttons.Dig,
    Buttons.TestDelayedActions,
  ];
  messages: Message[] = [];
  player: Player = new Player();
  resources: typeof Resources.BaseResource[] = [];
  time: Time = new Time();

  togglePause() {
    this.flags.set(Flags.Paused, !this.flags.get(Flags.Paused));
    this.forceUpdate();
  }

  // Basically constructor for order purposes
  componentDidMount() {
    this.flags.set(Flags.Paused, false);
    mainLoop = setInterval(this.tick.bind(this), 1000);
  }

  // Basically destructor for order purposes
  componentWillUnmount() {
    clearInterval(mainLoop);
  }

  tick() {
    if (this.flags.get(Flags.Paused)) return;
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
      this.flags.set(Flags.AlterTimeFactor, val);
    } else {
      this.flags.delete(Flags.AlterTimeFactor);
    }
  }

  performActions(...actions: Actions.Action[]) {
    if (this.flags.get(Flags.Paused) ?? true) {
      for (const action of actions) {
        if (
          action instanceof Actions.SetFlag &&
          action.flag === Flags.Paused &&
          Boolean(action.value) === false
        ) {
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
          <div className="sidebar">
            <div className="row">
              <Modal display="button" className="col-auto" modalId="settings">
                <FontAwesomeIcon icon="cog" />
              </Modal>
              <button
                className="btn btn-primary col-auto"
                onClick={this.togglePause.bind(this)}
              >
                <>
                  {Boolean(this.flags.get(Flags.Paused)) ? (
                    <FontAwesomeIcon icon="play" />
                  ) : (
                    <FontAwesomeIcon icon="pause" />
                  )}
                </>
              </button>
            </div>
            <>
              {this.flags.get(Flags.AlterTime) ?? false ? (
                <>
                  <div className="sidebar-divider" />
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Time factor"
                    onInput={this.trySetTimeFactor.bind(this)}
                  />
                </>
              ) : (
                <></>
              )}
            </>
            <div className="sidebar-divider" />
            <ResourceContainer resources={this.resources} />
            <div className="sidebar-divider" />
            <PlayerContainer time={this.time} player={this.player} />
            <div className="sidebar-divider" />
            <MessagesContainer messages={this.messages} />
            <footer>
              <a href="https://github.com/Toby222/NecroGame">source</a>
              <div>Version: {version}</div>
            </footer>
          </div>
          <div className="content-wrapper">
            <ControlContainer buttons={this.buttons} model={this} />
          </div>
        </div>
      </main>
    );
  }
}
