// const generateLoadingStatus = (requestState, payload) => {
//     switch (requestState) {
//         case "REQUEST":
//             return {
//                 isLoading: true
//             }            
//         case "SUCCESS":
//             return {
//                 isLoading: false
//         }           
//         case "ERROR":
//             return {
//                 isLoading: false
//             }   
//         default:
//             return ;
//     }
// }


export const loadingReducer = (state = {}, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type);
    // not a *_REQUEST / *_SUCCESS /  *_ERROR actions, so we ignore them
    if (!matches) return state;
    const [, requestName, requestState] = matches;
    return {
      ...state,
      // Store whether a request is happening at the moment or not
      // e.g. will be true when receiving GET_TODOS_REQUEST
      //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_ERROR
    //   [requestName]: generateLoadingStatus(requestState, action.payload),
    [requestName]: requestState === 'REQUEST',
    };
};