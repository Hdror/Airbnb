// with this service we upload the imgas to cloudinary
export const cloudinaryService = {
    uploadImg,
};

function uploadImg(ev) {
    const CLOUD_NAME = "dcys8pbcf";
    const PRESET_NAME = "airbnb";
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", ev.target.files[0]);
    formData.append("upload_preset", PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            return res;
        })
        .catch((err) => console.error(err));
}