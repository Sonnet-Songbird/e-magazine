import {album41Model} from "./Content/album41Model";

const ContentRepo = {
    models: {
        "41": album41Model
    }
    , find: function (key) {
        return this.models[key]
    }
}


export default ContentRepo;
