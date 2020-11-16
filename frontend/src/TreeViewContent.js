import React, {useState} from "react";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {TreeItem, TreeView} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import {getCheckbox, getIcon} from "./helpers/IconHelpers";

//TODO: Add a checkbox for selected nodes
// Basically if I click on a node, I select it with checkbox

function renderTree(file, selected_nodes) {
  return (
    <TreeItem nodeId={file.id}
              key={file.id}
              label={<div>{getCheckbox(file, selected_nodes)}{getIcon(file.mimeType)}{file.name}</div>}>
      {Array.isArray(file.children) && file.mimeType === "application/vnd.google-apps.folder" ? file.children.map((node) => renderTree(node, selected_nodes)) : null}
    </TreeItem>
  )
}

const useStyles = makeStyles((theme) => ({
  tree: {
    height: '100%',
    flexGrow: 1,
    maxWidth: '100%',
  },
}));

function TreeViewContent(props) {
  const classes = useStyles();
  const [expandedNodes, setExpanded] = useState([]);
  const [selectedNodes, setSelected] = useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIDs) => {
    let newSelectedNodes = [...selectedNodes]
    // this triggers whenever a node is clicked
    console.log(nodeIDs)

    nodeIDs.forEach(
      (node, index) => {
        if (!newSelectedNodes.includes(node))
          newSelectedNodes.push(node)
      }
    )
    setSelected(newSelectedNodes)
    console.log(selectedNodes)
  };

  return (
    <TreeView
      className={classes.tree}
      defaultCollapseIcon={<ArrowDropUp/>}
      defaultExpandIcon={<ArrowDropDown/>}
      defaultExpanded={props.files.id}
      expanded={expandedNodes}
      selected={selectedNodes}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      multiSelect
    >
      {renderTree(props.files, selectedNodes)}
    </TreeView>
  )
}

export default TreeViewContent;
