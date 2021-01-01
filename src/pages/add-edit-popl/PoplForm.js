import React, { useRef } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  makeStyles,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { ReactComponent as InstagramLogo } from "assets/svg/instagram.svg";
import { ReactComponent as FacebookLogo } from "assets/svg/facebook.svg";
import { ReactComponent as TwitterLogo } from "assets/svg/twitter.svg";
import { ReactComponent as SnapchatLogo } from "assets/svg/snapchat.svg";
import { ReactComponent as LinkedInLogo } from "assets/svg/linkedin.svg";
import { ReactComponent as TelephoneLogo } from "assets/svg/telephone.svg";
import { ReactComponent as YoutubeLogo } from "assets/svg/youtube.svg";
import { ReactComponent as TiktokLogo } from "assets/svg/tik-tok.svg";
import { ReactComponent as SoundcloudLogo } from "assets/svg/soundcloud.svg";
import { ReactComponent as SpotifyLogo } from "assets/svg/spotify.svg";
import { ReactComponent as VenmoLogo } from "assets/svg/venmo.svg";
import { ReactComponent as CashAppLogo } from "assets/svg/cashApp.svg";
import { ReactComponent as PaypalLogo } from "assets/svg/paypal.svg";
import { ReactComponent as WhatsappLogo } from "assets/svg/whatsapp.svg";
import { ReactComponent as TwitchLogo } from "assets/svg/twitch.svg";
import { ReactComponent as LinkLogo } from "assets/svg/link.svg";
import { ReactComponent as MapPinIcon } from "assets/svg/google-maps.svg";
import { ReactComponent as ITunesLogo } from "assets/svg/itunes.svg";
import { ReactComponent as EmailIcon } from "assets/svg/email.svg";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  adornment: {
    borderRadius: 4,
  },

  saveBtn: { padding: `8px 16px`, width: "150px" },
}));

export default function PoplForm(props) {
  const { handleClose } = props;
  const classes = useStyles();
  const imgRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    handleClose && handleClose();
  }

  return (
    <>
      <Grid container spacing={2}>
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} className={classes.section}>
            <Grid container spacing={2} justify="center">
              <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  align="center"
                >
                  <img
                    src={"assets/img/user1.png"}
                    height="128px"
                    width="128px"
                    alt={"profile"}
                  />
                </Grid>
                <input type="file" hidden ref={imgRef} />
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  align="center"
                >
                  <Button onClick={() => imgRef.current.click()}>
                    Change Photo
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
              >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Profile Name"
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} className={classes.section}>
            <Grid container spacing={2} justify="center">
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth>
                  <OutlinedInput
                    fullWidth
                    variant="outlined"
                    placeholder="Instagram"
                    // label="Instagram"
                    startAdornment={
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        <InstagramLogo />
                        {/* <img src="assets/insta.png" alt="insta" /> */}
                      </InputAdornment>
                    }
                    endAdornment={
                      <IconButton>
                        <Close />
                      </IconButton>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  placeholder="Facebook"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <FacebookLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Twitter"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <TwitterLogo />
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  placeholder="Snapchat"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <SnapchatLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Linked In"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <LinkedInLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Phone Number"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <TelephoneLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Youtube"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <YoutubeLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Tiktok"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <TiktokLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Soundcloud"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <SoundcloudLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Spotify"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <SpotifyLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <EmailIcon />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Apple Music"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <ITunesLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Venmo"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <VenmoLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Cash App"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <CashAppLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Paypal"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <PaypalLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Whatsapp"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <WhatsappLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Twitch"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <TwitchLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Any Link"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <LinkLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Website Link"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <LinkLogo />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <OutlinedInput
                  fullWidth
                  variant="outlined"
                  placeholder="Business Address"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <MapPinIcon />
                      {/* <img src="assets/insta.png" alt="insta" /> */}
                    </InputAdornment>
                  }
                  endAdornment={
                    <IconButton>
                      <Close />
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.saveBtn}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </>
  );
}
