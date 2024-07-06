import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item === null) return null;

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-content-center"
    >
      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.65rem" }}>
          {formatCurrency(item?.price || 0)}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: "0.65rem" }}>
        {formatCurrency((item?.price || 0) * quantity)}
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >&times;</Button>
    </Stack>
  );
}
