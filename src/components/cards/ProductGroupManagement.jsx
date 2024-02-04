import { Button, Card, Table } from "react-bootstrap";
import { useProductGroupListData } from "../../redux/hooks";
import ProductGroupModal from "../modals/ProductGroupModal";
import { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";

export default function ProductGroupManagement() {
  const { productGroupList } = useProductGroupListData();
  const isListEmpty = productGroupList.length === 0
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleCreateProductGroup(event) {
    openModal();
  }

  return (
    <>
      <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
        {isListEmpty ? (
          <div className="d-flex flex-column align-items-center">
            <h3 className="fw-bold pb-2 pb-md-4 text-center">
              No product groups present
            </h3>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleCreateProductGroup}
            >
              Add Product Group
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <h3 className="fw-bold pb-2 pb-md-4">Product Groups</h3>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleCreateProductGroup}
            >
              Add Product Group
            </Button>
            <Table responsive className="mt-4">
              <thead>
                <tr>
                  <th>Group ID</th>
                  <th>Group Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productGroupList.map((group) => (
                  <ProductGroupRow key={group.groupId} group={group} />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
      <ProductGroupModal
        showModal={isOpen}
        closeModal={closeModal}
        isEdit={false}
      />
    </>
  );
}

function ProductGroupRow({ group }) {
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
      <td>{group.groupId}</td>
      <td>{group.groupName}</td>
      <td style={{ width: "5%" }}>
        <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
        <ProductGroupModal
          showModal={isOpen}
          closeModal={closeModal}
          isEdit={true}
          group={group}
        />
      </td>
    </tr>
  );
}
