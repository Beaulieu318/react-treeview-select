import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
// import generateTree from './generateTree'
import { transformJSONToTree, dataJSON } from './generateTree'
import Node from './containers/Node'
import { TreeView } from './treeView/TreeView'

// const tree = generateTree()
const tree = transformJSONToTree(dataJSON, ['year', 'farm', 'crop'])

const store = createStore(
  reducer,
  tree,
  process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <div>
      <Node id={0} />
      <TreeView {...{ tree }} />
      <TreeView {...{ tree }} />
    </div>
  </Provider>,
  document.getElementById('root')
)
