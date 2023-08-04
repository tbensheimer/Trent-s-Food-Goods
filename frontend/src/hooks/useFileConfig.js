import { useState } from "react";

export default function useFileConfig() {
    const [imageError, setImageError] = useState(null);
    const [image, setImage] = useState(null);


    const handleFileChange = async (e) => {
        setImage(null);

        let file = e.target.files[0];  //selects first file if multiple uploaded

        if(!file) {
            setImageError("Please select a file");
            return;
        }

        if(!file.type.includes('image')) {
            setImageError("File type must be an image");
            return;
        }

        if(file.size > 100000) {
            setImageError("File size must be less than 100Kb");
            return;
        }

        const base64 = await convertToBase64(file);
        setImage(base64);
        setImageError(null);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return { handleFileChange, setImage, image, imageError}
}