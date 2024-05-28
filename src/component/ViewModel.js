import React, {useEffect, useState} from "react";
import {modelTestAlbum} from "../repository/pages/modelTest";

export default function ViewModel() {
    const [contentModel, setContentModel] = useState();
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        setContentModel(modelTestAlbum);
    }, []);

    useEffect(() => {
        if (contentModel) {
        }
    }, [contentModel]);

    const ThemeComponent = (props) => {
        if (!contentModel) {
            return null
        }
        const component = contentModel.getTheme();
        return component ? component(props) : null;
    };

    return (
        <div style={{border: "1px solid cyan"}}>
            <ThemeComponent contentModel={contentModel}/>
        </div>
    );
}
