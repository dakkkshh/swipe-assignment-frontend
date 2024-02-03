import { useState } from "react";
import { useProductListData } from "../../redux/hooks";
import { Button, Card, Table } from "react-bootstrap";
import ProductModal from "../modals/ProductModal";
import { BiSolidPencil } from "react-icons/bi";

export default function ProductManagement() {
  const { productList } = useProductListData();
  const isListEmpty = productList.length === 0;
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleAddProduct() {
    openModal();
  }
  return (
    <>
      <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
        {isListEmpty ? (
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="fw-bold">No products present</h3>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="fw-bold">Product List</h3>
              <Button variant="primary" onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
            <Table responsive className="mt-4">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Product Price</th>
                  <th>Product Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <ProductRow key={product.productId} product={product} />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
      <ProductModal showModal={isOpen} closeModal={closeModal} isEdit={false} />
    </>
  );
}

function ProductRow({ product }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleEditClick() {
    openModal();
  }
  return (
    <tr>
      <td>{product.productId}</td>
      <td>{product.productName}</td>
      <td>{product.productDescription}</td>
      <td>{product.productPrice}</td>
      <td>{product.productGroup?.groupName || "No group"}</td>
      <td>
        <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
      </td>
      <ProductModal
        showModal={isOpen}
        closeModal={closeModal}
        isEdit={true}
        product={product}
      />
    </tr>
  );
}
