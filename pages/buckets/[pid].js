import { useRouter } from "next/router";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "../../api";

const Bucket = () => {
  const [objects, setObjects] = useState([]);
  const router = useRouter();
  const { pid } = router.query;

  async function getObjects(bucketName) {
    return await instance.get("/objects?bucket=" + bucketName);
  }

  async function getSignedUrl(bucketName, key) {
    return await instance.get("/url?bucket=" + bucketName + "&key=" + key);
  }

  function handleOnClickItem(key) {
    getSignedUrl(pid, key).then((data) => {
      window.open(data.data);
    });
  }

  useEffect(() => {
    if (pid) getObjects(pid).then((data) => setObjects(data.data.Contents));
  }, [pid]);

  return (
    <div>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {objects.map((b, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => {
                handleOnClickItem(b.Key);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={b.Key} secondary={b.Size} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Bucket;
