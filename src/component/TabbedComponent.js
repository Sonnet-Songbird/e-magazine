//TODO:Not tested

import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const TabbedComponent = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0); // 활성 탭의 인덱스와 setActiveTab 함수를 useState를 통해 정의합니다.

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab); // 선택된 탭의 인덱스를 상태로 설정합니다.
    };

    return (
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
            {React.Children.map(children, (child, index) => {
                return (
                    <Tab eventKey={index} title={child.props.title}>
                        {child}
                    </Tab>
                );
            })}
        </Tabs>
    );
};

export default TabbedComponent;
