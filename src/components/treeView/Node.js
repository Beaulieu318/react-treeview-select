import React from 'react'
import * as actions from './actions'
import { mapStateToProps } from './mapStateToProps'
import { contextWrapper } from './TreeProvider'

const NodeBase = props => {
  const {
    title,
    isCollapsed = false,
    isSelected = false,
    id,
    parentId,
    childIds,
    collapse,
    select,
  } = props

  return (
    <div>
      {title}

      {childIds.length > 0 && (
        <button onClick={() => collapse(id)}>{isCollapsed ? '+' : '-'}</button>
      )}

      {typeof parentId !== 'undefined' && (
        <button
          onClick={() => select(id, parentId)}
          style={{ color: 'black', textDecoration: 'none' }}
        >
          {isSelected === 1 && '/'}
          {isSelected === 0 && 'x'}
          {isSelected === 2 && 'o'}
        </button>
      )}

      <ul>
        {!isCollapsed &&
          childIds.map(childId => (
            <li key={childId}>
              <Node id={childId} parentId={id} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export const Node = contextWrapper(NodeBase, mapStateToProps, actions)
