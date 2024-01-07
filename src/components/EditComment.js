
const EditComment = ({
    editMode={},
    setEditMode=()=>{},
    handleEditOnClick=()=>{}
})=>{
    return(
        <div className="edit_container">
            <input
            value={editMode.comment}
            onChange={(e)=>{setEditMode((pre)=>({...pre, comment:e.target.value}))}}
            />
            <button className="edit_button" onClick={handleEditOnClick}>Update</button>
        </div>
    )
}

export default EditComment;