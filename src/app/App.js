import React from 'react'
import { TreeView } from '../components/treeView/TreeView'
import { data } from './data'

const headings = ['year', 'farm', 'crop']

export const App = () => {
  return (
    <>
      <TreeView {...{ data, headings }} />
      <TreeView {...{ data, headings }} />
      <TreeView {...{ data, headings }} />
    </>
  )
}
