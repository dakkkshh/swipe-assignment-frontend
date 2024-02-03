import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductList } from "./productsSlice";
import { selectProductGroupList } from "./productGroupsSlice";

export const useProductListData = () => {
  const productList = useSelector(selectProductList);
  const productGroupList = useSelector(selectProductGroupList);
  const productWithGroupPopulatedList = productList.map((product) => {
    const populatedProductGroup = productGroupList.find(
      (productGroup) => productGroup?.groupId?.toString() === product?.productGroup?.toString()
    );
    return {
      ...product,
      productGroup: populatedProductGroup ? populatedProductGroup : null,
    };
  });

  const getOneProduct = (receivedId) => {
    return (
      productWithGroupPopulatedList.find(
        (product) => product?.productId?.toString() === receivedId?.toString()
      ) || null
    );
  };

  const listSize = productWithGroupPopulatedList.length;

  return {
    productList: productWithGroupPopulatedList,
    getOneProduct,
    listSize,
  };
}

export const useProductGroupListData = () => {
  const productGroupList = useSelector(selectProductGroupList);

  const getOneProductGroup = (receivedId) => {
    return (
      productGroupList.find(
        (productGroup) => productGroup?.groupId?.toString() === receivedId?.toString()
      ) || null
    );
  };

  const listSize = productGroupList.length;

  return {
    productGroupList,
    getOneProductGroup,
    listSize,
  };
}

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);
  const {
    productList
  } = useProductListData();
  const invoiceListWithProductsPopulated = invoiceList.map((invoice) => {
    const products = invoice?.products?.map((product) => {
      const productData = productList.find(
        (productData) => productData.id === product.id
      );
      return {
        ...product,
        productData: productData ? productData : null,
      };
    }) || [];
    return {
      ...invoice,
      products: products,
    };
  });

  const getOneInvoice = (receivedId) => {
    return (
      invoiceListWithProductsPopulated.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceListWithProductsPopulated.length;

  return {
    invoiceList: invoiceListWithProductsPopulated,
    getOneInvoice,
    listSize,
  };
};

