import {ContentModel} from "../../model/ContentModel";
import {AlbumContent, HtmlContent} from "../../model/ContentElement";
import AlbumDesktop from "../../template/view/AlbumDesktop";
import StPageFlipDesktopTheme from "../../template/view/StPageFlipDesktopTheme";

export const modelTestText = new ContentModel()

modelTestText.add(HtmlContent("<p>안녕하세요!</p>\n<p>오늘은 흐린 날씨네요.</p>\n<p>따뜻하게 입으세요!</p>"))
modelTestText.add(HtmlContent("<p>안녕하세요!</p>\n<p>오늘은 강우 확률이 높아요.</p>\n<p>우산을 챙기세요!</p>"))
modelTestText.add(HtmlContent("<p>안녕하세요, 여러분!</p>\n<p>오늘은 화창한 날씨네요.</p>\n<p>즐거운 하루 되세요!</p>"))

export const modelTestAlbum = new ContentModel()
modelTestAlbum.add(new AlbumContent("album", "61", "jpg"))
modelTestAlbum.theme = AlbumDesktop;
modelTestAlbum.mobileTheme = StPageFlipDesktopTheme
