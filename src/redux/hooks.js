import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductList } from "./productsSlice";
import { selectProductGroupList } from "./productGroupsSlice";

export const useProductListData = () => {
  const productList = useSelector(selectProductList);
  const productGroupList = useSelector(selectProductGroupList);
  const productWithGroupPopulatedList = productList.map((product) => {
    const productGroup = productGroupList.find(
      (productGroup) => productGroup.id === product.groupId
    );
    return {
      ...product,
      group: productGroup ? productGroup : null,
    };
  });

  const getOneProduct = (receivedId) => {
    return (
      productWithGroupPopulatedList.find(
        (product) => product.id.toString() === receivedId.toString()
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
        (productGroup) => productGroup.id.toString() === receivedId.toString()
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

