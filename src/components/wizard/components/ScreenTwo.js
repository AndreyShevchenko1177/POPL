import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import useStyles from "../styles/styles";
import { addLinkAction } from "../../../pages/profiles/store/actions";

function ScreenTwo({
  image, title, value, id,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(({ authReducer }) => authReducer.signIn.data);

  const addLink = () => {
    dispatch(addLinkAction(userData.id));
  };

  return (
        <div className={classes.linkContainer}>
            <div>
                <div className={classes.link} style={{ margin: "10px 0 20px 0" }}>
                    <img style={{ width: "120px" }} src={image} alt={title} />
                </div>
                <div className={classes.linkValue}>
                    {value}
                </div>
                <div className={classes.btnContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={addLink}
                    >
                        Add link
                    </Button>
                </div>
            </div>
        </div>
  );
}

export default ScreenTwo;
