import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import "../fire.scss";
import { AnimatePresence } from "framer-motion";
import Footer from "../Components/Footer";
import { UserProvider } from "../context/userContext";

const Home = () => {

  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault();
    const handleKeyDown = (event) => {
      if ((event.ctrlKey && (event.key === 'u' || event.key === 's')) || (event.ctrlKey && event.shiftKey && event.key === 'i')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tele = window.Telegram.WebApp;

      try {
        tele.ready();
        tele.expand();
        window.Telegram.WebApp.setHeaderColor('#191b33'); // Set header color

        // Haptic feedback
        if (tele.HapticFeedback) {
          tele.HapticFeedback.impactOccurred("medium");
        }
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
      }
    } else {
      console.error('Telegram WebApp is not available.');
    }

    // Clean up logic here if necessary
  }, []);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="flex flex-col pt-8 space-y-3 w-full">
            <UserProvider>
              <AnimatePresence mode="wait">
                <Outlet />
              </AnimatePresence>
            </UserProvider>
            <div id="footermain" className="flex flex-col bg-[#1a1f2e] space-y-6 fixed bottom-0 py-6 left-0 right-0 justify-center items-center px-5">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;