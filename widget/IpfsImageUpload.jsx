const IPFSImageUpload = ({
  key,
  name,
  className,
  img,
  setImg,
  msg,
  setMsg,
  onError,
  accepts,
  multiple,
  clickable,
  maxFiles,
  maxFileSize,
  minFileSize,
  dragActiveClassName,
}) => {
  const attributes = {
    key,
    name,
    className,
    img,
    setImg,
    msg,
    setMsg,
    onError,
    accepts,
    multiple,
    clickable,
    maxFiles,
    maxFileSize,
    minFileSize,
    dragActiveClassName,
  };
  const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;
  const uploadFile = (files) => {
    setMsg("Uploading...");

    const file = files[0];

    const uploadPromise = asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    })
      .then((response) => {
        if (!response.ok) {
          setMsg("Upload failed!");
          return Promise.reject(new Error("Upload failed"));
        }
        return response.body;
      })
      .then((data) => {
        console.log(data);
        setImg(data);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        setMsg("Upload failed!");
      })
      .finally(() => {
        setMsg("Replace Image");
      });

    uploadPromise
      .then(() => {
        console.log("Upload successful!");
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };
  return (
    <div className="d-inline-block" key={attributes.key}>
      {img?.cid && (
        <div
          className="d-inline-block me-2 overflow-hidden align-middle"
          style={{ width: "2.5em", height: "2.5em" }}
        >
          <img
            className="rounded w-100 h-100"
            style={{ objectFit: "cover" }}
            src={ipfsUrl(img?.cid)}
            alt="upload preview"
          />
        </div>
      )}
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        clickable
        onChange={uploadFile}
        {...attributes}
      >
        {msg}
      </Files>
    </div>
  );
};

return { IPFSImageUpload };
