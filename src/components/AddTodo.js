const AddToDo = ({addInputRef, add}) => {
    return (
        <div className="form-group ms-2">     
            <h4>Add Item</h4><p />
            <div className="input-group mb-4">
                <input className="col-6 me-2 ps-2 rounded" type="text" ref={addInputRef} />
                <button className="btn btn-danger rounded btn-sm col-1" onClick={add}>Add</button>
                <p />
            </div>
        </div>
    )
}

export default AddToDo;

