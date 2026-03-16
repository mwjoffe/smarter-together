import React, { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-20 bg-red-900/20 text-red-200 font-mono h-screen">
          <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
          <pre className="whitespace-pre-wrap">{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
