//TODO: Not Tested
//리스트의 pagination을 처리하고 컨트롤러를 포함해 출력함.
//@arg: headerRow([<tr/>]): 목록의 헤더.
//      itemRow([<tr/>]): 목록의 개별 item.
//      countPerPage(number)

import {useEffect, useState} from "react";
import {Pagination, Table} from "react-bootstrap";

export function PaginationComp({itemHeader, itemRow, countPerPage}) {
    const [active, setActive] = useState(1)
    const [listView, setListView] = useState(<tr id={"paginationListViewPlaceHolder"}/>)

    useEffect(() => {
        const showingList = itemRow.slice(active - 1, active - 1 + countPerPage);
        setListView(showingList)
    }, [active]);

    return (
        <div>
            <Table striped bordered hover>
                {itemHeader && <thead>
                    {itemHeader}
                </thead>}
                <tbody>
                    {listView}
                </tbody>
            </Table>
            {PaginationControl(itemRow.length, countPerPage, active, setActive)}
        </div>
    )
}

export function PaginationControl(itemLength, countPerPage, active, setActive) {
    let paginationBtn = [];
    const pageCount = itemLength / countPerPage

    for (let number = 1; number <= pageCount; number++) {
        paginationBtn.push(
            <Pagination.Item key={number} active={number === active} onClick={() => {
                setActive(number)
            }}>
                {number}
            </Pagination.Item>,
        );
    }
    return paginationBtn
}
