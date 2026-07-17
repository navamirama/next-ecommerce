// // @ts-nocheck
// import { create } from "zustand";
// import { currentCart } from "@wix/ecom";
// import { WixClient } from "@/context/wixContext";

// type CartState = {
//   cart: currentCart.Cart;
//   isLoading: boolean;
//   counter: number;
//   getCart: (wixClient: WixClient) => void;
//   addItem: (
//     wixClient: WixClient,
//     productId: string,
//     variantId: string,
//     quantity: number
//   ) => void;
//   removeItem: (wixClient: WixClient, itemId: string) => void;
// };

// export const useCartStore = create<CartState>((set) => ({
//   cart: [],
//   isLoading: true,
//   counter: 0,
//   getCart: async (wixClient) => {
//     try {
//       const cart = await wixClient.currentCart.getCurrentCart();
//       set({
//         cart: cart || [],
//         isLoading: false,
//         counter: cart?.lineItems.length || 0,
//       });
//     } catch (err) {
//       set((prev) => ({ ...prev, isLoading: false }));
//     }
//   },

//   addItem: async (wixClient, productId, variantId, quantity) => {
//     set((state) => ({ ...state, isLoading: true }));
//     const response = await wixClient.currentCart.addToCurrentCart({
//       lineItems: [
//         {
//           catalogReference: {
//             appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
//             catalogItemId: productId,
//             ...(variantId && { options: { variantId } }),
//           },
//           quantity: quantity,
//         },
//       ],
//     });

//     set({
//       cart: response.cart,
//       counter: response.cart?.lineItems.length,
//       isLoading: false,
//     });
//   },
//   removeItem: async (wixClient, itemId) => {
//     set((state) => ({ ...state, isLoading: true }));
//     const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
//       [itemId]
//     );

//     set({
//       cart: response.cart,
//       counter: response.cart?.lineItems.length,
//       isLoading: false,
//     });
//   },
// }));

// @ts-nocheck
import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart | null;
  isLoading: boolean;
  counter: number;

  getCart: (wixClient: WixClient) => Promise<void>;

  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<void>;

  removeItem: (
    wixClient: WixClient,
    itemId: string
  ) => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,

  // Must be false initially
  isLoading: false,

  counter: 0,

  getCart: async (wixClient) => {
    set({ isLoading: true });

    try {
      const cart = await wixClient.currentCart.getCurrentCart();

      set({
        cart: cart ?? null,
        counter: cart?.lineItems?.length ?? 0,
      });
    } catch (error) {
      console.error("Failed to get cart:", error);

      set({
        cart: null,
        counter: 0,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (
    wixClient,
    productId,
    variantId,
    quantity
  ) => {
    set({ isLoading: true });

    try {
      const response =
        await wixClient.currentCart.addToCurrentCart({
          lineItems: [
            {
              catalogReference: {
                appId:
                  process.env.NEXT_PUBLIC_WIX_APP_ID!,
                catalogItemId: productId,
                ...(variantId
                  ? {
                    options: {
                      variantId,
                    },
                  }
                  : {}),
              },
              quantity,
            },
          ],
        });

      set({
        cart: response.cart ?? null,
        counter:
          response.cart?.lineItems?.length ?? 0,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (wixClient, itemId) => {
    set({ isLoading: true });

    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart(
          [itemId]
        );

      set({
        cart: response.cart ?? null,
        counter:
          response.cart?.lineItems?.length ?? 0,
      });
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));