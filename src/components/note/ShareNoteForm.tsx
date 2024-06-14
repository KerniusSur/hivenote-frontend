import {
  FormContainer,
  FormOuterContainer,
} from "components/event/EventCreateEditForm";
import HiveButton from "components/HiveButton";
import HiveInput from "components/HiveInput";
import HiveSelect from "components/HiveSelect";
import { Form, Formik } from "formik";
import NoteAccessType from "models/note/NoteAccessType";
import { useState } from "react";
import * as yup from "yup";

interface ShareNoteFormProps {
  handleSubmit: (values: ShareNoteFormValues) => void;
}

const ShareNoteForm = (props: ShareNoteFormProps) => {
  const { handleSubmit } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <FormOuterContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <FormContainer>
            <HiveInput
              name="email"
              title="Add Collaborator"
              placeholder="Enter the other user's email"
              required
            />
            <HiveSelect
              name="accessType"
              title="Access Type"
              options={[
                { value: NoteAccessType.VIEWER, label: "Viewer" },
                { value: NoteAccessType.EDITOR, label: "Editor" },
              ]}
            />
            <HiveButton
              compact
              text="Share"
              variant="contained"
              disabled={formik.isSubmitting || !formik.isValid}
              onClick={() => {
                setIsSubmitted(true);
                formik.handleSubmit();
              }}
            />
          </FormContainer>
        )}
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
