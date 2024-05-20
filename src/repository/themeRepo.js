import DemoDesktopViewTemplate from "../template/view/DemoDesktopViewTheme";
import PaperAlbumDesktopTheme from "../template/view/PaperAlbumDesktopTheme";
import StPageFlipDesktopTheme from "../template/view/StPageFlipDesktopTheme";

const themeRepo = () => {
    const repository = {};

    function add(name, component, pagePerView) {
        repository[name] = {idx: Object.keys(repository).length, component: component, pagePerView: pagePerView};
    }

    add("데모 템플릿", DemoDesktopViewTemplate, Infinity);
    add("앨범 템플릿", PaperAlbumDesktopTheme, Infinity); //가변 개수 템플릿으로 만들 예정
    add("StPageFlip", StPageFlipDesktopTheme, Infinity); //가변 개수 탬플릿으로 만들 예정
    return repository;
};

export default themeRepo;
