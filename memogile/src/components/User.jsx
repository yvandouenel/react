import React, { Component } from "react";
class User extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <img
              src={this.props.data.photoURL}
              alt=""
              style={{ width: "100px" }}
            />
          </div>
          <div className="col-md-10 text-white">
            {this.props.data.email} - Identifié par{" "}
            {this.props.data.providerData[0].providerId}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
