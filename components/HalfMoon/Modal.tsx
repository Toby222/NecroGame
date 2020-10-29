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
          <div className={"modal " + (this.props.className ?? "")} id={this.props.modalId} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <a href="#" className="close" role="button" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
                {this.props.children}</div>
            </div>
          </div>
        );
      case "button":
        return (
          <a
            aria-label={this.props.modalId}
            href={`#${this.props.modalId}`}
            className={"btn btn-primary " + (this.props.className ?? "")}
            role="button"
          >
            {this.props.children}
          </a>
        );
    }
  }
}
