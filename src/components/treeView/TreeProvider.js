import React from 'react'
import rootReducer from './reducers'

const { Provider, Consumer } = React.createContext({})

export class TreeProvider extends React.Component {
  state = {
    ...this.props.tree,
    dispatch: action => {
      this.setState(state => rootReducer(state, action))
    },
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export function contextWrapper(WrappedComponent, mapStateToProps, actions) {
  return function Wrapper(props) {
    return (
      <Consumer>
        {value => {
          const entries = Object.entries(actions)
          let dispatchedActions = {}

          entries.forEach(([name, fn]) => {
            dispatchedActions[name] = (...args) => value.dispatch(fn(...args))
          })

          return (
            <WrappedComponent
              {...{
                ...props,
                ...value,
                ...dispatchedActions,
                ...mapStateToProps(value, props),
              }}
            />
          )
        }}
      </Consumer>
    )
  }
}

export const TreeConsumer = Consumer
