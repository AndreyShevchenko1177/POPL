import axios from "axios";

export function downloadContacts(path, fileName) {
  axios.get(path, {
    baseURL: "/addtocontacts",
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
        `${fileName}.vcf`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    })
    .catch((err) => console.log(err));
}
