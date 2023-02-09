import { useState } from "react";
import { SignUpContainer, H2 } from "./sign-up-form.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocFromAuth(user, { displayName });

			resetFormFields();
			alert("Account successfully created.");
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				alert("Cannot create user. E-mail already in use.");
			} else console.log("User creation encountered an error: " + err);
		}
	};

	return (
		<SignUpContainer>
			<H2>Don't have an account?</H2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>

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

				<FormInput
					label="Confirm Password"
					type="password"
					required
					onChange={handleChange}
					name="confirmPassword"
					value={confirmPassword}
				/>

				<Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
					Sign up
				</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
