import { createSelector } from '@reduxjs/toolkit';

/**
 * Get location api response
 */
export const getLocationFromApi = createSelector(
    [state => state?.getLocationSlice],
    getLocationSlice => getLocationSlice?.data?.ResponsePacket
)
