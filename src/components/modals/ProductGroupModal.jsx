import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useProductGroupListData } from "../../redux/hooks";
import {
    addProductGroup,
    updateProductGroup
} from "../../redux/productGroupsSlice";

export default function ProductGroupModal({
    showModal,
    closeModal,
    group = null,
    isEdit = false
}){
    const {
        productGroupList
    } = useProductGroupListData();
    const dispatch = useDispatch();

    function validateForm({
        groupName
    }){
        const formValidation = {
            isValid: true,
            message: ""
        };
        const isGroupExists = productGroupList.some(
            (group) => group?.groupName?.toLowerCase() === groupName?.toLowerCase()
        );
        if (!groupName){
            formValidation.isValid = false;
            formValidation.message = "Product group name is required";
        } else if (groupName.length < 3){
            formValidation.isValid = false;
            formValidation.message = "Product group name should be at least 3 characters long";
        } else if (isGroupExists){
            formValidation.isValid = false;
            formValidation.message = "Product group name already exists";
        }
        return formValidation;
    }

    function handleAddProductGroup(event){
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const groupName = formData.get("groupName");

        const formValidation = validateForm({
            groupName
        });
        if (!formValidation.isValid) {
            alert(formValidation.message);
        } else {
            const latestGroupId = productGroupList.length + 1;
            const newGroup = {
                groupId: latestGroupId,
                groupName
            };
            dispatch(addProductGroup(newGroup));
            alert("Product group added successfully");
            closeModal();
        }
    }

    function handleEditProductGroup(event){
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const groupName = formData.get("groupName");

        const formValidation = validateForm({
            groupName
        });
        if (!formValidation.isValid) {
            alert(formValidation.message);
        } else {
            const updatedGroup = {
                ...group,
                groupName
            };
            dispatch(updateProductGroup({
                groupId: updatedGroup.groupId,
                updatedProductGroup: updatedGroup
            }));
            alert("Product group updated successfully");
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
                    id="createProductGroupForm"
                    onSubmit={
                        isEdit ? handleEditProductGroup : handleAddProductGroup
                    }
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                isEdit ? "Edit Product Group" : "Add Product Group"
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="groupName"
                        >
                            <Form.Label>Product Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product group name"
                                required
                                name="groupName"
                                defaultValue={isEdit ? group?.groupName : ""}
                            />
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
                            {
                                isEdit ? "Update" : "Add"
                            }
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </div>
    )
}