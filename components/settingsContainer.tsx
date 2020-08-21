import React from "react";
import { halfmoon } from "../util/halfmoon";

interface Props {
  display: "modal" | "button";
}

export default class SettingsContainer extends React.Component<Props> {
  render() {
    switch (this.props.display) {
      case "modal":
        return (
          <div className="modal" id="settingsModal" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <a href="#" className="close" role="button" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
                <h5 className="modal-title">Settings</h5>
                <button className="btn" onClick={halfmoon.toggleDarkMode}>
                  Toggle Theme
                </button>
              </div>
            </div>
          </div>
        );
      case "button":
        return (
          <a href="#settingsModal" className="btn btn-primary" role="button">
            Show settings
          </a>
        );
    }
  }
}
