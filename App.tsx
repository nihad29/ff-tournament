import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TournamentManager } from './components/TournamentManager';
import { UserManager } from './components/UserManager';
import { ResultsVerifier } from './components/ResultsVerifier';
import { PaymentsHandler } from './components/PaymentsHandler';
import { ReportsManager } from './components/ReportsManager';
import { Login } from './components/Login';
import { Page } from './types';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);
  
  const handleSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Failed to sign out", error);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Tournaments:
        return <TournamentManager />;
      case Page.Users:
        return <UserManager />;
      case Page.Results:
        return <ResultsVerifier />;
      case Page.Payments:
        return <PaymentsHandler />;
      case Page.Reports:
        return <ReportsManager />;
      default:
        return <Dashboard />;
    }
  };

  if (authLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-xl text-gray-800 dark:text-gray-200">Loading Admin Panel...</div>
        </div>
      );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <Header 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            onSignOut={handleSignOut}
            userEmail={currentUser.email}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
