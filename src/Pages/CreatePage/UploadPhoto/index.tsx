import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { setImgDataURL } from "../../../Redux/slices/imageSlice";
import { useAppDispatch } from "../../../Redux/store";

export const UploadPhoto = () => {
    const dispatch = useAppDispatch();

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = e.target.files ?? [];
        getImgFromFile(file);
    };

    const getImgFromFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const { result = '', } = e?.target ?? {};

            if (result) dispatch(setImgDataURL(result));
        };

        reader.readAsDataURL(file);
    }

    return (
        <Box>
            <Typography>
                Upload your photo
            </Typography>
            <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleUpload} />
        </Box>
    )
}

// function dataURLtoFile(dataurl, filename) {
//     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//         while(n--){
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, {type:mime});
//     }