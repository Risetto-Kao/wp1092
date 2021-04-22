import React, { Component } from "react";
import Cell from "../components/Cell";
import NewCell from "../components/CellTest";
import Header from "../components/Header";
import Sheet from '../components/Sheet';
import './FakeSheet.css';
// import Row from "../components/Row";
// import Sheet from "../components/Sheet";

class FakeSheet extends Component {

    render() {
        return (
            <>
                <Header/>
                <Sheet/>
                {/* <NewCell/> */}
            </>
        );
    }
}

export default FakeSheet;

