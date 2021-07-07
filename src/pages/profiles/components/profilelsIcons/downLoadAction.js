import axios from "axios";

export function downLoadFile(fileName) {
  axios({
    baseURL: "/v0",
    url: `/b/poplco.appspot.com/o/${fileName}?alt=media`,
    method: "GET",
    responseType: "blob",
  })
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob.data]),
      );
      const originName = fileName.split("%5E")[1];
      const name = fileName.split(".")[1] ? (originName || fileName) : `${fileName}.pdf`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${name}`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
}
