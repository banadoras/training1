import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable
} from "firebase/storage";

export default function storeUserPhoto(file) {
  let url = "";
  let error = "";
  let progress = 0;

  const storage = getStorage();
  const storageRef = ref(storage, "users/" + (file && file.name));
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progressing = snapshot.bytesTransferred / snapshot.totalBytes;
      progress = progressing;
    },
    (e) => {
      error = e;
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        url = downloadURL;
      });
    }
  );

  console.log(url);
  return { url, error, progress };
}
