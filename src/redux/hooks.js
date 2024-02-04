import { useSelector, useDispatch } from "react-redux";
import { selectInvoiceList, updateInvoice } from "./invoicesSlice";
import { selectProductList } from "./productsSlice";
import { selectProductGroupList } from "./productGroupsSlice";

const noGroupData = {
  groupId: "-1",
  groupName: "No Group",
};

export const useProductListData = () => {
  const productList = useSelector(selectProductList);
  const productGroupList = useSelector(selectProductGroupList);
  const productWithGroupPopulatedList = productList.map((product) => {
    const populatedProductGroup = productGroupList.find(
      (productGroup) => productGroup?.groupId?.toString() === product?.productGroup?.toString()
    );
    return {
      ...product,
      productGroup: populatedProductGroup ? populatedProductGroup : noGroupData,
    };
  });

  const getOneProduct = (receivedId) => {
    return (
      productWithGroupPopulatedList.find(
        (product) => product?.productId?.toString() === receivedId?.toString()
      ) || null
    );
  };

  const groupProductsByGroupId = (products) => {
    const groupedProducts = [];
    products.forEach((productId) => {
      const product = getOneProduct(productId);
      const groupIndex = groupedProducts.findIndex(
        (group) => group.groupId?.toString() === product.productGroup?.groupId?.toString()
      );
      if (groupIndex === -1) {
        groupedProducts.push({
          groupId: product.productGroup?.groupId,
          groupName: product.productGroup?.groupName,
          products: [product],
        });
      } else {
        groupedProducts[groupIndex].products.push(product);
      }
    });
    return groupedProducts;
  }

  const listSize = productWithGroupPopulatedList.length;

  return {
    productList: productWithGroupPopulatedList,
    groupProductsByGroupId,
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
  const dispatch = useDispatch();
  const invoiceList = useSelector(selectInvoiceList);
  const {
    getOneProduct,

  } = useProductListData();

  invoiceList.forEach((invoice) => {
    const updatedInvoicePrice = invoice.products.reduce((acc, productId) => {
      const product = getOneProduct(productId);
      return acc + parseFloat(product?.productPrice);
    }, 0);
    if (parseFloat(updatedInvoicePrice) !== parseFloat(invoice.subTotal)){
      console.log('updatedInvoicePrice', updatedInvoicePrice);
      const taxAmount = parseFloat(
        parseFloat(updatedInvoicePrice) * (parseFloat(invoice.taxRate || 0) / 100)
      ).toFixed(2);

      const discountAmount = parseFloat(
        parseFloat(updatedInvoicePrice) * (parseFloat(invoice.discountRate || 0) / 100)
      ).toFixed(2);

      const total = (
        parseFloat(updatedInvoicePrice) -
        parseFloat(discountAmount) +
        parseFloat(taxAmount)
      ).toFixed(2);

      dispatch(updateInvoice({
        id: invoice.id,
        updatedInvoice: {
          ...invoice,
          subTotal: parseFloat(updatedInvoicePrice).toFixed(2),
          taxAmount,
          discountAmount,
          total,
        }
      }));
    }
  })

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

