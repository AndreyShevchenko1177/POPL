import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import saveSvgAsPng from "save-svg-as-png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
}));

export default function QrCodeModal({
  open, setOpen, profile,
}) {
  const classes = useStyles();
  const [renderElm, setRenderElm] = useState(false);

  const handleClose = (value) => {
    setOpen((m) => ({ ...m, open: false }));
  };

  const downloadQrCode = (id, name) => {
    saveSvgAsPng.saveSvgAsPng(document.getElementById(id), `${name}_popl_qr.png`, { scale: 1 });
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.root}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div></div>
            <Typography variant='h5' id="simple-dialog-title">{profile.name}'s QR Code</Typography>
            <div className='relative'>
              <svg viewBox="0 0 240 240" width="180" height="180" id={profile.id}>
                <QRCode size={240} value={`https://poplme.co/${profile.url}/dqr`} renderAs={"svg"}
                  imageSettings={{
                    src: (profile.generalSettingsData && profile.generalSettingsData[3])
                      ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${profile.generalSettingsData[3]}?alt=media` : "/assets/img/logo_company.png",
                    x: null,
                    y: null,
                    height: 45,
                    width: 45,
                    excavate: false,
                  }}
                />
                {!(profile.generalSettingsData && profile.generalSettingsData[3]) ? null : <circle cx="120" cy="120" r="26" fill='#ffffff00' stroke="white" stroke-width="5"/>}
              </svg>

              {/* <QRCode size={175} style={{ display: "none" }} value={`https://poplme.co/${profile.url}/dqr`} id={profile.id} /> */}
              {/* <img
                alt='logo'
                className={classes.qrCodeLogo}
                src={(profile.generalSettingsData && profile.generalSettingsData[3])
                  ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${profile.generalSettingsData[3]}?alt=media`
                  : "/assets/img/logo_company.png"}
              /> */}
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
