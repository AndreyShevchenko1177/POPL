import axios from "axios";
import firebase from "../../../../config/firebase.config";

export const setCompanyName = (name) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyName");
  bodyFormData.append("sCompanyName", name);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyWebSite = (website) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyWebsite");
  bodyFormData.append("sCompanyWebsite", website);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyColor = (color) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "AjaxSetCompanyColor");
  bodyFormData.append("sCompanyColor", color);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const getCompanyInfo = (userId) => {
  const bodyFormData = new FormData();
  bodyFormData.append("sAction", "GetCompanyInfo");
  bodyFormData.append("iID", userId);
  return axios.post("", bodyFormData, {
    withCredentials: true,
  });
};

export const setCompanyImage = (name) => {
  console.log(name);
  // const bodyFormData = new FormData();
  // bodyFormData.append("sAction", "AjaxSetCompanyImage");
  // bodyFormData.append("CompanyProfileImage", name);
  // return axios.post("", bodyFormData, {
  //   withCredentials: true,
  // });
};

export const setCompanyAvatar = async (file) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${file.name}`);
  await fileRef.put(file);
  return downloadFileFromFireBase(file.name);
  // downloadFileFromFireBase(file[0].name, "images");
};

const downLoadFileFromUrl = (url, fileName) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${fileName}`,
  );
  link.setAttribute(
    "target",
    "_blank",
  );

  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

const downloadFileFromFireBase = (fileName, folderName) => {
  try {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${fileName}`).getDownloadURL();
  } catch (error) {
    return error;
  }
};

// const listAll = (folderName) => {
//   const storageRef = firebase.storage().ref();

//   // [START storage_list_all]
//   // Create a reference under which you want to list
//   let listRef = storageRef.child(folderName);

//   // Find all the prefixes and items.
//   listRef.listAll()
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {
//         // All the prefixes under listRef.
//         // You may call listAll() recursively on them.
//       });
//       res.items.forEach((itemRef) => {
//         // All the items under listRef.
//         console.log(itemRef);
//       });
//     }).catch((error) => {
//       // Uh-oh, an error occurred!
//     });
//   // [END storage_list_all]
// };
