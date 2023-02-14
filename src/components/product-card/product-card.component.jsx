import {
	ProductCardContainer,
	Footer,
	Name,
	Price,
} from "./product-card.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const { name, price, imageUrl } = product;

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
				<Button
					buttonType={BUTTON_TYPE_CLASSES.inverted}
					onClick={addProductToCart}
				>
					Add to cart
				</Button>
			</Footer>
		</ProductCardContainer>
	);
};

export default ProductCard;
