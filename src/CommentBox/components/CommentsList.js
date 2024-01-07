import {useState} from 'react';
import CommentSection from './CommentSection';
import './styles.css';
import { ReactComponent as DeleteIcon } from '../assets/deleteIcon.svg'
import formatDate from '../utils/formateDate';
import EditComment from './EditComment';
const CommentsList = ({
    comment={},
    handleInsertNode,
    handleEditNode,
    handleDeleteNode
})=>{
    const [showReply, setShowReply] = useState(false)
    const [inputReply, setInputReply] = useState({
        name:'',
        comment:'',
    })
    const [editMode, setEditMode] = useState({
        comment:comment.comment,
        showEdit:false
    });

    const handleReply = ()=>{
        handleInsertNode(comment.id,inputReply,false)
        setInputReply({
            name:'',
            comment:''
        })
        setShowReply(false);
    }
    const handleEditOnClick = ()=>{
        handleEditNode(comment.id,editMode.comment);
        setEditMode((pre)=>({...pre, showEdit:false }))
    }
    const handleDeleteOnClick = ()=>{
        handleDeleteNode(comment.id);
    }
    return (
        <>
        <div className="comment_container">
            <div className="comment_header">
                <div>
                    {comment.name}
                </div>
                <div className='date_data'>
                    {formatDate(comment.date)}
                </div>
            </div>
            <div className="comment_body">
                {editMode.showEdit ? (
                    <EditComment
                    editMode={editMode}
                    setEditMode={setEditMode}
                    handleEditOnClick={handleEditOnClick}
                    />
                ):(comment.comment)}
             </div>
             <div className="comment_footer">
                {comment.isParentComment && (
                    <div className='text_button' onClick={()=>{setShowReply(true)}}>Reply</div>
                )}
                {!editMode.showEdit && (
                <div className='text_button' onClick={()=>{setEditMode((pre)=>({...pre, showEdit:true }))}}>Edit</div>
                )}
             </div>
             <DeleteIcon height="20px"  className='delete_icon' onClick={handleDeleteOnClick}/>
        </div>
        {showReply ? (
            <CommentSection
            onChangeComment={setInputReply}
            label="Reply"
            handleOnClick={handleReply}
            input={inputReply}
            />
        ): null}
        <div className="nested_container">
        {comment.items.length && comment.isParentComment ? (
            comment.items.map((item)=>{
                return (
                    <CommentsList
                    key={item.id}
                    comment={item}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                    />
                )
            })
        ): null}
        </div>

        </>
    )
}

export default CommentsList;