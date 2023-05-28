import { useEffect } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { signOut, setAuth, setEmailOnLogin, isAuthenticated, selectIsAuthenticated } from '@/lib/slices/authSlice';
import { useAppSelector } from '../hooks/hooks';
import { useRegisterMutation } from '../slices/userSlice';

function AuthListener() {
  const dispatch = useDispatch();
  const isAuthorised = useAppSelector(selectIsAuthenticated)

  const hasToken = useAppSelector(state => state.auth.token !== null)

  const [registerUser, {
    data,
    isLoading: registerLoading,
    error: registerError }
  ] = useRegisterMutation()

  // CHECK IF AUTHENTICATED
  // IF NOT, CHECK LOCAL STORAGE FOR AUTH STATE
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const authState = localStorage.getItem('authState')
    
      if (authState && !isAuthorised) {
        const { email, token } = JSON.parse(authState)
        dispatch(setEmailOnLogin(email))
        dispatch(setAuth(token))
      }
    }
  },[])
  

  // COGNITO AUTH & SOCIAL SIGN IN 
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log('SIGN IN :: :: ::')
          break;
        case "signOut":
          dispatch(signOut)
          break;
        case "customOAuthState":
      }
    });

    Auth.currentAuthenticatedUser() // EMAIL AND JWT IS USED FOR THE SERVER SIDE AUTH 
      .then(currentUser => {
        const { signInUserSession } = currentUser;
        const { accessToken, idToken } = signInUserSession;
        const { email } = currentUser.attributes;

        // SET HEADER TOKEN 
        if (accessToken.jwtToken) dispatch(setAuth(accessToken.jwtToken))
        else { dispatch(setAuth(accessToken)) }

        // SEND BACKEND PAYLOAD
        handleUserRegistration(idToken.payload.email, accessToken.payload.sub)
        dispatch(setEmailOnLogin(email))
        dispatch(isAuthenticated(true))
        },
      )
      .catch((error) => {
        const errorMessage = `Error: ${error.message}`
        console.log(errorMessage)
        console.log("Not signed in")
      });
    return unsubscribe;
  }, [])


  const handleUserRegistration = (idToken: string, accessToken: string) => {
    if (hasToken && !isAuthorised) registerUser({
      email: idToken,
      cognitoId: accessToken
    })
    else console.log('No token ')
  };

  return null;
}

export default AuthListener;