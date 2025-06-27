import { TemplateContextProvider } from "./TemplateContextProvider";
import { useTemplateContext } from "./useTemplateContext";

export const TemplateComponent = () => {
  const {
    state: { _id, userName, firstName, lastName, attributes = {} },
    actions: { setName, setAttributes },
  } = useTemplateContext();

  return <></>;
};

export const TemplateWrapper = () => {
  return (
    <TemplateContextProvider>
      <TemplateComponent />
    </TemplateContextProvider>
  );
};
