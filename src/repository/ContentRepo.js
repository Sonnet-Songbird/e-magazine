import testImg from "./pages/testImg";
import testText from "./pages/testText";
import constitution from "./pages/constitution";
const contentRepo = () => {
    const repository = {};

    function add(name, data) {
        repository[name] = {idx: Object.keys(repository).length, data: data, };
    }

    add("41기 앨범", testImg );
    add("해동고 동창회 회칙", constitution );
    add("테스트 텍스트", testText);
    return repository;
};

export default contentRepo;
