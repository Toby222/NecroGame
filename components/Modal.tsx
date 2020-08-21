import React from "react";

interface Props {
  modalId: string;
  display: "modal" | "button";
}

export default class Modal extends React.Component<Props> {
  render() {
    switch (this.props.display) {
      case "modal":
        return (
          <div className="modal" id="settings" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <a href="#" className="close" role="button" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
                {this.props.children}
              </div>
            </div>
          </div>
        );
      case "button":
        return (
          <a
            href={`#${this.props.modalId}`}
            className="btn btn-primary"
            role="button"
          >
            {this.props.children}
          </a>
        );
    }
  }
}
