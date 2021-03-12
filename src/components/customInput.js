import React, { useState } from "react";

// const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const regexp = /@/;

function CustomInput() {
  const [value, setValue] = useState([]);

  const changeChandler = (event) => {
    // setValue(event.target.innerText);
    const emailArray = event.target.innerText.split(",").map((el) => el.trim()).map((el) => {
      if (regexp.test(el)) return () => <span style={{ border: "1px solid grey" }}>{el}</span>;
      return el;
    });
    setValue(emailArray);
  };

  return (
      <div>
        <div style={{
          position: "relative", minHeight: 125, border: "1px solid grey", padding: 20, borderRadius: 10, color: "grey",
        }}>
            {/* {!!value.length && <span style={{ position: "absolute", zIndex: 1 }}>Enter Emails separated by commas</span>} */}
            <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                style={{
                  position: "absolute",
                  outline: "none",
                  color: "black",
                  height: 85,
                  zIndex: 10,
                  width: 832,
                }}
                onInput={(event) => changeChandler(event)}
                dangerouslySetInnerHTML={{ __html: "dsfdsfds" }}
            >
            </div>
            {/* <div>
                {value.map((Elm) => (typeof Elm === "string" ? Elm : <Elm/>))}
            </div> */}
        </div>

        </div>
  );
}

export default CustomInput;
