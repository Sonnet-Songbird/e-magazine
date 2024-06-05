import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { ContextURL } from "../../config";

export default function MusicPlayBtn({ iconClassName, fileName }) {
    const playAudio = (e) => {
        e.stopPropagation()
        const audio = new Audio(`${ContextURL.ROOT}audio/${fileName}`);
        audio.play();
    };

    return (
        <FontAwesomeIcon
            icon={faPlay}
            className={iconClassName}
            onClick={playAudio}
        />
    );
}

