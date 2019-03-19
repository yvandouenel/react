import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

class Carte extends Component {
  state = {};
  handleClose = () => {
    console.log("Dans HandleClose");

    this.setState({ show: false });
  };

  handleShow = event => {
    this.setState({ show: true });
  };
  createMarkup = text => {
    return { __html: text };
  };
  reponseHtml = () => {
    return this.props.reponse_html ? "1" : "0";
  };
  /* returnHml = () => {
    if (this.props.reponse_html) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  } */


  render() {
    return (
      <div>
        <div className="border border-warning m-1 p-1 mb-4">
          <div className="float-right mt-4 cursor-pointer">
            <FaAngleRight
              onClick={() =>
                this.props.onMoveCarte(
                  this.props.carte,
                  this.props.colonne,
                  this.props.tableau,
                  "right"
                )
              }
            />
          </div>
          <div className="float-left mt-4 cursor-pointer">
            <FaAngleLeft
              onClick={() =>
                this.props.onMoveCarte(
                  this.props.carte,
                  this.props.colonne,
                  this.props.tableau,
                  "left"
                )
              }
            />
          </div>
          <div className="panel panel-default  p-2 ">
            <div
              className="panel-body question m-2 p-2 cursor-pointer hover-red"
              onClick={e => {
                this.props.onShowReponse(
                  e,
                  this.props.carte,
                  this.props.colonne,
                  this.props.tableau
                );
              }}
            >
              {this.props.question}

            </div>

            {this.props.show_reponse && (
              <div>
                <div className="panel-footer reponse border-left border-success m-2 p-2">

                  {this.props.reponse_html && <div
                    dangerouslySetInnerHTML={this.createMarkup(
                      this.props.reponse
                    )}
                  />}
                  {!this.props.reponse_html && this.props.reponse}

                </div>
                <div className="pl-4">
                  <Button variant="primary" onClick={this.handleShow}>
                    Modifier
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() =>
                      this.props.onRemove(
                        this.props.carte,
                        this.props.colonne,
                        this.props.tableau
                      )
                    }
                    className="ml-4 bg-danger text-white"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* modal */}

          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            size="lg"
            className="modal-large"
          >
            <Modal.Header closeButton>
              <Modal.Title>Modifier une question ou une réponse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                /* formulaire ici */
                <form onSubmit={this.props.onSubmitQR}>
                  <label className="label-large">
                    question:
                    <input
                      type="text"
                      className="ml-4 input-large"
                      value={this.props.question}
                      onChange={e =>
                        this.props.onChangeQuestion(
                          e,
                          this.props.carte,
                          this.props.colonne,
                          this.props.tableau
                        )
                      }
                    />
                  </label>
                  <label className="label-large">
                    Réponse:
                    <textarea
                      type="text"
                      className="ml-4 textarea-large"
                      value={this.props.reponse}
                      onChange={e =>
                        this.props.onChangeReponse(
                          e,
                          this.props.carte,
                          this.props.colonne,
                          this.props.tableau
                        )
                      }
                    />
                  </label>
                  <label className="label-large">
                    HTML interprété ?
                    <input
                      className="ml-2"
                      name="html"
                      type="checkbox"
                      checked={this.reponseHtml() === "1"}
                      onChange={e =>
                        this.props.onChangeHtml(
                          e,
                          this.props.carte,
                          this.props.colonne,
                          this.props.tableau
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
