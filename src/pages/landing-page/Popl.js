import React from "react";
import PoplIcon from "../../components/PoplIcon";

export default function Popl(props) {
  const { title, description } = props;
  return (
    <div className="rightBox1">
      <div className="text-center">
        <img src="./assets/img/menuDots.png" alt="menuDots" />
      </div>
      <div className="row">
        <div className="col-md-1 pr-0">
          <h3>{title && title}</h3>
        </div>
        <div className="col-md-7">
          <button className="button direct0f">Direct oF</button>
          <img src="./assets/img/copyIcon.png" alt="copy" />
        </div>
        <div className="col-md-3 text-right">
          <div className="row">
            <div className="togglesection">
              <i className="fa fa-pencil" aria-hidden="true" />
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              <i className="fa fa-ellipsis-v" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 pl-0 mt-3 checkboxCUstom">
          <div className="custom-control custom-checkbox sentCheck ">
            <input
              id="inbox0"
              className="custom-control-input"
              type="checkbox"
            />
            <label
              htmlFor="inbox0"
              className="custom-control-label sentCheck12 d-flex"
            >
              <div>
                <img src="./assets/img/user1.png" alt="user1" />
                {/* <img src="http://scrollnext.com/dev.kompetenz/public/assets/img/5f9b9f781cd32.jpg" id="previewImg" style="height:76px;">        */}
              </div>
              <div className="ml-2">
                <p className="paraLorem">{description && description}</p>
                <div className="iconsBox d-flex">
                  <PoplIcon
                    imgSrc={"./assets/img/insta.png"}
                    title={"Instagram"}
                  />

                  <PoplIcon imgSrc={"./assets/img/sc.png"} title={"Snapchat"} />

                  <PoplIcon
                    imgSrc={"./assets/img/twiter.png"}
                    title={"Twitter"}
                  />

                  <PoplIcon imgSrc={"./assets/img/fb.png"} title={"Facebook"} />

                  <PoplIcon
                    imgSrc={"./assets/img/linked.png"}
                    title={"Linkedin"}
                  />

                  <PoplIcon
                    imgSrc={"./assets/img/message.png"}
                    title={"Text"}
                  />

                  <PoplIcon
                    imgSrc={"./assets/img/venmo-icon 1.png"}
                    title={"Venmo"}
                  />

                  <PoplIcon
                    imgSrc={"./assets/img/linked.png"}
                    title={"Tik Tok"}
                  />

                  <PoplIcon
                    imgSrc={"./assets/img/message.png"}
                    title={"Text"}
                  />

                  <PoplIcon
                    imgSrc={"./assets/img/venmo-icon 1.png"}
                    title={"Venmo"}
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
