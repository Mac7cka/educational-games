import React, {  useContext, useState, useEffect  } from "react";
import { ChildNameContext } from "./ChildNameContext";
import Navbar from "./Navbar";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { childName } = useContext(ChildNameContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (childName) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [childName]);

  return (
    <header className="border-b bg-white shadow-sm">     
      <Navbar/>      
    </header>
  );
}

export default Header;
