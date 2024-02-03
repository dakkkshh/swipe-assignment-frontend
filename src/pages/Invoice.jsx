import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InvoiceForm from "../components/InvoiceForm";
import ProductTab from "../components/tabs/ProductTab";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Invoice = () => {
  const invoiceCreationTabs = [
    {
      id: 1,
      title: "Invoice Form",
      component: <InvoiceForm />,
    },
    {
      id: 2,
      title: "Products",
      component: <ProductTab />,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div>
      <div className="d-flex align-items-center my-3">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>
      <Tabs
        activeKey={selectedTab}
        onSelect={(k) => setSelectedTab(k)}
        id="invoice-creation-tabs"
      >
        {invoiceCreationTabs.map((tab) => (
          <Tab eventKey={tab.id} title={tab.title} key={tab.id}>
            {tab.component}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Invoice;
