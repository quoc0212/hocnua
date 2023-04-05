import { useEffect, useState } from "react";
import instance from "../api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import Link from "next/link";

export default function Home() {
  const [buckets, setBuckets] = useState([]);

  async function getBuckets() {
    return await instance.get("/buckets");
  }

  useEffect(() => {
    getBuckets().then((data) => {
      setBuckets(data.data.Buckets);
    });
  }, []);

  return (
    <div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {buckets.map((b, index) => {
          const link = "/buckets/" + b.Name;
          return (
            <Link href={link}>
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={b.Name} secondary={b.CreationDate} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
}
