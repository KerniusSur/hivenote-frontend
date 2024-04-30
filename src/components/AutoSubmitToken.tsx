import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface AutoSubmitTokenProps {
  dependantValue: any;
  handleSubmit: (values: any) => void;
  delay?: number;
}

const AutoSubmitToken = (props: AutoSubmitTokenProps) => {
  const { dependantValue, handleSubmit, delay } = props;
  const [delayReady, setDelayReady] = useState<boolean>(false);
  const formikContext = useFormikContext();

  useEffect(() => {
    if (delay) {
      setDelayReady(false);
      setTimeout(() => {
        setDelayReady(true);
      }, delay);
      return;
    }
    handleSubmit(formikContext.values);

    return () => {
      setDelayReady(false);
    };
  }, [dependantValue]);

  useEffect(() => {
    if (delayReady) {
      handleSubmit(formikContext.values);
    }
  }, [delayReady]);

  return null;
};

export default AutoSubmitToken;
