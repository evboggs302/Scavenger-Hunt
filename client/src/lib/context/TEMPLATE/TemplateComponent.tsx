import { TemplateContextProvider } from "./TemplateContextProvider";
import { useTemplateContext } from "./useTemplateContext";

export const TemplateComponent = () => {
  const {
    state: { _id, userName, firstName, lastName, attributes = {} },
    actions: { setName, setAttributes },
  } = useTemplateContext();

  return (
    <div id={_id} style={attributes} onChange={() => setAttributes}>
      <div onClick={() => setName}>{userName}</div>
      <div>{firstName}</div>
      <div>{lastName}</div>
    </div>
  );
};

export const TemplateWrapper = () => {
  return (
    <TemplateContextProvider>
      <TemplateComponent />
    </TemplateContextProvider>
  );
};
