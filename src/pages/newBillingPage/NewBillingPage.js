import { Button, TextField, Typography } from "@material-ui/core";
import React, {
  useEffect, useState, useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import useStyles from "./styles/styles";
import Loader from "../../components/Loader";
import SubscribeButton from "../billing/components/SubscribeButton";
import stripeConfig from "../billing/stripeConfig";
import { snackBarAction } from "../../store/actions";
import TwoWeeksFreeButton from "../billing/components/TwoWeeksFreeButton";
import MoreWindow from "./components/MoreWindow";

const stripe = window.Stripe && window.Stripe(stripeConfig.stripePk);

const twoWeeksFreePriceId = "price_1IyL7TJqkGKmOFO6hexjtWnF";

function NewBilling() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  const currentQuantity = useSelector(({ systemReducer }) => systemReducer.setMeteredSubQuantity);
  const monthPrice = 10;
  const [accountNumber, setAccountNumber] = useState(null);
  const [showMoreWindow, setShowMoreWindow] = useState(false);
  const [open, setOpen] = useState(false);
  const moreWindowRef = useRef(null);

  const onBlurMoreWindow = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    if (!open) {
      setShowMoreWindow(false);
    }
  };

  const onChangeAccountsNumber = (event) => {
    setAccountNumber(event.target.value);
  };

  const estimateFieldBlur = () => {
    if (+accountNumber < profiles.length) {
      dispatch(snackBarAction({
        message: "Accounts number can't be less than you have in dashboard",
        severity: "error",
        duration: 6000,
        open: true,
      }));
    }
  };

  useEffect(() => {
    if (showMoreWindow) {
      moreWindowRef.current.focus();
    }
  }, [showMoreWindow]);

  return (
    <React.Fragment>
      <Header
        firstChild
        path="/settings"
      />
      {!profiles ? <Loader styles={{ position: "absolute", top: "50%", left: "50%" }}/> : <div className={classes.root}>
        <div>
          <div className={classes.titleWrapper}>
            <Typography variant="h1">Popl Enterprise Pricing</Typography>
          </div>
          <div className={classes.container}>
            <div className={classes.cardContainer}>
              <div>
                <Typography variant='h5'>
                  $10/month
                </Typography>
              </div>
              <div>
                <div className={classes.priceDescriptionContainer}>
                  <span>Price per account</span>
                </div>
              </div>
            </div>
            {
              !dashboardPlan
                ? <div className={classes.cardContainer}>
                  <div>
                    <Typography variant='h5'>
                    Enter number of accounts needed for your team
                    </Typography>
                  </div>
                  <div className={classes.estimateCard}>
                    {/* <span className={classes.subHeadings}> Number of Accounts:</span> */}
                    <TextField
                      onChange={onChangeAccountsNumber}
                      value={accountNumber ?? profiles.length}
                      inputProps={{ type: "number" }}
                      variant='standard'
                      onBlur={estimateFieldBlur}
                      classes={{ root: classes.accountInput }}
                    />
                  </div>
                  <div className={classes.estimateCard}>
                    <span className={classes.subHeadings}>
                  Monthly price: ${(accountNumber ?? profiles.length) * monthPrice}
                    </span>
                  </div>
                </div>
                : null
            }
            <div className={clsx(classes.cardContainer, { [classes.dashboardPlancardContainer]: !dashboardPlan })}>
              {
                dashboardPlan
                  ? <>
                    <div>
                      <Typography variant='h5'>
                        {"Your current pricing "}
                        <span className={classes.note}>*</span>
                      </Typography>
                    </div>
                    <div>
                      <div className={classes.priceDescriptionContainer}>
                        {!currentQuantity ? <Loader size='15px'/> : <span>${(currentQuantity || profiles.length) * monthPrice}/month</span>}
                      </div>
                    </div>
                    <div className={classes.footnote}><p>* Based on maximum number of accounts available to you this billing cycle</p></div>
                  </>
                  : <SubscribeButton profilesQuantity={accountNumber >= profiles.length ? accountNumber : profiles.length } subscriptionId={10} newBilling priceId='price_1JGCwhJqkGKmOFO6hAXXZ76j' stripe={stripe} />

              }
            </div>
            {!!dashboardPlan && <div className={classes.moreContainer}>
              <MoreWindow
                moreWindowRef={moreWindowRef}
                showMoreWindow={showMoreWindow}
                onBlurMoreWindow={onBlurMoreWindow}
                open={open}
                setOpen={setOpen}

              />
            </div>}
            {!dashboardPlan && <div className={classes.footer}>
              <Typography variant="h3" classes={{ h3: classes.twoWeeksFreeBtn }}>Just want Popl Pro for your team?</Typography>
              <TwoWeeksFreeButton stripe={stripe} priceId={twoWeeksFreePriceId} quantity={profiles.length} />
              <span>Does not include dashboard functionality</span>
            </div>}
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default NewBilling;
