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
  const [image, setImage] = useState({ base64Data: null, widthRatio: 1, heightRatio: 1 });

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
              .then((base64) => {
                const image = new Image();
                image.onload = function () {
                  const w = this.width;
                  const h = this.height;
                  console.log(this.width, this.height);
                  setImage({ base64Data: base64, widthRatio: w > h ? w / h : 1, heightRatio: w < h ? h / w : 1 });
                };
                image.src = base64;
              })
              .catch((error) => {
                setImage({ base64Data: null, widthRatio: 1, heightRatio: 1 });
                console.log(error);
              });
          })
          .catch((err) => {
            setImage({ base64Data: " ", widthRatio: 1, heightRatio: 1 });
            console.log(err);
          });
      }

      setImage({ base64Data: "/assets/img/qr_code_logo.png", widthRatio: 1, heightRatio: 1 });
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
              {image.base64Data
                ? <svg viewBox="0 0 240 240" width="180" height="180" id={profile.id}>
                  <QRCode size={240} value={`https://poplme.co/${profile.url}/dqr`} renderAs={"svg"}
                    level='M'
                    imageSettings={!(profile.generalSettingsData && profile.generalSettingsData[3]) ? {
                      src: image.base64Data,
                      x: null,
                      y: null,
                      height: 41,
                      width: 41,
                      excavate: true,
                    } : { excavate: true }}
                  />

                  <defs>
                    <clipPath id="circleView">
                      <circle cx="120" cy="120" r="25" fill="#FFFFFF" />
                    </clipPath>
                  </defs>
                  <image width={String(50 * image.widthRatio)} height={String(50 * image.heightRatio)} x="95" y="95" xlinkHref={image.base64Data} clip-path="url(#circleView)"/>
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

// {!(profile.generalSettingsData && profile.generalSettingsData[3])
//     ? null : <><defs>
//       <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="500" width="500">
//         <image width="48" height="50" x="95" y="95" xlinkHref={image}></image>
//       </pattern>
//     </defs>
//     {/* height="96" */}
//     <circle id='top' cx="120" cy="120" r="25" fill="url(#image)"/></>}
