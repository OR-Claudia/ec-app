import {
	CartDropdownContainer,
	EmptyMessage,
	CartItems,
} from "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Link to={"/checkout"}>
				<Button>CHECKOUT</Button>
			</Link>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
