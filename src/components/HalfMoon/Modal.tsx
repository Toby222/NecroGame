import React from "react";

interface Props {
  modalId: string;
  className?: string;
}

export class ModalButton extends React.Component<Props> {
  render() {
    return (
      <a aria-label={this.props.modalId} href={`#${this.props.modalId}`} className={"btn btn-primary " + (this.props.className ?? "")} role="button">
        {this.props.children}
      </a>
    );
  }
}

export class Modal extends React.Component<Props> {
  render() {
    return (
      <div className={"modal " + (this.props.className ?? "")} id={this.props.modalId} tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <a href="#" className="close" role="button" aria-label="Close">
              &times;
            </a>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
