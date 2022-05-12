import React from "react";

class FederatedWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }
  componentDidCatch(_error, _errorInfo) {
    // logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.error || <div>Something went wrong.</div>;
    }
    return (
      <React.Suspense fallback={this.props.delayed || <div />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}

export default FederatedWrapper;
