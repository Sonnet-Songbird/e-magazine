import './DemoDesktopViewTheme.css';

const DemoDesktopViewTheme = ({contents}) => {
    return (
        <div className="viewTheme">
            <div>
                데모 뷰어
            </div>
            <div className="content1">
                {contents[0] !== undefined && contents[0]}
            </div>
            <div className="content2">
                {contents[1] !== undefined && contents[1]}
            </div>
        </div>
    )
}
export default DemoDesktopViewTheme;
