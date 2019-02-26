import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

class Carte extends Component {
  state = {
    question: this.props.question,
    reponse: this.props.reponse,
    show_reponse: false
  };
  handleChangeQuestion = event => {
    this.setState({ question: event.target.value });
    event.preventDefault();
    return false;
  };
  handleChangeReponse = event => {
    this.setState({ reponse: event.target.value });
    event.preventDefault();
    return false;
  };
  handleSubmit = event => {
    alert("Une question a été modifiée: " + this.state.question);
    event.preventDefault();
    return false;
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = event => {
    this.setState({ show: true });
  };

  showReponse = event => {
    if (this.state.show_reponse) this.setState({ show_reponse: false });
    else this.setState({ show_reponse: true });
  };
  manageClass = () => {
    let sr_only = this.state.show_reponse ? "" : " sr-only";
    return "panel-footer reponse border border-success m-2 p-2" + sr_only;
  };
  render() {
    return (
      <div>
        <div className="border border-warning m-1 p-1 mb-4">
          <div className="float-right mt-4">
            <FaAngleRight />
          </div>
          <div className="float-left mt-4">
            <FaAngleLeft />
          </div>
          <div className="panel panel-default  p-2 ">
            <div
              className="panel-body question m-2 p-2"
              onClick={this.showReponse}
            >
              {this.state.question}
            </div>
            <div className={this.manageClass()}>{this.state.reponse}</div>
          </div>

          {/* modal */}
          <div className="pl-4">
            <Button variant="primary" onClick={this.handleShow}>
              Modifier
            </Button>
            <Button
              variant="warning"
              onClick={() => this.props.onRemove(this)}
              className="ml-4"
            >
              Supprimer
            </Button>
          </div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier une question ou une réponse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* formulaire ici */}
              <form onSubmit={this.handleSubmit}>
                <label>
                  question:
                  <input
                    type="text"
                    value={this.state.question}
                    onChange={this.handleChangeQuestion}
                  />
                </label>
                <label>
                  Réponse:
                  <input
                    type="text"
                    value={this.state.reponse}
                    onChange={this.handleChangeReponse}
                  />
                </label>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Fermer
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Carte;
