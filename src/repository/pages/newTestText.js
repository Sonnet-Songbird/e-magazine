import {ContentModel} from "../../model/ContentModel";
import {AlbumContent, HtmlContent} from "../../model/ContentElement";

export const newTestText = new ContentModel()

newTestText.add(HtmlContent("<p>안녕하세요!</p>\n<p>오늘은 흐린 날씨네요.</p>\n<p>따뜻하게 입으세요!</p>"))
newTestText.add(HtmlContent("<p>안녕하세요!</p>\n<p>오늘은 강우 확률이 높아요.</p>\n<p>우산을 챙기세요!</p>"))
newTestText.add(HtmlContent("<p>안녕하세요, 여러분!</p>\n<p>오늘은 화창한 날씨네요.</p>\n<p>즐거운 하루 되세요!</p>"))

export const newTestAlbum = new ContentModel()
newTestAlbum.add(new AlbumContent("album","61","jpg"))
