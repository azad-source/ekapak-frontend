"use client";

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../selectors";
import { changeQuantity, removeItem } from "../slice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MiniCart({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-80 bg-white z-50 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Корзина</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="text-sm text-gray-500">Корзина пуста</div>
        ) : (
          <>
            <div className="flex-1 overflow-auto space-y-3">
              {items.map((item) => (
                <div key={item.offerId} className="border rounded p-2 text-sm">
                  <div className="font-medium">{item.productName}</div>

                  <div className="text-gray-600">
                    {item.price} {item.currency} / {item.unit}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          changeQuantity({
                            offerId: item.offerId,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                      className="w-16 border rounded px-2 py-1"
                    />

                    <button
                      onClick={() => dispatch(removeItem(item.offerId))}
                      className="text-red-600 text-xs"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Итого</span>
                <span>{total} ₽</span>
              </div>

              <button className="mt-3 w-full bg-black text-white py-2 rounded">
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
