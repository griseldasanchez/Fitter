import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'


function HomeFeed() {

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('/rankings')
      .then(response => response.data)
      .then(result => setFriends(result[0].friends))
      .catch(error => error)
  }, []);

  sortFriends();

  function sortFriends() {
    friends.forEach(friend => {
      // returns negative if they missed the goal
      let water = ((friend['goals'][0]['wateraverage'] * 100).toFixed(3));
      // returns negative if goal is exceeded
      let calories = ((friend['goals'][0]['caloriesaverage'] * 100).toFixed(3));
      let calculate = water - calories;
      friend['sorting'] = calculate.toFixed(2);
    })
  }

  return (
    <div id='home-page'>
      {/* Home Feed Search */}

      *** TEMPS REMOVE
      <p><Link to={{ pathname: '/login' }} >Login</Link></p>
      <p><Link to={{ pathname: '/signup' }} >Signup</Link></p>
      <p><Link to={{ pathname: '/forgot' }} >Forgot Password</Link></p>
      TEMPS REMOVE ***

      <SearchUsernames />

      {/* Placeholder for Personal Stats [Simon] */}
      <div className='home-placeholder'>
        Placeholder for Daily/Weekly Status
      </div>

      <h4>Your Friend's Rankings: </h4>
      {/* Friend's List Tile */}
      {friends.filter(friend => friend.sorting >= 0)
        .sort((a, b) => a.sorting - b.sorting)
        .concat(friends
          .filter(friend => friend.sorting < 0)
          .sort((a, b) => b.sorting - a.sorting))
        .map((friend, index) => (
          <Link key={index} to={{ pathname: '/user' }} style={{ 'textDecoration': 'none', 'color': 'black' }}>
            <div
              className='pic-tile-friend-tile'
              key={index}
              onClick={() => console.log(friend.friendfirst)}
            >
              <div className='pic-tile-ranking'>
                #{index + 1}<p style={{ 'fontSize': '10px' }}>{friend.sorting}</p>
              </div>
              {/* Profile Picture */}
              <div className='pic-tile-friend-left-pic' style={{ 'width': '15%', }}>
                <img style={{ 'maxHeight': '50px' }} src={friend.profilephoto}></img>
              </div>
              {/* Friend Information */}
              <div
                className='pic-tile-friend-right-info'
                style={{ 'fontSize': '14px', 'width': '85%' }}
              >
                <b>{friend.friendusername}:</b>
                <li>
                  {Math.round(friend.goals[0].wateraverage * 100)}% of my water goal.
                </li>
                <li>
                  {Math.round(friend.goals[0].caloriesaverage * 100)}% of my calories goal.
                </li>
              </div>
            </div>
          </Link>
        ))}
    </div>

  );
}

export default HomeFeed;
