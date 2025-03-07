
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-matrix-bg">
      <div className="terminal-window p-6 max-w-lg w-full text-center">
        <div className="mb-6">
          <AlertTriangle className="mx-auto h-16 w-16 text-matrix-error animate-glitch" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-matrix-error">ERROR 404</h1>
        <div className="mb-6">
          <div className="typing overflow-hidden whitespace-nowrap text-matrix-text mb-2">
            Access denied: Path not found
          </div>
          <div className="text-matrix-dimmed mb-4">
            The requested pathway <span className="text-matrix-error">{location.pathname}</span> does not exist in this system.
          </div>
        </div>
        <pre className="bg-black bg-opacity-50 p-4 mb-6 text-left text-matrix-dimmed rounded border border-matrix-border">
{`[ERROR] Access attempt logged
[SYSTEM] Unauthorized access prevented
[TRACE] Origin: ${window.location.origin}
[PATH] ${location.pathname}
[STATUS] Connection terminated`}
        </pre>
        <a 
          href="/" 
          className="terminal-button inline-block"
        >
          {"> "}Return to Main Terminal
        </a>
      </div>
    </div>
  );
};

export default NotFound;
