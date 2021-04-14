import axios from "axios";

export function downLoadFile(path, fileName) {
  axios({
    baseURL: "",
    url: path,
    method: "GET",
    responseType: "blob",
  })
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${fileName}`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
}
