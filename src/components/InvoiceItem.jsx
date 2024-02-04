import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import { useProductListData } from "../redux/hooks";
import { Form } from "react-bootstrap";

const InvoiceItem = (props) => {
  const { currency, onRowDel, onRowAdd, products } = props;
  const { productList, groupProductsByGroupId } =
    useProductListData();
  const [selectedProductId, setSelectedProductId] = useState("");
  const productsGroupedByGroupId = groupProductsByGroupId(products) || [];

  return (
    <div>
      {productsGroupedByGroupId.map((group) => (
        <div key={group.groupId}>
          <div className="mb-2 bg-warning-subtle py-1">
            <p className="mb-0 text-center">
              <b>{group.groupName}</b>
            </p>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE/RATE</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {
                group?.products?.map((product, index) => (
                  <ItemRow
                    key={`${product.productId}-${index}`}
                    product={product}
                    onDelEvent={onRowDel}
                    currency={currency}
                  />
                ))
              }
            </tbody>
          </Table>
        </div>
      ))}
      <div className="w-50 d-flex justify-content-between align-items-center ">
        <Form.Select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-75 me-2"
        >
          <option value="" disabled>
            Select Product
          </option>
          {productList.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName}
            </option>
          ))}
        </Form.Select>
        <Button
          className="fw-bold w-25"
          onClick={() => {
            if (selectedProductId) {
              onRowAdd(selectedProductId);
            } else {
              alert("Please select a product to add");
            }
          }}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

const ItemRow = ({ product, onDelEvent, currency }) => {
  function handleRowDel() {
    onDelEvent(product?.productId);
  }

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <p className="mb-0">
          <b>{product.productName}</b>
        </p>
        <p>{product.productDescription}</p>
      </td>
      <td style={{ minWidth: "130px" }}>
        <p>
          {currency} {product.productPrice}
        </p>
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={handleRowDel}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
