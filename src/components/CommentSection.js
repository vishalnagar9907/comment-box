import './styles.css';
const CommentSection = ({
    onChangeComment=()=>{},
    label="",
    handleOnClick=()=>{}, 
    input={}
})=>{
   
    return(
        <div className='comment_section_container'>
            <div>{label}</div>
            <input type="text" value={input.name || ''} placeholder="Name" onChange={(e)=>{onChangeComment((pre)=>({...pre, name:e.target.value}))}}/>
            <textarea placeholder="Comment" value={input.comment || ''} onChange={(e)=>{onChangeComment((pre)=>({...pre, comment:e.target.value}))}} />
            <div className='button_container'>
            <button onClick = {handleOnClick}>Post</button>
            </div>
            
        </div>
    )
}

export default CommentSection;