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
        {value => (
          <WrappedComponent
            {...{
              ...props,
              ...value,
              ...actions,
              ...mapStateToProps(value, props),
            }}
          />
        )}
      </Consumer>
    )
  }
}

export const TreeConsumer = Consumer
