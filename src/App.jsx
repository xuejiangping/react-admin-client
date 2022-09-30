import React,{ Fragment,Component } from 'react'
import { useRoutes } from 'react-router-dom';
import routeRules from './routes/';

export default function App() {
  return (
    <Fragment>
      <ErrorBoundary>
        {useRoutes(routeRules)}
      </ErrorBoundary>
    </Fragment>
  )
}
// 错误边界
class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err) {
    console.log(err)
  }
  render() {
    const { props,state } = this
    return (
      state.hasError ? <h1>出错了！！！！！</h1> : props.children
    )
  }
}
