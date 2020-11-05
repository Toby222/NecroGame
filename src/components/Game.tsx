import React from "react";
import { version } from "package.json";

import { Player } from "src/types/Player";
import { Time } from "src/types/Time";
import { Message } from "src/types/Message";

import * as Flags from "src/types/Flag";
import * as Actions from "src/types/Action";
import * as Buttons from "src/types/Button";
import * as Resources from "src/types/Resource";
import * as Conditions from "src/types/Condition";

import { halfmoon } from "src/util/HalfMoon";

import { TabLink } from "./Tabs/Tab";
import { ControlsTab } from "./Tabs/Controls/ControlsTab";
import { SummoningTab } from "./Tabs/Summoning/SummoningTab";

import Sidebar from "./HalfMoon/Sidebar";
import { Modal } from "./HalfMoon/Modal";

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
    this.setActiveTab("controls");
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

  switchTab(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const targetID = event.currentTarget.getAttribute("data-tabid");
    if (!targetID) return console.warn(`Tried switching tabs without ID`);
    this.setActiveTab(targetID);
  }

  private setActiveTab(id: string) {
    const targetTab = document.querySelector<HTMLDivElement>(`.tabcontent#${id}`);
    if (!targetTab) return console.warn(`Tried to switch to unknown tab "${id}"`);

    document.querySelectorAll<HTMLDivElement>("div.tabcontent").forEach((tab) => (tab.style.display = "none"));

    document.querySelectorAll<HTMLDivElement>("div.tabs > button.tablink").forEach((tablink) => tablink.toggleAttribute("active"));

    targetTab.style.display = "block";
  }

  render() {
    return (
      <main>
        <div id="modals">
          <Modal modalId="settings">
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
            <nav className="tabs">
              <TabLink tabId="controls" game={this}>
                Controls
              </TabLink>
              <TabLink tabId="summoning" game={this}>
                Summoning
              </TabLink>
            </nav>
            <ControlsTab tabId="controls" buttons={this.buttons} game={this} />
            <SummoningTab tabId="summoning" game={this} />
          </div>
        </div>
        <footer className="z-10">
          <a href="https://github.com/Toby222/NecroGame">source</a>
          <div className="us-none">{`Version: ${version}`}</div>
        </footer>
      </main>
    );
  }
}
