const Create = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="d-flex flex-column gap-4">
          <select className="form-select p-2 border rounded">
            <option>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
          </select>
          <select className="form-select p-2 border rounded">
            <option>Adapter A</option>
            <option>Adapter B</option>
            <option>Adapter C</option>
          </select>
          <select className="form-select p-2 border rounded">
            <option>Template X</option>
            <option>Template Y</option>
            <option>Template Z</option>
          </select>
          <button className="btn btn-primary p-2 rounded">Submit</button>
        </div>
      </div>
      <div className="col-md-9 p-4 border"></div>
    </div>
  );
};

return { Create };
