const useCommentNode = () => {
    const insertNode =  (tree, commentId, item, isParentComment) => {
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          name: item.name.trim(),
          comment:item.comment.trim(),
          isParentComment,
          date: new Date(),
          items: [],
        });
  
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertNode(ob, commentId, item,isParentComment);
      });
  
      return { ...tree, items: latestNode };
    };
  
    const editNode = (tree, commentId, value) => {
      if (tree.id === commentId) {
        tree.comment = value.trim();
        tree.date = new Date();
        return tree;
      }
  
      tree.items.map((ob) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree, id) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useCommentNode;