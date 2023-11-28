import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/Geography.css';
import '../../../styles/App.css';
import map from '../../../images/map-geography.png'


function Geography ({citiesInfo}) {
    const Icon = (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#CBCCCE"/>
            <path d="M21.5 14H18.5V18.5H14V21.5H18.5V26H21.5V21.5H26V18.5H21.5V14Z" fill="#FFCB00"/>
        </svg>
    );
    
    const activeIcon = (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#FFCB00" fillOpacity="0.2"/>
            <circle cx="20" cy="20" r="4" fill="#FFCB00"/>
        </svg>
    );

    const [buttons, setButtons] = useState([
        {className: 'icon-ekb', icon: Icon,  active: false},
        {className: 'icon-tum', icon: Icon, active: false},
        {className: 'icon-omsk', icon: Icon, active: false}
    ])

    const buttonRef = useRef(null)
    const divRef = useRef(null)
    const [activeButton, setActiveButton] = useState(null);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        if (divRef.current) {
            console.log(divRef.current)
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const containerRect = divRef.current.getBoundingClientRect();       
            const distanceX = Math.abs(buttonRect.left + buttonRect.width / 2 - containerRect.left - containerRect.width / 2)
            const distanceY = Math.abs(buttonRect.top + buttonRect.height / 2 - containerRect.top - containerRect.height / 2)
            const calcWidth = Math.sqrt(distanceX ** 2 + distanceY ** 2)
            console.log(calcWidth)
            setWidth(calcWidth)
        }
    }, [divRef.current, buttonRef.current]);


    const toggle = (className, buttonRef) => {
        setButtons((prevButtons) =>
            prevButtons.map((button) => 
                button.className === className
                    ? { ...button, active: !button.active }
                    : { ...button, active: false }
            )
        );

            setActiveButton(className);

            if (buttonRef && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                // const containerRect = divRef.current.getBoundingClientRect();       
                // const calcWidth = containerRect.rigth - buttonRect.left;
                const calcWidth = buttonRect.width;
                console.log(calcWidth)
                setWidth(calcWidth)
            }
    }




    return (
        <div className='geography-container'>
            <div className='left-side'>
                <p className='geography-title'>Мы активно <br></br>развиваемся</p>
                <ul className='geo-list'>
                    <li className='geo-list_item'>
                        <p className='number'>2015</p>
                        <p className='text'> Год основания</p>
                    </li>
                    <li className='geo-list_item'>
                        <p className='number'>4 000 +</p>
                        <p className='text'>Клиентов ежедневно</p>
                    </li>
                    <li className='geo-list_item'>
                        <p className='number'>54</p>
                        <p className='text'>Автопарка в сети</p>
                    </li>
                    <li>
                        <p className='number'>150</p>
                        <p className='text'>Водителей</p>
                    </li>
                </ul>
            </div>
            <div className='right-side'>
                <div className='map'>
                    <div className='cart'>
                        <img className='map_img' src="../../../images/map-geography.png" alt="map" />

                        {buttons.map((button) => (
                            <div key={button.className} >
                                <button ref={buttonRef}
                                    className={`${button.className}`}
                                    onClick={() => toggle(button.className, buttonRef)}
                                >
                                    {button.active ? activeIcon : button.icon}
                                </button>
                                {button.active && width != null && (
                                    <div className={`line-${button.className}`} style={{
                                                                position: 'absolute',
                                                                background: 'yellow',
                                                                left: '0',
                                                                top: '50%',
                                                                height: '2px',
                                                                width: `${width}px`}}>

                                    </div>)}
                                        {button.active && (
                                            <div ref={divRef} className='center'>
                                                <div className='center-info'>
                                                    <h4 className='city-info_title'>Tomsk</h4>
                                                    <p className='city-info_text'>Телефон</p>
                                                    <p className='city-info_subtext'>+7 343 995747</p>
                                                    <p className='city-info_text'>Часы работы</p>
                                                    <p className='city-info_subtext'>ПН-ЧТ 9:00 - 18:00</p>
                                                </div>
                                            </div>
                                        )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Geography;
