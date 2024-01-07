import {useState,useEffect} from 'react';
import CommentSection from './components/CommentSection';
import CommentsList from './components/CommentsList';
import useCommentNode from './hooks/useCommentNode';
import { sortAscendingOrder, sortDescendingOrder } from './utils/sorting';
import './App.css'
function App() {
  const [commentsData, setCommentsData] = useState({
    id:'1',
    items:[]
  });

  const [inputComment, setInputComment] = useState({
    name:'',
    comment:''
  });

  const [dateSort, setDateSort] = useState(true);

  const { insertNode, editNode, deleteNode } = useCommentNode();

  const getData = ()=>{
    const localStorageCommentData = JSON.parse(localStorage.getItem("comment_data"));
    if (localStorageCommentData) {
      if(dateSort){
        sortDescendingOrder(localStorageCommentData);
      }
      else {
        sortAscendingOrder(localStorageCommentData);
      }
      setCommentsData(localStorageCommentData)
    }
    
    
  }

  const handleInsertNode = (folderId, item, isParentComment) => {
    if(!item.name.trim() || !item.comment.trim()){
      alert("Name or Comment cannot be empty!");
      return;
    }
    const finalStructure = insertNode(commentsData, folderId, item, isParentComment);
    localStorage.setItem('comment_data',JSON.stringify(finalStructure));
    getData()
  };

  const handleEditNode = (folderId, value) => {
    if(!value.trim()){
      alert("Comment cannot be empty!");
      return;
    }
    const finalStructure = editNode(commentsData, folderId, value);
    localStorage.setItem('comment_data',JSON.stringify(finalStructure));
    getData()
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    localStorage.setItem('comment_data',JSON.stringify(temp));
    getData();
  };

  const handleOnClick = ()=>{
    const folderId = '1';
    handleInsertNode(folderId,inputComment, true)
    setInputComment({
      name:'',
      comment:''
    })
  }

  useEffect(()=>{
    getData();
  },[dateSort])

  return (
    <div className='App'>
      <CommentSection
      onChangeComment={setInputComment}
      label="Comment"
      handleOnClick={handleOnClick}
      input={inputComment}
      />
      <div className='sorting' onClick={()=>{setDateSort(!dateSort)}}>
        <span>{`sort by: Date and Time ${dateSort ? '⬆' : '⬇'}`}</span>
      </div>
      <div style={{marginLeft:"32px"}}>
        {commentsData.items.map((comment)=>{
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
    </div>
  );
}

export default App;



