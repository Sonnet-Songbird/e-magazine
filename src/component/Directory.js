import {PaginationComp} from "./PaginationComp";

export function Directory({functions, model}) {
    const header = (
        <tr>
            <th>소속</th>
            <th>성명</th>
            <th>연락처</th>
            <th>메모</th>
        </tr>
    )

    const list = model.profile.map((profile, index) => (
        <tr key={index}>
            <td>{profile.belong}</td>
            <td>{profile.name}</td>
            <td>{profile.contact.join(", ")}</td>
            <td>{profile.note.join(", ")}</td>
        </tr>
    ));

    return (
        <PaginationComp itemHeader={header} itemRow={list} countPerPage={10}>
        </PaginationComp>
    )
}
