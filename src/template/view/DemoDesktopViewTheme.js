import './DemoDesktopViewTheme.css';

const DemoDesktopViewTheme = ({contents}) => {
    return (
        <div className="viewTheme">
            <div>
                데모 뷰어
            </div>
            {contents}
        </div>
    )
}
export default DemoDesktopViewTheme;
