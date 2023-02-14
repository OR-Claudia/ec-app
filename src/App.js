import { Routes, Route } from "react-router-dom"; //assembles the routing of the app
import Home from "./routes/home/home.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {
	createUserDocFromAuth,
	onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
	/* when nesting, we keep track of path as in 
	  	   /level1/level2 == /home/shop */
	const dispatch = useDispatch(); //doesn't need to be passed bc it doesn't change, but can be added to void errors/warnings

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="/shop/*" element={<Shop />} />
				<Route path="/auth" element={<Authentication />} />
				<Route path="/checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
