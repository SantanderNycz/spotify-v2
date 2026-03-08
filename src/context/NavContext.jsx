import { createContext, useContext, useState, useCallback } from "react";

const NavContext = createContext(null);

export function NavProvider({ children }) {
  const [history, setHistory] = useState([{ view: "home", params: {} }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const current = history[historyIndex];

  const navigate = useCallback(
    (view, params = {}) => {
      setHistory((h) => {
        const newHistory = h.slice(0, historyIndex + 1);
        return [...newHistory, { view, params }];
      });
      setHistoryIndex((i) => i + 1);
    },
    [historyIndex],
  );

  const goBack = useCallback(() => {
    if (historyIndex > 0) setHistoryIndex((i) => i - 1);
  }, [historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) setHistoryIndex((i) => i + 1);
  }, [historyIndex, history.length]);

  return (
    <NavContext.Provider
      value={{
        view: current.view,
        params: current.params,
        navigate,
        goBack,
        goForward,
        canGoBack: historyIndex > 0,
        canGoForward: historyIndex < history.length - 1,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
