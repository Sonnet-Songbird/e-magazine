import React, {useEffect, useState} from "react";
import ContentRepo from "../repository/ContentRepo";

export default function ViewModel() {
    const [contentModel, setContentModel] = useState();
    const [promptKey, setPromptKey] = useState(false);

    useEffect(() => {
        initContentModel();
    }, []);

    useEffect(() => {
        if (promptKey) {
            const key = window.prompt('조회하실 앨범의 기수를 입력해주세요.', '41');
            if (key) {
                fetchContentModel(key);
            } else {
                setPromptKey(false);
            }
        }
    }, [promptKey]);

    function initContentModel() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let key = urlParams.get('key');

        if (!key) {
            setPromptKey(true);
        } else {
            fetchContentModel(key);
        }
    }

    function fetchContentModel(key) {
        try {
            const model = ContentRepo.find(key);
            setContentModel(model);
            setPromptKey(false);
        } catch (e) {
            if (window.confirm(`키에 해당하는 앨범이 없습니다. 다시 시도하시겠습니까?`)) {
                setPromptKey(true);
            } else {
                setPromptKey(false);
            }
        }
    }

    const ThemeComponent = (props) => {
        if (!contentModel) {
            return null;
        }
        const component = contentModel.getTheme();
        return component ? component(props) : null;
    };

    return (
        <div>
            <ThemeComponent contentModel={contentModel}/>
        </div>
    );
}
