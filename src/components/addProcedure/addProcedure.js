import "./addProcedure.css";

export default function AddProcedure() {
  return (
    <div>
      <form className="add-procedure">
        <label htmlFor="proc-files">Upload procedures files</label>
        <div className="proc-photos">No images uploaded</div>
        <input id="proc-files" type="file" multiple />
        <div>
          <input type="text" name="title" placeholder="Title" />
        </div>
        <div>
          <textarea name="description" placeholder="Description">
            {" "}
          </textarea>
        </div>
        <button>Add Procedure</button>
      </form>
    </div>
  );
}
