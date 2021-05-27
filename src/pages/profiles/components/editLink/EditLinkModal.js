import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tabs, Tab, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditScreen from "./components/EditScreen";
import useStyles from "./styles/styles";
import { deleteLinkAction, editLinkAction, makeLinkFirstOrderACtion } from "../../store/actions";
import { snackBarAction } from "../../../../store/actions";

function EditLinkModal({
  isOpen, setEditLinkModal, data, profileType, allLinks, profiles,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const successCb = (link) => {
    setEditLinkModal((v) => ({ ...v, open: false }));
    if (link) {
      return dispatch(snackBarAction({
        message: `You successfully changed ${link}`,
        severity: "success",
        duration: 6000,
        open: true,
      }));
    }
  };

  const editLink = (hash, value, title, file) => {
    const [pId, type] = Object.entries(profileType)[0];
    const links = [{
      profileId: pId, linkType: type, linkHash: hash, linkValue: value, linkTitle: title, linkId: data.id,
    }];
    dispatch(editLinkAction(successCb, links, file));
  };

  const editAllLinks = (hash, id, title, value, editValue, editTitle, file) => {
    const needToEdit = allLinks.filter((link) => link.id === id && link.title === title && link.value === value);
    dispatch(editLinkAction(successCb, needToEdit.map((el) => ({
      ...el, linkHash: el.hash, linkTitle: editTitle, linkValue: editValue,
    })), file));
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

  const setLinkOrdering = (linkId) => {
    const profilesObject = {};
    profiles.forEach(({ id, business, social }) => {
      const bus = business.filter(({ id }) => id == linkId);
      const soc = social.filter(({ id }) => id == linkId);
      profilesObject[id] = {
        hashes: {
          business: (bus.length ? [...bus, ...business.filter(({ id }) => id != linkId)] : []).map(({ hash }) => hash),
          social: (soc.length ? [...soc, ...social.filter(({ id }) => id != linkId)] : []).map(({ hash }) => hash),
        },
        id: {
          business: (bus.length ? [...bus, ...business.filter(({ id }) => id != linkId)] : [])
            .map(({ id }) => id),
          social: (soc.length ? [...soc, ...social.filter(({ id }) => id != linkId)] : [])
            .map(({ id }) => id),
        },
        profileState: {
          business: bus.length ? 2 : 0,
          social: soc.length ? 1 : 0,
        },
      };
    });
    const newData = Object.keys(profilesObject).reduce((sum, cur) => {
      const state = Object.values(profilesObject[cur].profileState).map((el) => el);
      if (state.includes(1)) {
        sum = [...sum, {
          linksIds: profilesObject[cur].id.social,
          hashes: profilesObject[cur].hashes.social,
          profileId: cur,
          profileState: profilesObject[cur].profileState.social,
        }];
      }
      if (state.includes(2)) {
        sum = [...sum, {
          linksIds: profilesObject[cur].id.business,
          hashes: profilesObject[cur].hashes.business,
          profileId: cur,
          profileState: profilesObject[cur].profileState.business,
        }];
      }
      return sum;
    }, []);
    dispatch(makeLinkFirstOrderACtion(() => setEditLinkModal((v) => ({ ...v, open: false })), newData));
  };

  return (
    <>
      <div className={classes.opacityBackground} onClick={(v) => setEditLinkModal((v) => ({ ...v, open: false }))}></div>
      <div className={classes.wizardContainer}>
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
              setLinkOrdering={setLinkOrdering}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditLinkModal;
