import React from "react";

interface Props {
  modalId: string;
  display: "modal" | "button";
  className?: string;
}

export default class Modal extends React.Component<Props> {
  render() {
    switch (this.props.display) {
      case "modal":
        return (
          <div
            className={"modal " + (this.props.className ?? "")}
            id="settings"
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">{this.props.children}</div>
            </div>
          </div>
        );
      case "button":
        return (
          <a
            href={`#${this.props.modalId}`}
            className={"btn btn-primary p-0 " + (this.props.className ?? "")}
            role="button"
          >
            {this.props.children}
          </a>
        );
    }
  }
}
