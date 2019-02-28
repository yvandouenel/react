import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

class Carte extends Component {
  state = {
    show_reponse: false
  };

  handleClose = () => {
    console.log("Dans HandleClose");

    this.setState({ show: false });
  };

  handleShow = event => {
    console.log("Dans HandleShow");
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
          <div className="float-right mt-4 cursor-pointer">
            <FaAngleRight
              onClick={() =>
                this.props.onMoveCarte(this, this.props.colonne.id, "right")
              }
            />
          </div>
          <div className="float-left mt-4 cursor-pointer">
            <FaAngleLeft
              onClick={() =>
                this.props.onMoveCarte(this, this.props.colonne.id, "left")
              }
            />
          </div>
          <div className="panel panel-default  p-2 ">
            <div
              className="panel-body question m-2 p-2"
              onClick={this.showReponse}
            >
              {this.props.question}
            </div>
            <div className={this.manageClass()}>{this.props.reponse}</div>
          </div>

          {/* modal */}
          <div className="pl-4">
            <Button variant="primary" onClick={this.handleShow}>
              Modifier
            </Button>
            <Button
              variant="warning"
              onClick={() => this.props.onRemove(this, this.props.colonne.id)}
              className="ml-4 bg-danger text-white"
            >
              Supprimer
            </Button>
          </div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier une question ou une réponse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                /* formulaire ici */
                <form onSubmit={this.props.onSubmitQR}>
                  <label>
                    question:
                    <input
                      type="text"
                      className="ml-4"
                      value={this.props.question}
                      onChange={e =>
                        this.props.onChangeQuestion(
                          e,
                          this.props.carte,
                          this.props.colonne
                        )
                      }
                    />
                  </label>
                  <label>
                    Réponse:
                    <input
                      type="text"
                      className="ml-4"
                      value={this.props.reponse}
                      onChange={e =>
                        this.props.onChangeReponse(
                          e,
                          this.props.carte,
                          this.props.colonne
                        )
                      }
                    />
                  </label>
                </form>
              }
            </Modal.Body>
            <Modal.Footer>
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
