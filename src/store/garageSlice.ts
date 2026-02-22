import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface GarageState {
    savedVehicleIds: string[];
}

const initialState: GarageState = {
    // Initializing from localStorage to persist user's garage
    savedVehicleIds: JSON.parse(localStorage.getItem('autosphere_garage') || '[]'),
};

export const garageSlice = createSlice({
    name: 'garage',
    initialState,
    reducers: {
        toggleVehicleInGarage: (state, action: PayloadAction<string>) => {
            const vehicleId = action.payload;
            const index = state.savedVehicleIds.indexOf(vehicleId);

            if (index >= 0) {
                // Remove if already exists
                state.savedVehicleIds.splice(index, 1);
            } else {
                // Add if not exists
                state.savedVehicleIds.push(vehicleId);
            }

            // Persist to localStorage
            localStorage.setItem('autosphere_garage', JSON.stringify(state.savedVehicleIds));
        },
    },
});

export const { toggleVehicleInGarage } = garageSlice.actions;

export default garageSlice.reducer;
