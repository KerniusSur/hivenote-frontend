import { FormContainer, FormOuterContainer } from "components/EventCreateEditForm";
import { Form, Formik } from "formik";
import NoteAccessType from "models/note/NoteAccessType";
import { useState } from "react";
import * as yup from "yup";

interface ShareNoteFormProps {
  noteId: string;
  handleSubmit: (values: ShareNoteFormValues) => void;
}

const ShareNoteForm = (props: ShareNoteFormProps) => {
  const { noteId, handleSubmit } = props;
const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return (
    <FormOuterContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => <FormContainer>
          </FormContainer>}
      </Formik>
    </FormOuterContainer>
  );
};

export default ShareNoteForm;

export interface ShareNoteFormValues {
  email: string;
  accessType: NoteAccessType;
  link: string;
  isLinkEnabled: boolean;
  isLinkCopied: boolean;
}

const initialValues: ShareNoteFormValues = {
  email: "",
  accessType: NoteAccessType.VIEWER,
  link: "",
  isLinkEnabled: false,
  isLinkCopied: false,
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});
