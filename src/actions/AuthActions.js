import { AsyncStorage } from 'react-native';
import api from '../Api'

export const checkLogin = () =>{
   
   return(dispatch) => {
      AsyncStorage.getItem('jwt')
      .then((data)=>{
         if ( data != null && data != '') {
            dispatch({
               type: 'changeStatus',
               payload: {
                  status: 1
               }
            });
         } else {
            dispatch({
               type: 'changeStatus',
               payload: {
                  status: 2
               }
            });
         }
      })
      .catch((error)=>{
         dispatch({
            type: 'changeStatus',
            payload: {
               status: 2
            }
         });
      })
   };

};

export const signInUser = ( email, pass) =>{
   return (dispatch) => {

      api.req({
         endpoint: 'users/login',
         method:'POST',
         data:{
            email: email,
            pass: pass
         },
      
         success: (json) => {
            if (json.error == '') {

               AsyncStorage.setItem('jwt', json.jwt);

               dispatch({
                  type: 'changeStatus',
                  payload: {
                     status: 1
                  }
               });

            } else {
               alert(json.error);
            }
         },
         error:(error) =>{
            alert("Erro de requisição");
         }
      });
   };
};

export const registerNewUser = (name, email, pass) =>{
   return (dispatch) => {
     
      api.req({
         endpont: 'users/new',
         method: 'POST',
         data: {
            name: name,
            email: email,
            pass: pass
         },
         success: (json) =>{
            if (json.error == '') {

               AsyncStorage.setItem('jwt', json.jwt);

               dispatch({
                  type: 'changeStatus',
                  payload: {
                     status: 1
                  }
               });

            } else {
               alert(json.error);
            }
         },
         error:(error) =>{
            alert("Erro de requisição");
         }
      });
   };
};

export const changeName = (name) =>{
   return {
      type: 'changeName',
      payload: {
         name: name
      }
   }
};

export const changeEmail = (email) =>{
   return {
      type: 'changeEmail',
      payload: {
         email: email
      }
   }
};

export const changePass = (pass) =>{
   return {
      type: 'changePass',
      payload: {
         pass: pass
      }
   }
};

export const logout = () => {

   AsyncStorage.setItem('jwt', '');

   return{
      type: 'changeStatus',
      payload: {
         status: 2
      }
   };
};