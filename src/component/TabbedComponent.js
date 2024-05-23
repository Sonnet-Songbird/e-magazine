//TODO:Not tested

import React, {Children, useState} from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const TabbedComponent = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };
    return (
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} data-set={"마늘요리"}>
            {Children.map(children, (child, index) => {
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
