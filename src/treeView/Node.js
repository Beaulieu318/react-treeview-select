import React, { Component } from 'react'
import * as actions from './actions'
import { contextWrapper } from './TreeProvider'

class NodeBase extends Component {
  handleIncrementClick = () => {
    const { dispatch, increment, id } = this.props
    dispatch(increment(id))
  }

  handleCollapseClick = () => {
    const { dispatch, collapse, id } = this.props
    dispatch(collapse(id))
  }

  handleSelectClick = parentId => {
    const { dispatch, select, id } = this.props
    dispatch(select(id, parentId))
  }

  handleAddChildClick = e => {
    e.preventDefault()

    const { dispatch, addChild, createNode, id } = this.props
    const childId = dispatch(createNode()).nodeId

    dispatch(addChild(id, childId))
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <li key={childId}>
        <Node id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const {
      title,
      isCollapsed = false,
      isSelected = false,
      parentId,
      childIds,
    } = this.props

    return (
      <div>
        {title}
        {childIds.length > 0 ? (
          <button onClick={this.handleCollapseClick}>
            {isCollapsed ? '+' : '-'}
          </button>
        ) : null}{' '}
        {typeof parentId !== 'undefined' && (
          <button
            onClick={() => {
              this.handleSelectClick(parentId)
            }}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {isSelected === 1 ? '/' : ''}
            {isSelected === 0 ? 'x' : ''}
            {isSelected === 2 ? 'o' : ''}
          </button>
        )}
        <ul>
          {!isCollapsed && childIds.map(this.renderChild)}
          {1 === 0 && (
            <li key="add">
              <button onClick={this.handleAddChildClick}>Add child</button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state[ownProps.id]
}

export const Node = contextWrapper(NodeBase, mapStateToProps, actions)