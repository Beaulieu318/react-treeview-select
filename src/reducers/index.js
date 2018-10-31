import {
  COLLAPSE,
  SELECT,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE
} from "../actions";

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId];
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId);
    default:
      return state;
  }
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        title: `Node_${action.nodeId}`,
        childIds: []
      };
    case COLLAPSE:
      return {
        ...state,
        isCollapsed: !state.isCollapsed
      };
    case SELECT:
      return {
        ...state,
        isSelected: !state.isSelected,
        childIds: childIds(state.childIds, action)
      };
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      };
    default:
      return state;
  }
};

const getAllDescendantIds = (state, nodeId) =>
  state[nodeId].childIds.reduce(
    (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
    []
  );

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state;
};

const selectMany = (state, ids, isSelected) => {
  state = { ...state };
  state = JSON.parse(JSON.stringify(state));
  ids.forEach(id => (state[id].isSelected = isSelected));
  return state;
};

const getAllSelectedParentIds = (state, nodeId) =>
  state[nodeId].childIds.reduce((acc, childId) => {
    console.log(acc, childId);
    if (state[childId].isSelected) {
      return [...acc, nodeId, ...getAllSelectedParentIds(state, childId)];
    } else {
      return [...acc, ...getAllSelectedParentIds(state, childId)];
    }
  }, []);

export default (state = {}, action) => {
  const { nodeId } = action;
  if (typeof nodeId === "undefined") {
    return state;
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [nodeId, ...descendantIds]);
  }

  if (action.type === SELECT) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return selectMany(
      state,
      [nodeId, ...descendantIds],
      !state[nodeId].isSelected
    );
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  };
};
