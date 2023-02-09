import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
	signInUserWithEmail,
	signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	SignInContainer,
	H2,
	ButtonsContainer,
} from "./sign-in-form.styles.jsx";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const logGoogleUser = async () => {
		await signInWithGooglePopup();
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signInUserWithEmail(email, password);
			resetFormFields();
		} catch (err) {
			switch (err.code) {
				default:
					console.log("The user couldn't be signed in: " + err);
					break;
				case "auth/wrong-password":
					alert("Incorrect password.");
					break;
				case "auth/user-not-found":
					alert("No user associated with this email");
					break;
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<H2>I already have an account</H2>
			<span>Sign-in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="E-mail"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<ButtonsContainer>
					<Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
						Log in
					</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={logGoogleUser}
					>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
