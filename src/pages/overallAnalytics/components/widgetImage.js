import React from "react";
import { useSelector } from "react-redux";

function WidgetImage({
  data = [], width = 25, height = 25, children,
}) {
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);

  return (
    <React.Fragment>
      {children}
      {data.map((el, key) => (
        <div key={key} style={{
          width, height, marginBottom: 10, marginRight: 10, minWidth: 25,
        }}>
          {el.image || (generalSettingsData && generalSettingsData[3])
            ? <img style={{
              width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover",
            }} src={`${el.image ? process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + el.image : `${process.env.REACT_APP_BASE_FIREBASE_LOGOS_URL}${generalSettingsData[3]}`}?alt=media`} alt='avatar' />
            : <div style={{
              width: "100%", height: "100%", borderRadius: "50%", boxShadow: "0px 0px 8px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)", backgroundColor: `${generalSettingsData && generalSettingsData[1]}`,
            }}>  </div>}
        </div>
      ))}
    </React.Fragment>
  );
}

export default WidgetImage;
