// import React, { Component } from 'react';
// import axios from 'axios';

// const Context = React.createContext(); 

// export class Provider extends Component {

//   state = {
//     authenticatedUser: null
//   };

//   render() {
//     const { authenticatedUser } = this.state;
//     const value = {
//       authenticatedUser,
//       actions: {
//         signIn: this.signIn,
//         signOut: this.signOut
//       },
//     };
//     return (
//       <Context.Provider value={value}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
  
//   // signIn = async (username, password) => {
//   //   const user = await this.data.getUser(username, password);
//   //   if (user !== null) {
//   //     this.setState(() => {
//   //       return {
//   //         authenticatedUser: user,
//   //       };
//   //     });
//   //     const cookieOptions = {
//   //       expires: 1 // 1 day
//   //     };
//   //     Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
//   //   }
//   //   return user;
//   // }

//   signIn = async (username, password) => {
//     let user;

//     await axios.get(`http://localhost:5000/api/users`, {
//       headers: {
//         'Authorization': {
//           'UserName': username,
//           'Password': password
//         } 
//       }
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           user = res.data;
//           this.setState(() => {
//             return {
//               authenticatedUser: {
//                 userName: username,
//                 passWord: password
//               },
//             };
//           });
//         } else {
//           user = null;
//         }
//       })
//       .catch(err=>{
//         console.log(err);
//     });

//     return user;
//   }

//   signOut = () => {
//     this.setState({ authenticatedUser: null });
//   }
// }

// export const Consumer = Context.Consumer;

// export default function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   }
// }

