import Carousel from 'react-bootstrap/Carousel';
import {Children, useEffect} from "react";

// @arg items: [component]
function CarouselComp({children, active, goToFunc, interval = null}) {

    useEffect(() => {
    }, [active]);
    const renderItems = () => {
        return Children.map(children, (child, idx) => (
            <Carousel.Item key={idx}>
                {child}
                {/*<Carousel.Caption>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
        ));
    };

    return (
        <Carousel activeIndex={active} onSelect={goToFunc} interval={interval} indicators={false}>
            {renderItems()}
        </Carousel>
    );
}

export default CarouselComp;
