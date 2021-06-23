import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import saveSvgAsPng from "save-svg-as-png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Loader from "../../../components/Loader";

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
  qrCodeLogo: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  qrCodeWrapper: {
    minHeight: 185,
    minWidth: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function QrCodeModal({
  open, setOpen, profile,
}) {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const handleClose = (value) => {
    setOpen((m) => ({ ...m, open: false }));
  };

  const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  const downloadQrCode = (id, name) => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById(id), `${name}_popl_qr.png`, { scale: 1, excludeCss: true });
  };

  useEffect(() => {
    if (open) {
      if (profile.generalSettingsData && profile.generalSettingsData[3]) {
        return axios({
          baseURL: "/v0",
          url: `/b/poplco.appspot.com/o/logos%2F${profile.generalSettingsData[3]}?alt=media`,
          method: "GET",
          responseType: "blob",
        })
          .then((res) => {
            convertBlobToBase64(res.data)
              .then((base64) => setImage(" "))
              .catch((error) => {
                setImage(null);
                console.log(error);
              });
          })
          .catch((err) => {
            setImage(" ");
            console.log(err);
          });
      }
      setImage("/assets/img/logo_company.png");
    }
  }, [open]);

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.root}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div></div>
            <Typography variant='h5' id="simple-dialog-title">{profile.name}'s QR Code</Typography>
            <div className={classes.qrCodeWrapper}>
              {image
                ? <svg viewBox="0 0 240 240" width="180" height="180" id={profile.id}>
                  <QRCode size={240} value={`https://poplme.co/${profile.url}/dqr`} renderAs={"svg"}
                    level='M'
                    imageSettings={{
                      src: image,
                      x: null,
                      y: null,
                      height: 41,
                      width: 41,
                      excavate: true,
                    }}
                  />
                  {!(profile.generalSettingsData && profile.generalSettingsData[3]) ? null : <circle cx="120" cy="120" r="25" fill='#ffffff00' stroke="white" stroke-width="5"/>}
                </svg>
                : <Loader />}
            </div>
            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={() => downloadQrCode(profile.id, profile.name)}
            >
                Download QR code
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
