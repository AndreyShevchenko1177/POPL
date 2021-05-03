import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Tabs, Tab, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditScreen from "./components/EditScreen";
import useStyles from "./styles/styles";
import { deleteLinkAction, editLinkAction } from "../../store/actions";
import { snackBarAction } from "../../../../store/actions";

function EditLinkModal({
  isOpen, setEditLinkModal, data, profileType, allLinks,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const ref = useRef();

  const blurHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setEditLinkModal((v) => ({ ...v, open: false }));
  };

  const successCb = (link) => {
    setEditLinkModal((v) => ({ ...v, open: false }));
    if (link) {
      return dispatch(snackBarAction({
        message: `You successfully changed ${link}`,
        severity: "success",
        duration: 3000,
        open: true,
      }));
    }
  };

  const editLink = (hash, value, title) => {
    const [pId, type] = Object.entries(profileType)[0];
    const links = [{
      profileId: pId, linkType: type, linkHash: hash, linkValue: value, linkTitle: title, linkId: data.id,
    }];
    dispatch(editLinkAction(successCb, links));
  };

  const editAllLinks = (hash, id, title, value, editValue, editTitle) => {
    const needToEdit = allLinks.filter((link) => link.id === id && link.title === title && link.value === value);
    dispatch(editLinkAction(successCb, needToEdit.map((el) => ({
      ...el, linkHash: el.hash, linkTitle: editTitle, linkValue: editValue,
    }))));
  };

  const deleteLink = (hash) => {
    const [pId, type] = Object.entries(profileType)[0];
    const links = [{
      linkType: type, linkHash: hash, profileId: pId, linkId: data.id,
    }];
    dispatch(deleteLinkAction(() => setEditLinkModal((v) => ({ ...v, open: false })), links));
  };

  const deleteAllLinks = (hash, id, title, value) => {
    const needToDelete = allLinks.filter((link) => link.id === id && link.title === title && link.value === value);
    dispatch(deleteLinkAction(() => setEditLinkModal((v) => ({ ...v, open: false })), needToDelete.map((el) => ({ ...el, linkHash: el.hash }))));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      <div className={classes.opacityBackground}></div>
      <div className={classes.wizardContainer} ref={ref} onBlur={blurHandler} tabIndex={1}>
        <HighlightOffIcon onClick={() => setEditLinkModal((v) => ({ ...v, open: false }))} className={classes.closeIcon} />
        <div>
          <div className={classes.root}>
            <div>
              <Typography className={classes.linkText} variant="h5">
                Edit the link
              </Typography>
            </div>
            <EditScreen
              {...data}
              profileBtnTitle={<div>Edit&nbsp; <p>{data.name}</p>'s link</div>}
              allProfilesBtnTitle='Edit link from all profiles'
              profileBtnEvent={editLink}
              deleteBtnTitle={`Delete ${data.name}'s link`}
              deleteAction={deleteLink}
              deleteAllLinksAction={deleteAllLinks}
              allProfileBtnEvent={editAllLinks}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditLinkModal;
