const initialState = {
   feed:[],
   offset: 0,
   feedLoading: false
};

const FeedReducer = (state = initialState, action) => {

   if (action.type == 'incrementFeed') {
      return { ...state, feed: state.feed.concat(action.payload.feed)};
   }

   if (action.type == 'changeFeedLoadingStatus') {
      return { ...state, feedLoading: action.payload.status };
   }

   return state;
}

export default FeedReducer;
