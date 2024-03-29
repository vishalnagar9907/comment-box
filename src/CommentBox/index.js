import { useState, useEffect } from 'react';
import CommentSection from './components/CommentSection';
import CommentsList from './components/CommentsList';
import useCommentNode from './hooks/useCommentNode';
import { sortAscendingOrder, sortDescendingOrder } from './utils/sorting';

function CommentBox() {
  const [commentsData, setCommentsData] = useState({
    id: '1',
    items: []
  });

  const [inputComment, setInputComment] = useState({
    name: '',
    comment: ''
  });

  const [dateSort, setDateSort] = useState(true);

  const { insertNode, editNode, deleteNode } = useCommentNode();

  const getData = () => {
    const localStorageCommentData = JSON.parse(localStorage.getItem("comment_data"));
    if (localStorageCommentData) {
      if (dateSort) {
        sortDescendingOrder(localStorageCommentData);
      }
      else {
        sortAscendingOrder(localStorageCommentData);
      }
      setCommentsData(localStorageCommentData)
    }


  }

  const handleInsertNode = (folderId, item, isParentComment) => {
    if (!item.name.trim() || !item.comment.trim()) {
      alert("Name or Comment cannot be empty!");
      return;
    }
    const finalStructure = insertNode(commentsData, folderId, item, isParentComment);
    localStorage.setItem('comment_data', JSON.stringify(finalStructure));
    getData()
  };

  const handleEditNode = (folderId, value) => {
    if (!value.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    const finalStructure = editNode(commentsData, folderId, value);
    localStorage.setItem('comment_data', JSON.stringify(finalStructure));
    getData()
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    localStorage.setItem('comment_data', JSON.stringify(temp));
    getData();
  };

  const handleOnClick = () => {
    const folderId = '1';
    handleInsertNode(folderId, inputComment, true)
    setInputComment({
      name: '',
      comment: ''
    })
  }

  useEffect(() => {
    getData();
  }, [dateSort])

  return (
    <>
      <CommentSection
        onChangeComment={setInputComment}
        label="Comment"
        handleOnClick={handleOnClick}
        input={inputComment}
      />
      {commentsData.items.length ? (
        <div className='sorting' onClick={() => { setDateSort(!dateSort) }}>
          <span>{`sort by: Date and Time ${dateSort ? '⬆' : '⬇'}`}</span>
        </div>
      ):null}

      <div style={{ marginLeft: "32px" }}>
        {commentsData.items.map((comment) => {
          return (
            <CommentsList
              key={comment.id}
              comment={comment}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
            />
          )
        })}
      </div>
    </>
  );
}

export default CommentBox;



