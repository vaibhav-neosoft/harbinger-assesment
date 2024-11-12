import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../screen/types';
import { formData } from '../assets/formData';


interface FormState {
  formData: FormData;
}

const initialState: FormState = {
  formData: formData,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ id: string; value: any }>) => {
      state.formData[action.payload.id] = action.payload.value;
    },
    submitForm: (state) => {
      console.log('Submitted Data:', state.formData);
    },
    resetForm: (state) => {
        state.formData = formData; 
      },
  },
});

export const { updateField, submitForm,resetForm } = formSlice.actions;
export default formSlice.reducer;
