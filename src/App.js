import React, { useEffect, useRef, useState} from 'react';
import Post from './components/Post/Post';
import './App.css';
import logo from './assets/images/Logo.png';
import menuImg from './assets/images/B.png';
import menuItemImg from './assets/images/A.png';

function App() {
  const [arr, setArr] = useState();
  const [searchInput, setSearchInput] = useState();
  const [scroll, setScroll] = useState(0);

  const fetchData = () => {
    fetch('https://cloud.codesupply.co/endpoint/react/data.json')
      .then(response => response.json()).then(data => {setArr(data)});
  }

  const searchRef = useRef(0);
  if (!searchInput) {
    fetchData();
  }

  useEffect(() => {
    const handleScroll = (event) => {
      setScroll(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [scroll])

  const menuRef = useRef();

  useEffect(() => {
    if (window.innerWidth > 600) {
      if (scroll > 200) {
        menuRef.current.style.top = '-100px';
        menuRef.current.style.transition = 'all 1s ease 0.001s';
      } else {
        menuRef.current.style.top = '0px';
        menuRef.current.style.transition = 'all 1s ease 0.001s';
      }
    }
  }, [scroll])

  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef();
  const lineRef1 = useRef();
  const lineRef2 = useRef();
  const lineRef3 = useRef();

  const clickHandler = () => {
    setIsOpen(!isOpen);

    const line1Rotate = isOpen => isOpen ? 'rotate(45deg)' : 'rotate(0)';
    const line2Opacity = isOpen => isOpen ? '0' : '1';
    const line2Transform = isOpen => isOpen ? 'translateX(20px)' : 'translateX(0)';
    const line3Rotate = isOpen => isOpen ? 'rotate(-45deg)' : 'rotate(0)';
    const translateBurger = isOpen => isOpen ? 'translateX(70vw)' : 'translateX(0)'

    lineRef1.current.style.transform = line1Rotate(isOpen);
    lineRef2.current.style.opacity = line2Opacity(isOpen);
    lineRef2.current.style.transform = line2Transform(isOpen);
    lineRef3.current.style.transform = line3Rotate(isOpen);
    hamburgerRef.current.style.transform = translateBurger(isOpen);

    const openMenu = isOpen => isOpen ? 'translateX(114%)' : 'translateX(0)';
    menuRef.current.style.transform = openMenu(isOpen);
  }   

  const search = () => {
    setSearchInput(searchRef.current.value);
    if (searchInput) {
      const result = [];
      const search = searchInput.toLowerCase();
      arr.map((item) => {
        let str = Object.entries(item).join(',').toLowerCase();
        if (str.includes(search)) {
          result.push(item);
        }
      });
      setArr(result);
    }
  }

  const [isDropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();
  const openDropdown = () => {
    setDropdown(!isDropdown);
    const showDropdown = isDropdown => isDropdown ? 'flex' : 'none';
    dropdownRef.current.style.display = showDropdown(isDropdown);
  }

  return (
    <div className='app-wrapper'>
      <div className="hamburger" ref={hamburgerRef}>
        <div className="hamburger__btn" onClick={clickHandler}>
          <div className="btnLine1" ref={lineRef1}></div>
          <div className="btnLine2" ref={lineRef2}></div>
          <div className="btnLine3" ref={lineRef3}></div>
        </div>
      </div>
      <header className='header'>
        <img src={logo} alt='logo' />
      </header>
      <nav className='menu'>
        <div className='menu__nav' ref={menuRef}>
          <a href='#'>Demos <img src={menuImg} alt=' ' /></a>
          <div className='dropdown'>
            <a 
              className='dropdown__btn' 
              href='#'
              onClick={openDropdown}
            >
              Post <img src={menuImg} alt=' ' />
            </a>
            <div className='dropdown__menu' ref={dropdownRef}>
              <div className='dropdown__item'>
                <a href='#'>Post header</a>
                <img src={menuItemImg} alt=' ' />
              </div>
              <div className='dropdown__item'>
                <a href='#'>Post Layout</a>
                <img src={menuItemImg} alt=' ' />
              </div>
              <div className='dropdown__item'>
                <a href='#'>Share Buttons</a>
                <img src={menuItemImg} alt=' ' />
              </div>
              <div className='dropdown__item'>
                <a href='#'>Gallery Post</a>
                <img src={menuItemImg} alt=' ' />
              </div>
              <div className='dropdown__item'>
                <a href='#'>Video Post</a>
                <img src={menuItemImg} alt=' ' />
              </div>
            </div>
          </div>
          <a href='#'>Features <img src={menuImg} alt=' ' /></a>
          <a href='#'>Categories <img src={menuImg} alt=' ' /></a>
          <a href='#'>Shop <img src={menuImg} alt=' ' /></a>
          <a href='#'>Buy now</a>
          <input 
            type='search' 
            placeholder='search'
            ref={searchRef} 
            className='search' 
            onChange={search}
          ></input>
        </div>
      </nav>
      <section className='content'>
        <Post arr={arr} />
      </section>
    </div>
  );
}

export default App;