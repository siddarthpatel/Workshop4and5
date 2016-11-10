import React from 'react';
import FeedItem from './feeditem';
import StatusUpdateEntry from './statusupdateentry';
import {getFeedData} from '../server';
import {postStatusUpdate} from '../server';

export default class Feed extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
   contents: []
   };
   }

   refresh() {
   getFeedData(this.props.user, (feedData) => {
   this.setState(feedData);
   });
   }

   onPost(postContents) {
   // Send to server.
   // We could use geolocation to get a location,
   // but let's fix it to Amherst for now.
   postStatusUpdate(4, "Amherst, MA", postContents, () => {
   // Database is now updated. Refresh the feed.
   this.refresh();
   });
   }

   componentDidMount() {
   this.refresh();
   }


   render() {
 return (
 <div>
 <StatusUpdateEntry
 onPost={(postContents) => this.onPost(postContents)} />
 {this.state.contents.map((feedItem) => {

 return (
 <FeedItem key={feedItem._id} data={feedItem} />
 )
 })}
 </div>
 )
 }


  // componentDidMount() {
  //   getFeedData(this.props.user, (feedData) => {
  //   // Note: setState does a *shallow merge* of
  //   // the current state and the new state. If
  //   // state was currently set to {foo: 3}, and
  //   // we setState({bar: 5}), state would then be
  //   // {foo: 3, bar: 5}. This won't be a problem here.
  //   this.setState(feedData);
  //   });
  // }

}
