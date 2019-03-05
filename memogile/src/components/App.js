import * as React from "react";

import { render } from "react-dom";
import { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { config } from "../config/config";
import Tableaux from "./Tableaux";
import User from "./User";
class App extends Component {
  logInfoUSer = text => {
    console.log(text);
  };
  render() {
    return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
          <div className="container">
            <div className="col-md-12" style={{ marginTop: "20px" }}>
              <button
                className="btn btn btn-light"
                style={{ marginLeft: "-15px" }}
                onClick={() => {
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(googleAuthProvider);
                }}
              >
                Identification via Google
              </button>
              {/**<button className="btn btn btn-secondary m-2"
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Authentification anonyme (désactivé)
        </button> */}
              {
                <IfFirebaseAuthed>
                  {() => {
                    return (
                      <button
                        className="btn btn btn-light m-2"
                        onClick={() => {
                          firebase.auth().signOut();
                        }}
                      >
                        Déconnexion
                      </button>
                    );
                  }}
                </IfFirebaseAuthed>
              }
            </div>
          </div>

          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <pre style={{ overflow: "auto" }}>
                  {this.logInfoUSer(
                    JSON.stringify({ isSignedIn, user, providerId }, null, 2)
                  )}
                </pre>
              );
            }}
          </FirebaseAuthConsumer>

          <div>
            {
              <IfFirebaseAuthed>
                {() => {
                  return (
                    <div>
                      {/** <p>Vous êtes identifié</p> */}
                      <Tableaux />
                    </div>
                  );
                }}
              </IfFirebaseAuthed>
            }

            <IfFirebaseAuthedAnd
              filter={({ providerId }) => providerId !== "anonymous"}
            >
              {({ providerId, user }) => {
                return (
                  <div>
                    <User key="1" data={user} />
                    {/*Hello {JSON.stringify({ user }, null, 2)}, */}
                  </div>
                );
              }}
            </IfFirebaseAuthedAnd>
          </div>
        </div>
      </FirebaseAuthProvider>
    );
  }
}

export default App;
