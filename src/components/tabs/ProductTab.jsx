import { Col, Row } from "react-bootstrap";
import { useProductListData } from "../../redux/hooks";
import ProductGroupManagement from "../cards/ProductGroupManagement";

export default function ProductTab(){
    const initialProductData = {
        productId: "",
        productName: "",
        productDescription: "",
        productPrice: "",
        productGroup: "-1",
    };

    const {
        productList,
        getOneProduct,
    } = useProductListData();
    const isListEmpty = productList.length === 0;

    return (
        <Row
            className="min-vh-100"
        >
            <Col
                xs={12}
                md={8}
            >
            </Col>
            <Col
                xs={12}
                md={4}
            >
                <ProductGroupManagement />
            </Col>
        </Row> 
    )
}