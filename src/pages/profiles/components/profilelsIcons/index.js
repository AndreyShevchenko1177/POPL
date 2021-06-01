import React from "react";
import clsx from "clsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditIcon from "@material-ui/icons/Edit";
import icons from "./icons";
import { isSafari } from "../../../../constants";
import useStyles from "../profileCard/styles/styles";
import { downLoadFile } from "./downLoadAction";
import { downloadContacts } from "./downLoadContacts";
import Loader from "../../../../components/Loader";

export default function SocialPoplsIcons({
  style, data, handleClick, profileId, profileName, showEditIcon, setShowEditIcon, showEditModal, name, num, customId, isLinksDragging, isDirect,
}) {
  const classes = useStyles();

  const linkRedirect = (path, linkId, value) => {
    try {
      if (linkId === 37) return downLoadFile(path, value);
      if (linkId === 22) return downloadContacts(path, profileName);
      return window.open(path);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickEditIcon = (title, value, id, clicks, currentIcon, name, hash, icon) => {
    setShowEditIcon(false);
    showEditModal(title, value, id, clicks, currentIcon, name, hash, icon);
  };
  return (
    <Droppable droppableId={`droppable${customId}`} direction="horizontal" type={`${num}`}>
      {(provided) => (
        <div
          className="flex"
          ref={provided.innerRef}
          style={isLinksDragging ? { width: "100%" } : {}}
        >
          {isLinksDragging
            ? <Loader containerStyles={{ margin: "0 auto" }} styles={{ width: 20, height: 20 }} />
            : data.map(({
              title, value, id, clicks, icon, hash, customId,
            }, key, a) => (
              <Draggable
                key={`${num}${key}`}
                draggableId={`${num}${key}`}
                index={key}
              >
                {(provided) => (
                  <div
                    draggable="true"
                    className='relative'
                    // className={classes.container}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    { key ? !isDirect && <div className={clsx(classes.greyIcon, { [classes.leftBorderRad]: key === 1, [classes.rigthBorderRad]: key === a.length - 1 })}></div> : null}
                    <div key={key} className={clsx(classes.linkClicksWrapper, { [classes.safariLinks]: isSafari })}>
                      {showEditIcon && <div className={classes.linksEditWrapper} onClick={() => handleClickEditIcon(title, value, id, clicks, icons[id], name, hash, icon)}>
                        <EditIcon style={{ width: 15, height: 15 }}/>
                      </div>}
                      <div
                        onClick={(event) => handleClick(event, () => linkRedirect(id === 22 ? icons[id].path + profileId : icons[id].path + value, id, value))}
                        className={clsx(classes.iconItem, { [classes.start_wiggle]: showEditIcon })}
                      >
                        <img
                          className={style}
                          src={icon
                            ? `${process.env.REACT_APP_BASE_FIREBASE_CUSTOM_ICON}${icon}?alt=media`
                            : icons[id]?.icon} alt={title}
                        />
                      </div>
                      {/* <span className={classes.clicksText}>{`${clicks}`}</span> */}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
