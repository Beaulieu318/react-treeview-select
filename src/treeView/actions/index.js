import {
  INCREMENT,
  CREATE_NODE,
  DELETE_NODE,
  ADD_CHILD,
  REMOVE_CHILD,
  COLLAPSE,
  SELECT,
} from './actionTypes'

export const increment = nodeId => ({
  type: INCREMENT,
  nodeId,
})

export const collapse = nodeId => ({
  type: COLLAPSE,
  nodeId,
})

export const select = (nodeId, parentId) => ({
  type: SELECT,
  nodeId,
  parentId,
})

let nextId = 0
export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: `new_${nextId++}`,
})

export const deleteNode = nodeId => ({
  type: DELETE_NODE,
  nodeId,
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId,
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId,
})
