import React from "react";
import QRCode from "qrcode.react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.custom.mainBorderRadius,
  },
  container: {
    height: 350,
    padding: "20px 60px",
  },
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function QrCodeModal({ open, setOpen, profile }) {
  const classes = useStyles();

  const handleClose = (value) => {
    setOpen((m) => ({ ...m, open: false }));
  };

  const downloadQrCode = (id) => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.root}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div></div>
            <Typography variant='h5' id="simple-dialog-title">Qr Code</Typography>
            <div>
              <QRCode size={175} value={profile.url} id={profile.id}/>
            </div>
            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={() => downloadQrCode(profile.id)}
            >
                Download qr code
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
