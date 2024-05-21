import DemoDesktopViewTemplate from "../template/view/DemoDesktopViewTheme";
import PaperAlbumDesktopTheme from "../template/view/PaperAlbumDesktopTheme";

const themeRepo = () => {
    const repository = {};

    function add(name, component, pagePerView) {
        repository[name] = {idx: Object.keys(repository).length, component: component, pagePerView: pagePerView};
    }

    add("데모 템플릿", DemoDesktopViewTemplate, 2);
    add("앨범 템플릿", PaperAlbumDesktopTheme, Infinity); //가변 개수 템플릿으로 만들 예정
    return repository;
};

export default themeRepo;
