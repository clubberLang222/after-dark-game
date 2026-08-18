import { Component, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  error: boolean;
}

export class ModelErrorBoundary extends Component<Props, State> {
  state: State = { error: false };
  static getDerivedStateFromError(): State {
    return { error: true };
  }
  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}
