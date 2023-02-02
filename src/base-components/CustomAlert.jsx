import useAlert from "../hooks/useAlert";

import { Alert } from "./alert";
import { Lucide } from "@/base-components";

const CustomAlert = () => {
  const { text, type } = useAlert();

  if (text && type) {
    switch (type) {
      case "warning":
        return (
          <Alert className="alert-warning flex items-center mb-2">
            {({ dismiss }) => (
              <>
                <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" /> {text}
                <button
                  type="button"
                  className="btn-close text-white"
                  aria-label="Close"
                  onClick={dismiss}
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </button>
              </>
            )}
          </Alert>
        );
      case "error":
        return (
          <Alert className="alert-danger flex items-center mb-2">
            {({ dismiss }) => (
              <>
                <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" /> {text}
                <button
                  type="button"
                  className="btn-close text-white"
                  aria-label="Close"
                  onClick={dismiss}
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </button>
              </>
            )}
          </Alert>
        );

      case "success":
        return (
          <Alert className="alert-success flex items-center mb-2 text-white">
            {({ dismiss }) => (
              <>
                <Lucide icon="CheckCircle" className="w-6 h-6 mr-2" /> {text}
                <button
                  type="button"
                  className="btn-close text-white"
                  aria-label="Close"
                  onClick={dismiss}
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </button>
              </>
            )}
          </Alert>
        );
      default:
        return (
          <Alert className="alert-primary flex items-center mb-2">
            {({ dismiss }) => (
              <>
                <Lucide icon="Info" className="w-6 h-6 mr-2" /> {text}
                <button
                  type="button"
                  className="btn-close text-white"
                  aria-label="Close"
                  onClick={dismiss}
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </button>
              </>
            )}
          </Alert>
        );
    }
  } else {
    return <></>;
  }
};

export default CustomAlert;
