/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./error.css";

class Error extends React.Component<any, any> {
  constructor(props: React.PropsWithChildren<any>) {
    super(props);
    this.state = {
      errorMsg: "",
    };
  }

  static getDerivedStateFromError(error: TypeError) {
    return { errorMsg: error.message };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.errorMsg) {
      return (
        <div className="container-error">
          <h1>Something went wrong.</h1>
          <p data-testid="error-boundary">{this.state.errorMsg}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Error;
