import {
  COLLAPSE,
  SELECT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
} from '../actions/actionTypes'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        title: `Node_${action.nodeId}`,
        childIds: [],
      }
    case COLLAPSE:
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      }
    case SELECT:
      return {
        ...state,
        isSelected: !state.isSelected,
        childIds: childIds(state.childIds, action),
      }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) =>
  state[nodeId].childIds.reduce(
    (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
    []
  )

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

const selectMany = (state, parentId, ids, isSelected) => {
  state = { ...state }
  state = JSON.parse(JSON.stringify(state))

  isSelected = isSelected === 0 ? 1 : 0
  state[ids[0]].isSelected = isSelected
  var prevChildSelectedState = null
  for (var i = 0; i < state[parentId].childIds.length; i++) {
    // if child length is 1
    if (state[parentId].childIds.length === 1) {
      state[parentId].isSelected = state[state[parentId].childIds[i]].isSelected
      checkAllParentToPartial(state, parentId, 2)
      break
    }

    if (prevChildSelectedState !== null) {
      if (
        state[state[parentId].childIds[i]].isSelected !== prevChildSelectedState
      ) {
        state[parentId].isSelected = 2
        checkAllParentToPartial(state, parentId, 2)
        break
      } else if (
        state[state[parentId].childIds[i]].isSelected ===
          prevChildSelectedState &&
        i + 1 === state[parentId].childIds.length
      ) {
        state[parentId].isSelected =
          state[state[parentId].childIds[i]].isSelected
        checkAllParentToPartial(
          state,
          parentId,
          state[state[parentId].childIds[i]].isSelected
        )
      }
    }
    prevChildSelectedState = state[state[parentId].childIds[i]].isSelected
  }
  ids.forEach(id => (state[id].isSelected = isSelected))
  return state
}

const getAllSelectedParentIds = (state, nodeId) =>
  state[nodeId].childIds.reduce((acc, childId) => {
    if (state[childId].isSelected) {
      return [...acc, nodeId, ...getAllSelectedParentIds(state, childId)]
    } else {
      return [...acc, ...getAllSelectedParentIds(state, childId)]
    }
  }, [])

const checkAllParentToPartial = (state, parentId, action) => {
  if (getParent(state, parentId) === null) {
    return state
  } else {
    state[parentId].isSelected = isAllChildStateSame(state, parentId)
    checkAllParentToPartial(state, getParent(state, parentId))
  }
}

/* Check all childs are same */

const isAllChildStateSame = (state, parentId) => {
  var isSelected = null
  var prevChildSelectedState = null
  for (var i = 0; i < state[parentId].childIds.length; i++) {
    // if child length is 1
    if (state[parentId].childIds.length === 1) {
      isSelected = state[state[parentId].childIds[i]].isSelected
      break
    }

    // if loop have multiple childs > 1
    if (prevChildSelectedState !== null) {
      if (
        state[state[parentId].childIds[i]].isSelected !== prevChildSelectedState
      ) {
        isSelected = 2
        break
      } else if (
        state[state[parentId].childIds[i]].isSelected === prevChildSelectedState
      ) {
        isSelected = state[state[parentId].childIds[i]].isSelected
      }
    }
    prevChildSelectedState = state[state[parentId].childIds[i]].isSelected
  }

  return isSelected
}

const getParent = (state, id) => {
  var idForMatch = id
  var parentId = null
  for (id in state) {
    if (parentId != null) {
      break
    }
    for (var i = 0; i < state[id].childIds.length; i++) {
      if (state[id].childIds[i] === idForMatch) {
        parentId = state[id].id
        break
      }
    }
  }
  return parentId
}

export default (state = {}, action) => {
  const { nodeId, parentId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [nodeId, ...descendantIds])
  }

  if (action.type === SELECT) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return selectMany(
      state,
      parentId,
      [nodeId, ...descendantIds],
      state[nodeId].isSelected
    )
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action),
  }
}
