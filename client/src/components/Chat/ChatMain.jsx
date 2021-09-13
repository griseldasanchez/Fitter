import React, { useState, useEffect } from 'react';
import DirectChatPage from './DirectChatPage.jsx';
import axios from 'axios';

// class ChatMain extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userName: '',
//       userSecret: ''
//     };
//     this.initialize = this.initialize.bind(this);
//   }

//   componentDidMount() {
//     this.initialize();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.userId !== prevProps.userId) {
//       this.initialize();
//     }
//   }

//   initialize() {
//     axios.get('/user')
//       .then((response) => {
//         console.log('response:',response.data[0]);
//         this.setState({
//           userName: response.data[0].firstname + ' ' + response.data[0].lastname,
//           userSecret: response.data[0].id
//         });
//       });
//   }

//   render () {
//     console.log('user',this.state.userName);

//     if (this.state.userName === '' || this.state.userName === undefined) {
//       return (
//         <div>
//          Loading...
//         </div>
//       );
//     }
//     return (
//       <div>
//         <DirectChatPage
//           userName={this.state.userName}
//           userSecret={this.state.userSecret}
//         />
//       </div>
//     );
//   }
// };


const ChatMain = (props) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get('/user')
      .then((response) => {
        setUser({
        userName: response.data[0].firstname + ' ' + response.data[0].lastname,
        userSecret: response.data[0].id
        });
      })
      .catch((error) => console.log('error', error))
  }, [props]);

  if (user !== '' || user === undefined) {
    return (
      <div>
        <DirectChatPage
          userName={user.userName}
          userSecret={user.userSecret}
        />
      </div>
    );
  }

  return (
    <div>
      Loading...
    </div>
  );
}

export default ChatMain;