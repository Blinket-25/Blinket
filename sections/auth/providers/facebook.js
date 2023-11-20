import { auth } from "@/firebase";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { signIn } from "next-auth/react";

const provider = new FacebookAuthProvider();

export const signInWithFacebook = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log("hey user just got loged in with google ====>", user);

            // const url = await signIn('credentials', {
            //     token,
            //     uid: user.uid,
            //     displayName: user.displayName,
            //     email: user.email,
            //     phoneNumber: user.phoneNumber,
            //     photoURL: user.photoURL,
            //     redirect: false
            // });
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log("hey user just got error in google ====>", errorCode, email, errorMessage, credential);
            // ...
        });
}