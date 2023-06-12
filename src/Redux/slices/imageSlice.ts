import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IImageSlice {
  imgDataURL: string | ArrayBuffer;
}

const initialState: IImageSlice = {
  imgDataURL: '',
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImgDataURL: (state, action: PayloadAction<string | ArrayBuffer>) => {
      state.imgDataURL = action.payload
    },
  },
})

export const {
  setImgDataURL
} = imageSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getImgDataURL = (state: RootState) => state.image.imgDataURL

export default imageSlice.reducer