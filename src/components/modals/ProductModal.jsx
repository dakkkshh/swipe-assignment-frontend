import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useProductListData } from "../../redux/hooks";
import { useProductGroupListData } from "../../redux/hooks";
import {
    addProduct,
    updateProduct
} from "../../redux/productsSlice";

function generatedRandomProductId(){
    const id = Math.floor(Math.random() * 1000);
    return `product-${id}`;
}

export default function ProductModal({
    showModal,
    closeModal,
    product = null,
    isEdit = false
}){
    const {
        productList
    } = useProductListData();
    const {
        productGroupList
    } = useProductGroupListData();
    const dispatch = useDispatch();

    function validateForm({
        productName,
        productDescription,
        productPrice,
        productGroup,
    }){
        const formValidation = {
            isValid: true,
            message: ""
        };
        const isProductExists = productList.some(
            (curProduct) => {
                if (isEdit && curProduct.productId === product.productId){
                    return false;
                } else {
                    return curProduct?.productName?.toLowerCase() === productName?.toLowerCase()
                }
            }
        );
        const isProductGroupExists = productGroupList.some(
            (group) => group?.groupId?.toString() === productGroup?.toString()
        );
        const isValidProductGroup = productGroup?.toString() === "-1" || isProductGroupExists;
        if (!productName){
            formValidation.isValid = false;
            formValidation.message = "Product name is required";
        } else if (productName.length < 3){
            formValidation.isValid = false;
            formValidation.message = "Product name should be at least 3 characters long";
        } else if (isProductExists){
            formValidation.isValid = false;
            formValidation.message = "Product name already exists";
        } else if (!productDescription){
            formValidation.isValid = false;
            formValidation.message = "Product description is required";
        } else if (productDescription.length < 3){
            formValidation.isValid = false;
            formValidation.message = "Product description should be at least 3 characters long";
        } else if (!productPrice){
            formValidation.isValid = false;
            formValidation.message = "Product price is required";
        } else if (productPrice <= 0){
            formValidation.isValid = false;
            formValidation.message = "Product price should be greater than 0";
        } else if (!isValidProductGroup){
            formValidation.isValid = false;
            formValidation.message = "Invalid product group"
        }

        return formValidation;
    }

    function handleAddProduct(event){
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const productName = formData.get("productName");
        const productDescription = formData.get("productDescription");
        const productPrice = formData.get("productPrice");
        const productGroup = formData.get("productGroup");

        const formValidation = validateForm({
            productName,
            productDescription,
            productPrice,
            productGroup
        });
        if (!formValidation.isValid) {
            alert(formValidation.message);
        } else {
            const randomProductId = generatedRandomProductId();
            const newProduct = {
                productId: randomProductId,
                productName,
                productDescription,
                productPrice,
                productGroup
            };
            dispatch(addProduct(newProduct));
            alert("Product added successfully");
            closeModal();
        }   
    }

    function handleEditProduct(event){
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const productName = formData.get("productName");
        const productDescription = formData.get("productDescription");
        const productPrice = formData.get("productPrice");
        const productGroup = formData.get("productGroup");

        const formValidation = validateForm({
            productName,
            productDescription,
            productPrice,
            productGroup
        });
        if (!formValidation.isValid) {
            alert(formValidation.message);
        } else {
            const updatedProduct = {
                productId: product.productId,
                productName,
                productDescription,
                productPrice,
                productGroup
            };
            dispatch(updateProduct({
                productId: updatedProduct.productId,
                updatedProduct
            }));
            alert("Product updated successfully");
            closeModal();
        }
    }

    return (
        <div>
            <Modal
                show={showModal}
                onHide={closeModal}
                centered
            >
                <Form
                    onSubmit={isEdit ? handleEditProduct : handleAddProduct}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {isEdit ? "Edit Product" : "Add Product"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                defaultValue={isEdit ? product.productName : ""}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="productDescription"
                                defaultValue={isEdit ? product.productDescription : ""}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="productPrice"
                                defaultValue={isEdit ? product.productPrice : ""}
                                required
                                min={0.01}
                                step={0.01}
                            />
                        </Form.Group>
                        <Form.Group controlId="productGroup">
                            <Form.Label>Product Group</Form.Label>
                            <Form.Control
                                as="select"
                                name="productGroup"
                                defaultValue={isEdit ? product.productGroup?.groupId : "-1"}
                            >
                                <option value="-1">No product group</option>
                                {productGroupList.map((group) => (
                                    <option
                                        key={group.groupId}
                                        value={group.groupId}
                                    >
                                        {group.groupName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={closeModal}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            {isEdit ? "Save Product" : "Add Product"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
    
}