export const isFetchingSelector = state => state.requestReducer.isLoading;
export const isErrorSelector = state => state.requestReducer.isError;
export const errorSelector = state => state.requestReducer.error;
