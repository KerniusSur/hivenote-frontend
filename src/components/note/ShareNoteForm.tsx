import NoteAccessType from "models/note/NoteAccessType";
import { Formik } from "formik";
import * as yup from "yup";

interface ShareNoteFormProps {
  noteId: string;
  handleSubmit: (values: ShareNoteFormValues) => void;
}

const ShareNoteForm = (props: ShareNoteFormProps) => {
  const { noteId, handleSubmit } = props;
  const 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >

    </Formik>
  );
};

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
