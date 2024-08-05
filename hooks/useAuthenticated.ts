import * as React from "react";
import * as SecureStore from "expo-secure-store";
import useStateManagement from "../StateManagement/StateManagement";
import Actions from "../StateManagement/Actions";
import customAxios from "../axios/axios";
import useCartManagement, {getCartItems} from "../StateManagement/CartManagement";
import { DeviceEventEmitter } from "react-native";

export default function useCachedResources() {
	const { state: cartState, dispatch: cartDispatch } = useCartManagement();
	const [loading, setLoading] = React.useState<boolean>(true);
  // Load user data
  React.useEffect(() => {

	  async function loadLocalCertItems() {
		  try {
			  let perfumes = await getCartItems();

			  cartDispatch(
				  Actions.setCartItems(perfumes)
			  );
			  cartDispatch(
				  Actions.setTotalCartItems(perfumes?.length || 0)
			  )

			  if (perfumes?.length) {
				  cartDispatch(
					  Actions.setTotalPrice(perfumes.reduce((sum: number, item: object) => (sum + item.totalPrice), 0))
				  )
			  }

		  } catch (e) {
			  console.warn(e)
		  }
	  }

	  loadLocalCertItems();

	  DeviceEventEmitter.addListener("cart.added", (event)=>{
		  console.log('cart added')
		  loadLocalCertItems();
	  })

  }, []);

  return { isLoading: loading };
}
