import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA_PKi4LZGN9VRfAeAYbSjx0rREh2XFNRU",
	authDomain: "crown-25959.firebaseapp.com",
	projectId: "crown-25959",
	storageBucket: "crown-25959.appspot.com",
	messagingSenderId: "1076954280196",
	appId: "1:1076954280196:web:9e80df561cbd554cf02051",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); //a class used in order to have one or multiple providers

googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth(); //rules for authentication
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider); //gets the auth and the provider (google)

export const db = getFirestore(); // singleton instance to our firestore db

//========== Products set up

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionKey);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q); //gets a snapshot of the query
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {}); //callback and document snapshop

	return categoryMap;
};

//========== Users set up

export const createUserDocFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;
	//console.log(userAuth);
	const userDocRef = doc(db, "users", userAuth.uid); //uid is a unique id identifier provided by google
	const userSnapshot = await getDoc(userDocRef);
	//console.log(userSnapshot.exists()); //--->this points to the same identifier as userDocRef but this checks if the document exists

	if (!userSnapshot.exists()) {
		//we create and set the user with setDoc, if the user doesn't exist.
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user: ", error.message);
		}
	}

	return userDocRef;
};

export const signInUserWithEmail = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth, callback);
};
