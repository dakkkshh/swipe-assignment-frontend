import { Col, Row } from "react-bootstrap";
import ProductManagement from "../cards/ProductManagement";
import ProductGroupManagement from "../cards/ProductGroupManagement";

export default function ProductTab(){
    return (
        <Row>
            <Col
                xs={12}
                md={8}
            >
                <ProductManagement />
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