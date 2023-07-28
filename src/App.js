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

  function search() {
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

  return (
    <div className='app-wrapper'>
      <header className='header'>
        <img src={logo} alt='logo' />
      </header>
      <nav className='menu' ref={menuRef}>
        <div className='menu__nav'>
          <a href='#'>Demos <img src={menuImg} alt=' ' /></a>
          <div className='dropdown'>
            <a className='dropdown__btn' href='#'>Post <img src={menuImg} alt=' ' /></a>
            <div className='dropdown__menu'>
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