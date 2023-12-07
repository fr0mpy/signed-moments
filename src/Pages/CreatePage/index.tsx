import { Box, Modal } from "@mui/material"
import { useAppSelector } from "../../Redux/store";
import { UploadPhoto } from "../CreatePage/UploadPhoto"
import { Canvas } from "./Canvas"

export const CreatePage = () => {
    const { imgDataURL } = useAppSelector(state => state.image);

    return (
        <Box>
            <Canvas />
            <Modal open={!Boolean(imgDataURL)}>
                <UploadPhoto />
            </Modal>
        </Box>
    )
}