import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { checkLogin } from '../actions/AuthActions';
import { getFeed } from '../actions/FeedActions';
import FeedItemFake from '../components/feed/FeedItemFake';

export class Feed extends Component {
   static navigationOptions = {
      title: 'PhotoSphere'
   }

   constructor(props) {
      super(props)
      this.state = {}
   }

   componentDidMount() {
      this.props.getFeed();
   }

   ComponentDidUpdate() {
      this.verifyStatus();
   }

   verifyStatus = () => {
      if (this.props.status === 2) {
         this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [
               NavigationActions.navigate({ routeName: 'Login' })
            ]
         }));
      }
   }

   render() {
      return (
         <View style={styles.container}>
            {this.props.feedLoading == true &&
               <View>
                  <FeedItemFake />
                  <FeedItemFake />
               </View>
            }

            <Text>Feed de fotos</Text>

            <Text>{this.props.feed.length}</Text>
         </View>
      );
   }
   
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
});

const mapStateToProps = (state) => {
   return {
      status: state.auth.status,
      feed: state.feed.feed,
      feedLoading: state.feed.feedLoading,
   };
}

const FeedConnect = connect(mapStateToProps, { checkLogin, getFeed })(Feed);
export default FeedConnect;
