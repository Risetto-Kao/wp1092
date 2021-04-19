import React, { Component } from "react";
import Cell from "../components/Cell";
import Header from "../components/Header";
// import Row from "../components/Row";
// import Sheet from "../components/Sheet";

class FakeSheet extends Component {

    render() {
        return (
            <>
                <Header />
                {/* <Row columnNo={6}></Row> */}
                <Cell></Cell>
            </>
        );
    }
}

export default FakeSheet;

